// Original GeoJSON data
const originalData = {
  type: "Feature",
  properties: {
    admin: "Vietnam",
    name: "... Islands",
    continent: "Vietnam",
  },
  geometry: {
    type: "MultiPolygon",
    coordinates: [
      // [ [ [lon, lat], ... ] ]
    ],
  },
};

// Convert degrees to radians
function toRad(deg) {
  return (deg * Math.PI) / 180;
}

// Convert radians to degrees
function toDeg(rad) {
  return (rad * 180) / Math.PI;
}

// Convert (lon, lat) to 3D Cartesian
function lonLatToXYZ(lon, lat) {
  const lonRad = toRad(lon);
  const latRad = toRad(lat);
  const x = Math.cos(latRad) * Math.cos(lonRad);
  const y = Math.cos(latRad) * Math.sin(lonRad);
  const z = Math.sin(latRad);
  return [x, y, z];
}

// Convert 3D Cartesian to (lon, lat)
function xyzToLonLat(x, y, z) {
  const lon = toDeg(Math.atan2(y, x));
  const hyp = Math.sqrt(x * x + y * y);
  const lat = toDeg(Math.atan2(z, hyp));
  return [lon, lat];
}

// Calculate centroid on sphere
function sphericalCentroid(coordinates) {
  let x = 0,
    y = 0,
    z = 0;
  for (const [lon, lat] of coordinates) {
    const [cx, cy, cz] = lonLatToXYZ(lon, lat);
    x += cx;
    y += cy;
    z += cz;
  }
  const len = coordinates.length;
  x /= len;
  y /= len;
  z /= len;
  return xyzToLonLat(x, y, z);
}

// Scale coordinates relative to centroid (on sphere)
function scalePolygonOnSphere(coordinates, scaleFactor) {
  const [centerLon, centerLat] = sphericalCentroid(coordinates);
  const centerXYZ = lonLatToXYZ(centerLon, centerLat);

  return coordinates.map(([lon, lat]) => {
    const pointXYZ = lonLatToXYZ(lon, lat);
    const dir = [
      pointXYZ[0] - centerXYZ[0],
      pointXYZ[1] - centerXYZ[1],
      pointXYZ[2] - centerXYZ[2],
    ];
    const scaled = [
      centerXYZ[0] + dir[0] * scaleFactor,
      centerXYZ[1] + dir[1] * scaleFactor,
      centerXYZ[2] + dir[2] * scaleFactor,
    ];
    return xyzToLonLat(...scaled);
  });
}

const SCALE_FACTOR = 40; // Example: 1.05 = ~5% larger
const scaledData = JSON.parse(JSON.stringify(originalData));

scaledData.geometry.coordinates = originalData.geometry.coordinates.map(
  (polygon) => polygon.map((ring) => scalePolygonOnSphere(ring, SCALE_FACTOR)),
);

scaledData.properties.name += ` (Scaled ${SCALE_FACTOR}x)`;

console.log(JSON.stringify(scaledData, null, 2));
