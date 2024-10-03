import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { useDataContext } from "../../context/DataContext";
import "./Circle.scss";

export default function Circle() {
  const { data, currentEvents, setCurrentEvents } = useDataContext();
  const [translateX, setTranslateX] = useState<number>(265);
  const [animatedIndex, setAnimatedIndex] = useState<number | null>(
    currentEvents
  );

  useEffect(() => {
    const angle = 360 / data.length;
    const rotation = -angle * currentEvents - 60;

    setAnimatedIndex(null);

    gsap.to(".circle__container", {
      rotation: rotation,
      duration: 1,
      ease: "sine.inOut",
      transformOrigin: "center center",
    });

    data.forEach((_, index) => {
      const buttonAngle = (360 / data.length) * index + rotation;
      gsap.to(`.circle__wrapper_${index}`, {
        rotation: -buttonAngle,
        duration: 1,
        ease: "sine.inOut",
        transformOrigin: "center center",
        onComplete: () => {
          if (index === currentEvents) {
            setAnimatedIndex(currentEvents);
          }
        },
      });
    });
  }, [currentEvents, data]);

  return (
    <div className="circle">
      <div className="circle__container">
        {data.map((point, index) => (
          <div
            className={`circle__point ${
              currentEvents === index ? "circle__point_active" : ""
            }`}
            style={{
              transform: `rotate(${
                (360 / data.length) * index
              }deg) translateX(${translateX}px)`,
            }}
            onClick={() => setCurrentEvents(index)}
          >
            <div className={`circle__wrapper circle__wrapper_${index}`}>
              <p className="circle__number">{index + 1}</p>
              <p
                className={`circle__name ${
                  animatedIndex === index ? "circle__name_active" : ""
                }`}
              >
                {point.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
