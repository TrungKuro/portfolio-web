"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/* ------------------------------------------------------------------------- */
/*                             Fake Progress Bar                             */
/* ------------------------------------------------------------------------- */

function LoadingBar() {
  const [progress, setProgress] = useState(0);

  // How to use "useEffect" for "cleanup" before "unmount" ?
  useEffect(
    () => {
      //! This code runs when the component "mounts" or dependencies change

      // Fake load chạy 0 → 90% và đứng lại
      // Khoảng time chạy là (90/3) x 130ms = 3.9s
      let val = 0;
      const interval = setInterval(() => {
        val += 3;
        if (val >= 90) {
          clearInterval(interval); // Stop the interval
          val = 90;
        }
        setProgress(val);
      }, 130);

      // This function is the "cleanup function"
      return () => {
        //! This code runs when the component "unmounts" or before the effect re-runs due to dependency changes
        //  Perform cleanup tasks here, e.g.,
        //  - Clear timers (clearInterval, clearTimeout)
        //  - Remove event listeners (removeEventListener)
        //  - Cancel network requests
        clearInterval(interval); // Clear the interval
      };
    },
    [] //! The "empty dependency array" ensures this effect runs only once on "mount" and cleans up on "unmount"
  );

  return (
    <div className="absolute w-full h-full flex items-center justify-center bg-background z-15">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner Loading Icon */}
        <div className="loader-spinner" />

        {/* Loading Text */}
        <div className="font-sans text-center">
          <p className="font-extrabold text-lavender title-custom">
            {`Loading Globe ${progress}%`}
          </p>
          <p className="mt-1 font-extralight text-cool-gray sub-title-custom">
            Preparing 3D visualization
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/*                         Lazy Import Bundle "Heavy"                        */
/* ------------------------------------------------------------------------- */

const World = dynamic(() => import("../ui/Globe").then((m) => m.World), {
  ssr: false,
  loading: () => <LoadingBar />, // Hiển thị tiến trình "fake" tải gói Bundle JS
});

/* ------------------------------------------------------------------------- */
/*                               Main Component                              */
/* ------------------------------------------------------------------------- */

export function GlobeDemo() {
  const colors = ["#60a5fa", "#34d399", "#a78bfa"];

  const myCountry = {
    name: "Vietnam",
    //
    territorialColor: "rgba(255, 193, 7, 0.9)",
    colorArc: "rgba(239, 68, 68, 0.9)",
    //
    //! VIỆT NAM (Tp.HCM) = { lat: 10.7626, lng: 106.6601 }
    lat: 10.7626,
    lng: 106.6601,
    //
    //! Giá trị "bù" để điều chỉnh hướng góc nhìn "tọa độ" ban đầu bạn muốn trên GLOBE
    offsetLat: 17.1889, // Bù thêm (Vĩ độ) = xoay trục X
    offsetLng: 0, // Bù thêm (Kinh độ) = xoay trục Y
  };

  //! Đây là một object cấu hình chứa các thuộc tính để tùy chỉnh giao diện và hành vi của GLOBE 3D
  // pointSize : Kiểm soát độ lớn của các POINT đánh dấu vị trí kết nối trên GLOBE (giá trị mặc định = 1)
  //
  // CÁC THUỘC TÍNH GIAO DIỆN
  // globeColor         : Màu chính của GLOBE
  // showAtmosphere     : Hiển thị lớp khí quyển xung quanh GLOBE
  // atmosphereColor    : Màu của lớp khí quyển
  // atmosphereAltitude : Độ cao của lớp khí quyển
  // emissive           : Màu phát sáng của GLOBE
  // emissiveIntensity  : Cường độ phát sáng của GLOBE
  // shininess          : Độ bóng của bề mặt GLOBE
  // polygonColor       : Màu của các đa giác (quốc gia) trên GLOBE
  //
  // CÁC THUỘC TÍNH ÁNH SÁNG
  // ambientLight         : Màu của ánh sáng môi trường
  // directionalLeftLight : Màu của ánh sáng đi từ trái sang phải
  // directionalTopLight  : Màu của ánh sáng đi từ trên xuống dưới
  // pointLight           : Màu của ánh sáng các POINT
  //
  // CÁC THUỘC TÍNH HOẠT ẢNH
  // arcTime   : Thời gian di chuyển của các ARC (đơn vị ms)
  // arcLength : Độ dài của các ARC (đơn vị [%], từ 0.0 đến 1.0)
  // rings     : Số lượng vòng tròn hiệu ứng
  // maxRings  : Số lượng vòng tròn tối đa
  //
  // (lat)           : VĨ ĐỘ - Latitude
  // (lng)           : KINH ĐỘ - Longitude
  // initialPosition : Vị trí ban đầu của GLOBE
  // autoRotate      : Bật/tắt tự động xoay GLOBE
  // autoRotateSpeed : Tốc độ tự động xoay GLOBE tự động (+/- xoay thuận/ngược chiều kim đồng hồ)
  const globeConfig = {
    pointSize: 4,

    // 🌍 GLOBE
    globeColor: "#1a365d",
    emissive: "#4a5568",
    emissiveIntensity: 0.4,
    shininess: 1.2,

    // 🌟 ATMOSPHERE - Halo sáng xung quanh globe
    showAtmosphere: true,
    atmosphereColor: "#63b3ed",
    atmosphereAltitude: 0.2,

    // 🗺️ COUNTRIES - Màu lãnh thổ mặc định
    polygonColor: "rgba(226, 232, 240, 0.4)",

    //! 🔴 NATION - Màu lãnh thổ riêng nổi bật
    countryColor: myCountry.territorialColor,
    countryName: myCountry.name,

    // 💡 LIGHTING - Ánh sáng tối ưu cho nền tối
    ambientLight: "#4299e1",
    directionalLeftLight: "#e2e8f0",
    directionalTopLight: "#f7fafc",
    pointLight: "#fbb6ce",

    // ⚡ ANIMATION
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: {
      lat: myCountry.lat,
      lng: myCountry.lng,
      offsetLat: myCountry.offsetLat,
      offsetLng: myCountry.offsetLng,
    },
    autoRotate: true,
    autoRotateSpeed: 0.15,

    //! 💀 Đánh đổi giữa HIỆU SUẤT và HIỂN THỊ
    //
    // Kiểm soát độ chi tiết của các đa giác quốc gia trên GLOBE ... mặc định là (3):
    //
    // Giá trị thấp (0-2): Đa giác đơn giản hơn, ít chi tiết hình dạng
    // Giá trị vừa (3-5): Đa giác cân bằng giữa hiệu suất và chi tiết
    // Giá trị cao (6+): Đa giác rất chi tiết, sát với hình dạng thực tế
    polygonResolution: 4, // 3 | 4
    //
    // Kiểm soát khoảng cách giữa các quốc gia trên GLOBE ... mặc định là (0.7):
    //
    // 0.0: Các quốc gia sát nhau, không có khoảng trống
    // 0.5: Khoảng cách vừa phải giữa các quốc gia
    // 0.7: Khoảng cách rõ ràng giữa các quốc gia (hiện tại)
    // 1.0: Khoảng cách rất lớn, các quốc gia tách biệt hoàn toàn
    polygonMargin: 0, // 0.3 | 0
    //
    // Thiết đặt bán kính POINT ... mặc định là (2):
    pointRadius: 1,
  };

  //! Đây là một mảng chứa dữ liệu về các đường cong (ARCS) kết nối giữa các điểm trên GLOBE
  //  order              : Thứ tự hiển thị của ARC
  //  startLat, startLng : Tọa độ điểm bắt đầu (vĩ độ, kinh độ)
  //  endLat, endLng     : Tọa độ điểm kết thúc (vĩ độ, kinh độ)
  //  arcAlt             : Độ cao của ARC (từ 0.1 đến 0.7)
  //  color              : Màu sắc của ARC
  const sampleArcs = [
    {
      order: 1,
      startLat: -19.885592, // Belo Horizonte, Brazil
      startLng: -43.951191,
      endLat: -22.9068, // Rio de Janeiro, Brazil
      endLng: -43.1729,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: 28.6139, // New Delhi, India
      startLng: 77.209,
      endLat: 3.139, // Kuala Lumpur, Malaysia
      endLng: 101.6869,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: -19.885592, // Belo Horizonte, Brazil
      startLng: -43.951191,
      endLat: -1.303396, // Nairobi, Kenya
      endLng: 36.852443,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 1.3521, // Singapore, Singapore
      startLng: 103.8198,
      endLat: 35.6762, // Tokyo, Japan
      endLng: 139.6503,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 51.5072, // London, United Kingdom
      startLng: -0.1276,
      endLat: 3.139, // Kuala Lumpur, Malaysia
      endLng: 101.6869,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: -15.785493, // Brasília, Brazil
      startLng: -47.909029,
      endLat: 36.162809, // Las Vegas, USA
      endLng: -115.119411,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -33.8688, // Sydney, Australia
      startLng: 151.2093,
      endLat: 22.3193, // Hồng Kông (Hong Kong)
      endLng: 114.1694,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: 21.3099, // Honolulu, USA
      startLng: -157.8581,
      endLat: 40.7128, // New York City, USA
      endLng: -74.006,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -6.2088, // Jakarta, Indonesia
      startLng: 106.8456,
      endLat: 51.5072, // London, United Kingdom
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: 11.986597, // Abuja, Nigeria
      startLng: 8.571831,
      endLat: -15.595412, // Cuiabá, Brazil
      endLng: -56.05918,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: -34.6037, // Buenos Aires, Argentina
      startLng: -58.3816,
      endLat: 22.3193, // Hồng Kông (Hong Kong)
      endLng: 114.1694,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: 51.5072, // London, United Kingdom
      startLng: -0.1276,
      endLat: 48.8566, // Paris, France
      endLng: -2.3522,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 14.5995, // Manila, Philippines
      startLng: 120.9842,
      endLat: 51.5072, // London, United Kingdom
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 1.3521, // Singapore, Singapore
      startLng: 103.8198,
      endLat: -33.8688, // Sydney, Australia
      endLng: 151.2093,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 34.0522, // Los Angeles, USA
      startLng: -118.2437,
      endLat: 48.8566, // Paris, France
      endLng: -2.3522,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 6,
      startLat: -15.432563, // Lusaka, Zambia
      startLng: 28.315853,
      endLat: 1.094136, // Georgetown, Guyana
      endLng: -63.34546,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 6,
      startLat: 37.5665, // Seoul, South Korea
      startLng: 126.978,
      endLat: 35.6762, // Tokyo, Japan
      endLng: 139.6503,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 6,
      startLat: 22.3193, // Hồng Kông (Hong Kong)
      startLng: 114.1694,
      endLat: 51.5072, // London, United Kingdom
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 7,
      startLat: -19.885592, // Belo Horizonte, Brazil
      startLng: -43.951191,
      endLat: -15.595412, // Cuiabá, Brazil
      endLng: -56.05918,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 7,
      startLat: 48.8566, // Paris, France
      startLng: -2.3522,
      endLat: 52.52, // Berlin, Germany
      endLng: 13.405,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 7,
      startLat: 52.52, // Berlin, Germany
      startLng: 13.405,
      endLat: 34.0522, // Los Angeles, USA
      endLng: -118.2437,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 8,
      startLat: -8.833221, // Luanda, Angola
      startLng: 13.264837,
      endLat: -33.936138, // Cape Town, South Africa
      endLng: 18.436529,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 8,
      startLat: 49.2827, // Vancouver, Canada
      startLng: -123.1207,
      endLat: 52.3676, // Amsterdam, Netherlands
      endLng: 4.9041,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 8,
      startLat: 1.3521, // Singapore, Singapore
      startLng: 103.8198,
      endLat: 40.7128, // New York City, USA
      endLng: -74.006,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 9,
      startLat: 51.5072, // London, United Kingdom
      startLng: -0.1276,
      endLat: 34.0522, // Los Angeles, USA
      endLng: -118.2437,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 9,
      startLat: 22.3193, // Hồng Kông (Hong Kong)
      startLng: 114.1694,
      endLat: -22.9068, // Rio de Janeiro, Brazil
      endLng: -43.1729,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 9,
      startLat: 1.3521, // Singapore, Singapore
      startLng: 103.8198,
      endLat: -34.6037, // Buenos Aires, Argentina
      endLng: -58.3816,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 10,
      startLat: -22.9068, // Rio de Janeiro, Brazil
      startLng: -43.1729,
      endLat: 28.6139, // New Delhi, India
      endLng: 77.209,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 10,
      startLat: 34.0522, // Los Angeles, USA
      startLng: -118.2437,
      endLat: 31.2304, // Shanghai, China
      endLng: 121.4737,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 10,
      startLat: -6.2088, // Jakarta, Indonesia
      startLng: 106.8456,
      endLat: 52.3676, // Amsterdam, Netherlands
      endLng: 4.9041,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 11,
      startLat: 41.9028, // Rome, Italy
      startLng: 12.4964,
      endLat: 34.0522, // Los Angeles, USA
      endLng: -118.2437,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 11,
      startLat: -6.2088, // Jakarta, Indonesia
      startLng: 106.8456,
      endLat: 31.2304, // Shanghai, China
      endLng: 121.4737,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 11,
      startLat: 22.3193, // Hồng Kông (Hong Kong)
      startLng: 114.1694,
      endLat: 1.3521, // Singapore, Singapore
      endLng: 103.8198,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 12,
      startLat: 34.0522, // Los Angeles, USA
      startLng: -118.2437,
      endLat: 37.7749, // San Francisco, USA
      endLng: -122.4194,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 12,
      startLat: 35.6762, // Tokyo, Japan
      startLng: 139.6503,
      endLat: 22.3193, // Hồng Kông (Hong Kong)
      endLng: 114.1694,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 12,
      startLat: 22.3193, // Hồng Kông (Hong Kong)
      startLng: 114.1694,
      endLat: 34.0522, // Los Angeles, USA
      endLng: -118.2437,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 13,
      startLat: 52.52, // Berlin, Germany
      startLng: 13.405,
      endLat: 22.3193, // Hồng Kông (Hong Kong)
      endLng: 114.1694,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 13,
      startLat: 11.986597, // Abuja, Nigeria
      startLng: 8.571831,
      endLat: 35.6762, // Tokyo, Japan
      endLng: 139.6503,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 13,
      startLat: -22.9068, // Rio de Janeiro, Brazil
      startLng: -43.1729,
      endLat: -34.6037, // Buenos Aires, Argentina
      endLng: -58.3816,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 14,
      startLat: -33.936138, // Cape Town, South Africa
      startLng: 18.436529,
      endLat: 21.395643, // Mecca, Saudi Arabia
      endLng: 39.883798,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },

    //! Thêm cho VN
    {
      order: 15,
      startLat: 10.7626, // Ho Chi Minh City, Vietnam
      startLng: 106.6601,
      endLat: 42.9634, // Kentwood, USA
      endLng: -85.6447,
      arcAlt: 0.5,
      color: myCountry.colorArc,
    },
    {
      order: 14,
      startLat: 10.7626, // Ho Chi Minh City, Vietnam
      startLng: 106.6601,
      endLat: -37.8136, // Melbourne, Australia
      endLng: 144.9631,
      arcAlt: 0.4,
      color: myCountry.colorArc,
    },
    {
      order: 13,
      startLat: 1.3521, // Singapore, Singapore
      startLng: 103.8198,
      endLat: 10.7626, // Ho Chi Minh City, Vietnam
      endLng: 106.6601,
      arcAlt: 0.2,
      color: myCountry.colorArc,
    },
    {
      order: 12,
      startLat: 36.7503, // Takaoka, Japan
      startLng: 137.0147,
      endLat: 10.7626, // Ho Chi Minh City, Vietnam
      endLng: 106.6601,
      arcAlt: 0.3,
      color: myCountry.colorArc,
    },
    {
      order: 11,
      startLat: 10.7626, // Ho Chi Minh City, Vietnam
      startLng: 106.6601,
      endLat: 1.3521, // Singapore, Singapore
      endLng: 103.8198,
      arcAlt: 0.2,
      color: myCountry.colorArc,
    },
    {
      order: 10,
      startLat: 10.7626, // Ho Chi Minh City, Vietnam
      startLng: 106.6601,
      endLat: 36.7503, // Takaoka, Japan
      endLng: 137.0147,
      arcAlt: 0.3,
      color: myCountry.colorArc,
    },
    {
      order: 9,
      startLat: 10.7626, // Ho Chi Minh City, Vietnam
      startLng: 106.6601,
      endLat: 40.7128, // New York City, USA
      endLng: -74.006,
      arcAlt: 0.6,
      color: myCountry.colorArc,
    },
    {
      order: 8,
      startLat: 10.7626, // Ho Chi Minh City, Vietnam
      startLng: 106.6601,
      endLat: 37.5665, // Seoul, South Korea
      endLng: 126.978,
      arcAlt: 0.3,
      color: myCountry.colorArc,
    },
    {
      order: 7,
      startLat: 48.8566, // Paris, France
      startLng: 2.3522,
      endLat: 10.7626, // Ho Chi Minh City, Vietnam
      endLng: 106.6601,
      arcAlt: 0.5,
      color: myCountry.colorArc,
    },
    {
      order: 6,
      startLat: 52.52, // Berlin, Germany
      startLng: 13.405,
      endLat: 10.7626, // Ho Chi Minh City, Vietnam
      endLng: 106.6601,
      arcAlt: 0.4,
      color: myCountry.colorArc,
    },
    {
      order: 5,
      startLat: 10.7626, // Ho Chi Minh City, Vietnam
      startLng: 106.6601,
      endLat: 43.6532, // Toronto, Canada
      endLng: -79.3832,
      arcAlt: 0.5,
      color: myCountry.colorArc,
    },
    {
      order: 4,
      startLat: 51.5072, // London, United Kingdom
      startLng: -0.1276,
      endLat: 10.7626, // Ho Chi Minh City, Vietnam
      endLng: 106.6601,
      arcAlt: 0.5,
      color: myCountry.colorArc,
    },
    {
      order: 3,
      startLat: 10.7626, // Ho Chi Minh City, Vietnam
      startLng: 106.6601,
      endLat: 34.0522, // Los Angeles, USA
      endLng: -118.2437,
      arcAlt: 0.6,
      color: myCountry.colorArc,
    },
    {
      order: 2,
      startLat: 10.7626, // Ho Chi Minh City, Vietnam
      startLng: 106.6601,
      endLat: 45.5017, // Montreal, Canada
      endLng: -73.5673,
      arcAlt: 0.6,
      color: myCountry.colorArc,
    },
    {
      order: 1,
      startLat: 10.7626, // Ho Chi Minh City, Vietnam
      startLng: 106.6601,
      endLat: 21.0285, // Hanoi, Vietnam
      endLng: 105.8542,
      arcAlt: 0.1,
      color: myCountry.colorArc,
    },
  ];

  /* ----------------------------------------------------------------------- */

  return (
    <div className="absolute w-full h-full flex items-center justify-center hover:cursor-grab active:cursor-grabbing">
      <World data={sampleArcs} globeConfig={globeConfig} />
    </div>
  );
}
