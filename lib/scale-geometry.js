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
      /* ... */
    ],
  },
};

// Function to calculate centroid of a polygon
function calculateCentroid(coordinates) {
  let totalX = 0;
  let totalY = 0;
  let count = 0;

  for (let point of coordinates) {
    totalX += point[0];
    totalY += point[1];
    count++;
  }

  return [totalX / count, totalY / count];
}

// Function to scale coordinates from centroid
function scalePolygon(coordinates, scaleFactor) {
  // Calculate centroid
  const centroid = calculateCentroid(coordinates);
  const [centerX, centerY] = centroid;

  // Scale each point from the centroid
  return coordinates.map((point) => {
    const [x, y] = point;
    const scaledX = centerX + (x - centerX) * scaleFactor;
    const scaledY = centerY + (y - centerY) * scaleFactor;
    return [scaledX, scaledY];
  });
}

// Scale factor (x? territory)
const SCALE_FACTOR = 300;

// Create scaled version
const scaledData = JSON.parse(JSON.stringify(originalData)); // Deep copy

// Scale each polygon in the MultiPolygon
scaledData.geometry.coordinates = originalData.geometry.coordinates.map(
  (polygon) => {
    return polygon.map((ring) => {
      return scalePolygon(ring, SCALE_FACTOR);
    });
  }
);

// Update properties to reflect the change
scaledData.properties.name += ` (${SCALE_FACTOR}x Scaled)`;

// Output the result
console.log("Original coordinates (first few points):");
console.log(originalData.geometry.coordinates[0][0].slice(0, 5));

console.log("\nScaled coordinates (first few points):");
console.log(scaledData.geometry.coordinates[0][0].slice(0, 5));

console.log("\nComplete scaled GeoJSON:");
console.log(JSON.stringify(scaledData, null, 2));
