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
  const [prewMinYear, setPrewMinYear] = useState(minYear);
  const [prewMaxYear, setPrewMaxYear] = useState(maxYear);

  useEffect(() => {
    const duration = 1;

    const startElement = startRef.current;
    const endElement = endRef.current;

    if (startElement && endElement) {
      const oldMin = prewMinYear;
      const newMin = minYear;
      const oldMax = prewMaxYear;
      const newMax = maxYear;

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
        setPrewMinYear(minYear);
        setPrewMaxYear(maxYear);
        setMinYear(Math.min(...getAllYears(data[currentEvents].events)));
        setMaxYear(Math.max(...getAllYears(data[currentEvents].events)));
      });
    }
  }, [currentEvents, data, maxYear, minYear, prewMaxYear, prewMinYear]);

  return (
    <div className="years">
      <div ref={startRef} className="years__start">
        {prewMinYear}
      </div>
      <div ref={endRef} className="years__end">
        {prewMaxYear}
      </div>
    </div>
  );
}
