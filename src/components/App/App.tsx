import React, { useState } from "react";
import "./App.scss";
import Title from "../Title/Title";
import Years from "../Years/Years";
import ArrowButtons from "../ArrowButtons/ArrowButtons";
import SliderInfo from "../SliderInfo/SliderInfo";

function App() {
  return (
    <div className="app">
      <div className="page">
        <Title />
        <Years />
        <ArrowButtons />
        <SliderInfo />
      </div>
    </div>
  );
}

export default App;
