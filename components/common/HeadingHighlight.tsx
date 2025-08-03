import React from "react";

export const HeadingHighlight = ({
  title,
  wordHighlight = 0,
}: {
  title: string;
  wordHighlight?: number;
}) => {
  const words = title.split(" "); // Tách từng từ trong "title"

  return (
    <h1 className="heading lg:max-w-[45vw]">
      {wordHighlight
        ? words.map((word, index) => {
            if (index === wordHighlight - 1) {
              // Highlight từ được chọn
              return (
                <span key={index} className="text-purple">
                  {word + (words.length - 1 === index ? "" : " ")}
                </span>
              );
            } else {
              return word + (words.length - 1 === index ? "" : " ");
            }
          })
        : title}
    </h1>
  );
};
