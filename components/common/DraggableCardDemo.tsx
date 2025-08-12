/* eslint-disable @next/next/no-img-element */
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
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute pointer-events-none rounded-sm w-full h-full object-cover"
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
