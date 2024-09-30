import "./Years.scss";
import { useDataContext } from "../../context/DataContext";
import { useEffect, useState } from "react";
import { IEvent } from "../../types/IMockData";

function getAllYears(arr: IEvent[]): number[] {
  return [...arr.map((event) => event.year)];
}

export default function Years() {
  const { data, currentEvents } = useDataContext();

  const [minYear, setMinYear] = useState(
    Math.min(...getAllYears(data[currentEvents].events))
  );
  const [maxYear, setMaxYear] = useState(
    Math.max(...getAllYears(data[currentEvents].events))
  );
  const [prewMinYear, setPrewMinYear] = useState(minYear);
  const [prewMaxYear, setPrewMaxYear] = useState(maxYear);

  useEffect(() => {
    setPrewMinYear(minYear);
    setPrewMaxYear(maxYear);

    setMinYear(Math.min(...getAllYears(data[currentEvents].events)));
    setMaxYear(Math.max(...getAllYears(data[currentEvents].events)));
  }, [currentEvents, data, maxYear, minYear]);

  return (
    <div className="years">
      <div className="years__start">{prewMinYear}</div>
      <div className="years__end">{prewMaxYear}</div>
    </div>
  );
}
