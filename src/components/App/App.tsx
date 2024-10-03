import React, { useState } from "react";
import "./App.scss";
import Title from "../Title/Title";
import Years from "../Years/Years";
import ArrowButtons from "../ArrowButtons/ArrowButtons";
import SliderInfo from "../SliderInfo/SliderInfo";
import Circle from "../Circle/Circle";

function App() {
  return (
    <div className="app">
      <div className="page">
        <Title />
        <Years />
        <Circle />
        <div className="swider-controll">
          <ArrowButtons />
          <SliderInfo />
        </div>
      </div>
    </div>
  );
}

export default App;
