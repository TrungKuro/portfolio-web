/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3, Group } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Canvas, extend, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/canvas/globe.json";
import { debugLog } from "@/lib/logger";

declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: ThreeElements["mesh"] & {
      new (): ThreeGlobe;
    };
  }
}

extend({ ThreeGlobe: ThreeGlobe });

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
    //
    offsetLat: number;
    offsetLng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  //
  countryColor?: string;
  countryName?: string;
  //
  polygonResolution?: number;
  polygonMargin?: number;
  pointRadius?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

interface GlobeProps extends WorldProps {
  onCanvasReady?: () => void;
}

/* ------------------------------------------------------------------------- */
/*                               Main Function                               */
/* ------------------------------------------------------------------------- */

function WebGLRendererConfig() {
  const {
    gl, // WebGL renderer
    size, // Bounds of the view (which stretches 100% and auto-adjusts)
    camera, //! THÊM camera
  } = useThree();

  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(size.width, size.height);
    gl.setClearColor(0xffaaff, 0);

    //! Cập nhật camera aspect
    if (camera instanceof PerspectiveCamera) {
      camera.aspect = size.width / size.height;
      camera.updateProjectionMatrix();
    }

    debugLog("WebGLRendererConfig updated");
  }, [gl, size.width, size.height, camera]);

  return null;
}

function Globe({ globeConfig, data, onCanvasReady }: GlobeProps) {
  const globeRef = useRef<ThreeGlobe | null>(null);
  const groupRef = useRef<Group>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const hasRenderedFirstFrame = useRef(false);

  const RING_PROPAGATION_SPEED = 3; // tốc độ lan truyền của vòng tròn

  const defaultProps = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    //
    countryColor: "rgba(255,255,255,0.7)",
    countryName: "",
    //
    polygonResolution: 3,
    polygonMargin: 0.7,
    pointRadius: 2,
    //
    ...globeConfig,
  };

  // STEP 1 - Initialize globe only once
  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      globeRef.current = new ThreeGlobe();
      (groupRef.current as unknown as Group).add(globeRef.current);
      setIsInitialized(true);

      debugLog("Globe initialized");
    }
  }, []);

  // STEP 2 - Build material when globe is initialized or when relevant props change
  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;

    const globeMaterial = globeRef.current.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
    };
    globeMaterial.color = new Color(globeConfig.globeColor);
    globeMaterial.emissive = new Color(globeConfig.emissive);
    globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
    globeMaterial.shininess = globeConfig.shininess || 0.9;

    debugLog("Globe material updated");
  }, [
    isInitialized,
    // globeConfig.globeColor,
    // globeConfig.emissive,
    // globeConfig.emissiveIntensity,
    // globeConfig.shininess,
  ]);

  // STEP 3 - Build data when globe is initialized or when data changes
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    const arcs = data;
    const points = [];
    for (let i = 0; i < arcs.length; i++) {
      const arc = arcs[i];
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.startLat,
        lng: arc.startLng,
      });
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.endLat,
        lng: arc.endLng,
      });
    }

    // remove duplicates for same lat and lng
    const filteredPoints = points.filter(
      (v, i, a) =>
        a.findIndex((v2) =>
          ["lat", "lng"].every(
            (k) => v2[k as "lat" | "lng"] === v[k as "lat" | "lng"],
          ),
        ) === i,
    );

    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(defaultProps.polygonResolution)
      .hexPolygonMargin(defaultProps.polygonMargin)
      .showAtmosphere(defaultProps.showAtmosphere)
      .atmosphereColor(defaultProps.atmosphereColor)
      .atmosphereAltitude(defaultProps.atmosphereAltitude)
      .hexPolygonColor((feature: { properties?: { admin?: string } }) => {
        // Nếu bạn có chọn quốc gia thì...
        if (defaultProps.countryName) {
          // Kiểm tra nếu là quốc gia bạn chọn hợp lệ (có tên trong "globe.json")
          if (
            feature.properties &&
            feature.properties.admin === defaultProps.countryName
          ) {
            //! Confirm quốc gia chọn được tìm thấy
            debugLog("Found your country: ", feature.properties.admin);

            // Màu lãnh thổ riêng cho quốc gia bạn chọn
            return defaultProps.countryColor;
          }
        }

        // Màu mặc định cho các quốc gia khác
        return defaultProps.polygonColor;
      });

    globeRef.current
      .arcsData(data)
      .arcStartLat((d) => (d as { startLat: number }).startLat * 1)
      .arcStartLng((d) => (d as { startLng: number }).startLng * 1)
      .arcEndLat((d) => (d as { endLat: number }).endLat * 1)
      .arcEndLng((d) => (d as { endLng: number }).endLng * 1)
      .arcColor((e: unknown) => (e as { color: string }).color)
      .arcAltitude((e) => (e as { arcAlt: number }).arcAlt * 1)
      .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
      .arcDashLength(defaultProps.arcLength)
      .arcDashInitialGap((e) => (e as { order: number }).order * 1)
      .arcDashGap(15)
      .arcDashAnimateTime(() => defaultProps.arcTime);

    globeRef.current
      .pointsData(filteredPoints)
      .pointColor((e) => (e as { color: string }).color)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(defaultProps.pointRadius);

    globeRef.current
      .ringsData([])
      .ringColor(() => defaultProps.polygonColor)
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod(
        (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings,
      );

    debugLog("Globe data updated");
  }, [
    isInitialized,
    // data,
    // defaultProps.arcLength,
    // defaultProps.arcTime,
    // defaultProps.atmosphereAltitude,
    // defaultProps.atmosphereColor,
    // defaultProps.countryColor,
    // defaultProps.countryName,
    // defaultProps.maxRings,
    // defaultProps.pointRadius,
    // defaultProps.pointSize,
    // defaultProps.polygonColor,
    // defaultProps.polygonMargin,
    // defaultProps.polygonResolution,
    // defaultProps.rings,
    // defaultProps.showAtmosphere,
  ]);

  // STEP 4 - Handle rings animation with cleanup
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    const interval = setInterval(() => {
      if (!globeRef.current) return;

      const newNumbersOfRings = genRandomNumbers(
        0,
        data.length,
        Math.floor((data.length * 4) / 5),
      );

      const ringsData = data
        .filter((d, i) => newNumbersOfRings.includes(i))
        .map((d) => ({
          lat: d.startLat,
          lng: d.startLng,
          color: d.color,
        }));

      globeRef.current.ringsData(ringsData);
    }, 2000);

    debugLog("Globe rings animation started");

    return () => {
      clearInterval(interval);
    };
  }, [
    isInitialized,
    // data
  ]);

  //! STEP 5 - Set initial globe position based on "initialPosition"
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !defaultProps.initialPosition)
      return;

    const { lat, lng, offsetLat, offsetLng } = defaultProps.initialPosition;

    // Convert degrees to radians
    const latRad = ((lat + offsetLat) * Math.PI) / 180;
    const lngRad = ((lng + offsetLng) * Math.PI) / 180;

    // Rotate the group containing the globe
    if (groupRef.current) {
      groupRef.current.rotation.x = -latRad;
      groupRef.current.rotation.y = -lngRad;
    }

    debugLog("Globe position updated");
  }, [
    isInitialized,
    // defaultProps.initialPosition
  ]);

  //! Use useFrame to detect first frame render
  //  Giúp bạn thực thi mã trước mỗi khung hình được hiển thị
  useFrame(() => {
    if (isInitialized && !hasRenderedFirstFrame.current && onCanvasReady) {
      hasRenderedFirstFrame.current = true;
      onCanvasReady();

      debugLog("Globe canvas ready");
    }
  });

  debugLog("Globe rendered");

  return <group ref={groupRef} />;
}

/* ------------------------------------------------------------------------- */
/*                               Main Component                              */
/* ------------------------------------------------------------------------- */

const aspect = 1.2; // tỷ lệ khung hình
const cameraZ = 300; // khoảng cách giữa camera và mục tiêu

export function World(props: WorldProps) {
  const { globeConfig } = props;
  const [isCanvasReady, setIsCanvasReady] = useState(false);
  const scene = new Scene();
  scene.fog = new Fog(0xffffff, 400, 2000);

  debugLog("World rendered");

  return (
    <>
      {/*
       * Loader overlay
       * - Tuy CANVAS đã được "mount"
       * - Rồi đã chạy useEffect để cấu hình
       * - Nhưng GPU vẫn cần time để render, dẫn tới chưa có gì hiển thị trên màn hình
       * - Trong khoảng thời gian này, sẽ hiển thị Loader tạm cho tới khi FRAME đầu tiên xuất hiện trong CANVAS
       * - Lớp phủ có hiệu ứng "ẩn dần" (fade-out) với 2s chuyển đổi opacity
       * - Đổi lại lớp phủ này sẽ luôn render, chỉ là bị ẩn đi ^^!
       */}
      <div
        className={`absolute z-15 flex h-full w-full items-center justify-center bg-background transition-opacity duration-2000 ${
          isCanvasReady ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex flex-col items-center space-y-4">
          {/* Spinner Loading Icon */}
          <div className="loader-spinner" />

          {/* Loading Text */}
          <p className="sub-title-custom text-center font-sans font-extralight text-cool-gray">
            Rendering... 🌍
          </p>
        </div>
      </div>

      <Canvas
        scene={scene}
        camera={new PerspectiveCamera(50, aspect, 180, 1800)}
      >
        <WebGLRendererConfig />

        <ambientLight
          // Ánh sáng này chiếu sáng đồng đều tất cả các vật thể trong khung cảnh
          // Ánh sáng này không thể được sử dụng để tạo bóng vì nó không có hướng
          color={globeConfig.ambientLight}
          intensity={0.6}
        />

        <directionalLight
          // Ánh sáng phát ra theo một hướng cụ thể
          // Ánh sáng này sẽ hoạt động như thể nó ở vô cùng xa và các tia sáng phát ra từ nó đều song song
          color={globeConfig.directionalLeftLight}
          position={new Vector3(-400, 100, 400)}
        />
        <directionalLight
          color={globeConfig.directionalTopLight}
          position={new Vector3(-200, 500, 200)}
        />

        <pointLight
          // Ánh sáng phát ra từ một điểm duy nhất theo mọi hướng
          // Ánh sáng này có thể tạo ra bóng tối
          color={globeConfig.pointLight}
          position={new Vector3(-200, 500, 200)}
          intensity={0.8}
        />

        <Globe
          //! Component 3D chính, cũng là nặng nhất cần nhiều time để GPU render 💀
          {...props}
          onCanvasReady={() => setIsCanvasReady(true)}
        />

        <OrbitControls
          // Điều khiển quỹ đạo cho phép camera quay quanh mục tiêu
          enablePan={false} // OFF chế độ lia máy của camera
          enableZoom={false} // OFF chế độ phóng to (dolly) của camera
          minDistance={cameraZ} // khoảng cách tối thiểu giữa camera và mục tiêu
          maxDistance={cameraZ} // khoảng cách tối đa giữa camera và mục tiêu
          autoRotateSpeed={globeConfig.autoRotateSpeed} // tốc độ tự động xoay của mục tiêu trước camera
          autoRotate={globeConfig.autoRotate} // ON chế độ tự động xoay của mục tiêu trước camera
          minPolarAngle={Math.PI / 3.5} // góc nhìn thấp nhất của camera
          maxPolarAngle={Math.PI - Math.PI / 3} // góc nhìn cao nhất của camera
        />
      </Canvas>
    </>
  );
}

/* ------------------------------------------------------------------------- */
/*                              Helper Function                              */
/* ------------------------------------------------------------------------- */

function genRandomNumbers(min: number, max: number, count: number) {
  const arr = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  return arr;
}
