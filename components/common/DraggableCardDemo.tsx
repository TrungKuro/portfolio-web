"use client";

import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";

import Image from "next/image";
import React from "react";
import { LoadingBundle } from "../layout/LoadingBundle";
import { LoadingWait } from "../layout/LoadingWait";

import { getAboutData } from "@/lib/content";

/* ------------------------------------------------------------------------- */
/*                             Lazy Import Bundle                            */
/* ------------------------------------------------------------------------- */

const DraggableCardContainer = dynamic(
  () => import("../ui/DraggableCard").then((m) => m.DraggableCardContainer),
  {
    loading: () => <LoadingBundle />,
    ssr: false,
  },
);

const DraggableCardBody = dynamic(
  () => import("../ui/DraggableCard").then((m) => m.DraggableCardBody),
  {
    loading: () => <LoadingBundle />,
    ssr: false,
  },
);

/* ------------------------------------------------------------------------- */
/*                               Main Component                              */
/* ------------------------------------------------------------------------- */

const { profileCards } = getAboutData().personalize;

export function DraggableCardDemo() {
  const { ref: refContainer, inView: containerInView } = useInView({
    triggerOnce: true,
  });

  return (
    <div ref={refContainer} className="container-item-grid">
      {containerInView ? (
        <DraggableCardContainer className="relative h-full w-full overflow-clip">
          {profileCards.map((card, index) => {
            return (
              <DraggableCardBody
                key={`${card.title}-${card.image}`} // Key ổn định dựa trên nội dung
                //
                //! Có thể sử dụng RANDOM vì đây là Component "render" ở Server
                //  ( Math.floor(Math.random() * (max - min + 1)) + min ) * step
                positionTop={(Math.floor(Math.random() * 4) + 1) * 10} // Vị trí TOP ngẫu nhiên, phạm vi (10% - 40%), số bước 10%
                positionLeft={(Math.floor(Math.random() * 4) + 1) * 10} // Vị trí LEFT ngẫu nhiên, phạm vi (10% - 40%), số bước 10%
                levelRotate={(Math.floor(Math.random() * 7) - 3) * 5} // Góc ROTATE ngẫu nhiên, phạm vi (-15deg - 15deg), số bước 5deg
                //
                //! Thứ tự "stack" các CARD
                deepZ={index}
              >
                <div className="relative h-full w-full grow">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    //
                    //! Next.js sẽ tự set cho ảnh:
                    // position: absolute;
                    // top: 0;
                    // left: 0;
                    // bottom: 0;
                    // right: 0;
                    // width: 100%;
                    // height: 100%;
                    fill // chiếm full width/height container cha
                    //! Dựa theo thiết kế của CARD
                    // Thiết lập đúng sẽ là -> sizes="(min-width: 1024px) 204px, (min-width: 640px) 136px, 68px"
                    //
                    // Nhưng mình có xét thêm thông số "scale" khi hover vào CARD là 1.02
                    // Vì đây cũng ko phải ảnh SVG -> Nên cần đặt lại "sizes" với:
                    // - Từ (sm:) trở xuống | 68 x 1.02 = 69.36px ~ 70px
                    // - Từ (sm:) trở lên   | 136 x 1.02 = 138.72px ~ 139px
                    // - Từ (lg:) trở lên   | 204 x 1.02 = 208.08px ~ 209px
                    //
                    // Thêm thông số "scale" khi click vào CARD là 1.05
                    // - Từ (sm:) trở xuống | 68 x 1.02 x 1.05 = 72.828px ~ 73px
                    // - Từ (sm:) trở lên   | 136 x 1.02 x 1.05 = 145.656px ~ 146px
                    // - Từ (lg:) trở lên   | 204 x 1.02 x 1.05 = 218.484px ~ 219px
                    sizes="(min-width: 1024px) 219px, (min-width: 640px) 146px, 73px"
                    className="pointer-events-none rounded-sm object-cover"
                  />
                </div>

                <p className="title-card line-clamp-1 text-center font-bold text-lavender">
                  {card.title}
                </p>
              </DraggableCardBody>
            );
          })}
        </DraggableCardContainer>
      ) : (
        <LoadingWait />
      )}
    </div>
  );
}
