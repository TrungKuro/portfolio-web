"use client";

import Image from "next/image";
import React, { useState } from "react";
import { DraggableCardBody, DraggableCardContainer } from "../ui/DraggableCard";
import { getAboutData } from "@/lib/content";

const { profileCards } = getAboutData().personalize;

export function DraggableCardDemo() {
  const [cards, setCards] = useState(profileCards);

  const bringToFront = (clickedIndex: number) => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      const [clickedCard] = newCards.splice(clickedIndex, 1); // Lấy card được click ra khỏi mảng
      newCards.push(clickedCard); // Đưa card đó về cuối mảng (render cuối = hiển thị trên cùng)
      return newCards;
    });
  };

  return (
    <div className="absolute w-full h-full flex items-center justify-center">
      <DraggableCardContainer className="relative w-full h-full overflow-clip">
        {cards.map((card, index) => {
          return (
            <DraggableCardBody
              key={`${card.title}-${card.image}`} // Key ổn định dựa trên nội dung
              className={card.className}
              onClick={() => bringToFront(index)} // Click để đưa lên trên
            >
              <div className="grow relative w-full h-full">
                <Image
                  src={card.image}
                  alt={card.title}
                  //
                  //! Next.js sẽ tự set cho ảnh:
                  // position: absolute;
                  // top: 0;
                  // left: 0;
                  // bottom: 0;
                  // right: 0;
                  // width: 100%;
                  // height: 100%;
                  fill
                  //! Dựa theo thiết kế của CARD
                  // Thiết lập đúng sẽ là -> sizes="(min-width: 1024px) 204px, (min-width: 768px) 136px, 68px"
                  // Nhưng mình có xét thêm thông số "scale" khi hover vào CARD là 1.02
                  // Vì đây cũng ko phải ảnh SVG -> Nên cần đặt lại "sizes" với:
                  // - Từ (md:) trở xuống | 68 x 1.02 = 69.36px ~ 70px
                  // - Từ (md:) trở lên   | 136 x 1.02 = 138.72px ~ 140px
                  // - Từ (lg:) trở lên   | 204 x 1.02 = 208.08px ~ 210px
                  sizes="(min-width: 1024px) 210px, (min-width: 768px) 140px, 70px"
                  className="pointer-events-none rounded-sm object-cover"
                />
              </div>

              <p className="text-center font-bold text-lavender title-card line-clamp-1">
                {card.title}
              </p>
            </DraggableCardBody>
          );
        })}
      </DraggableCardContainer>
    </div>
  );
}
