import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useDataContext } from "../../context/DataContext";
import { IEvent } from "../../types/IMockData";
import "./Years.scss";

function getAllYears(arr: IEvent[]): number[] {
  return [...arr.map((event) => event.year)];
}

export default function Years() {
  const { data, currentEvents } = useDataContext();
  const startRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const [minYear, setMinYear] = useState(
    Math.min(...getAllYears(data[currentEvents].events))
  );
  const [maxYear, setMaxYear] = useState(
    Math.max(...getAllYears(data[currentEvents].events))
  );

  useEffect(() => {
    const duration = 1;

    const startElement = startRef.current;
    const endElement = endRef.current;

    if (startElement && endElement) {
      const oldMin = minYear;
      const newMin = Math.min(...getAllYears(data[currentEvents].events));
      const oldMax = maxYear;
      const newMax = Math.max(...getAllYears(data[currentEvents].events));

      const yearUpdate = (
        element: HTMLDivElement,
        startValue: number,
        endValue: number
      ) => {
        gsap.to(
          {},
          {
            duration,
            onUpdate: function () {
              const progress = this.progress();
              const currentValue = Math.floor(
                startValue + (endValue - startValue) * progress
              );
              element.textContent = currentValue.toString();
            },
          }
        );
      };

      yearUpdate(startElement, oldMin, newMin);
      yearUpdate(endElement, oldMax, newMax);

      gsap.delayedCall(duration, () => {
        setMinYear(Math.min(...getAllYears(data[currentEvents].events)));
        setMaxYear(Math.max(...getAllYears(data[currentEvents].events)));
      });
    }
  }, [currentEvents, data, maxYear, minYear]);

  return (
    <div className="years">
      <div ref={startRef} className="years__start">
        {minYear}
      </div>
      <div ref={endRef} className="years__end">
        {maxYear}
      </div>
    </div>
  );
}
