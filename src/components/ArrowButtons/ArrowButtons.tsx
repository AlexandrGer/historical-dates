import { useDataContext } from "../../context/DataContext";
import "./ArrowButtons.scss";

export default function ArrowButtons() {
  const { data, currentEvents, setCurrentEvents } = useDataContext();
  const maxLength = data.length;

  const handleChangeSelection = (direction: "prev" | "next") => {
    setCurrentEvents((prevSelected) => {
      if (direction === "prev") {
        return (prevSelected - 1 + maxLength) % maxLength;
      }
      return (prevSelected + 1) % maxLength;
    });
  };

  return (
    <div className="arrowButtons">
      <span>{`0${currentEvents + 1}/0${maxLength}`}</span>
      <div className="arrowButtons__container">
        <button onClick={() => handleChangeSelection("prev")}>
          <svg width="24" height="24" role="none" viewBox="0 0 16 16">
            <path
              d="M9.6 4l-4 4 4 4 .8-.8L7.2 8l3.2-3.2z"
              fill="#42567A"
            ></path>
          </svg>
        </button>
        <button onClick={() => handleChangeSelection("next")}>
          <svg width="24" height="24" role="none" viewBox="0 0 16 16">
            <path
              d="M6.4 12l4-4-4-4-.8.8L8.8 8l-3.2 3.2z"
              fill="#42567A"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
