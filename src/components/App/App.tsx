import React, { useState } from "react";
import "./App.scss";
import Title from "../Title/Title";
import Years from "../Years/Years";
import ArrowButtons from "../ArrowButtons/ArrowButtons";

function App() {
  return (
    <div className="app">
      <div className="page">
        <Title />
        <Years />
        <ArrowButtons />
      </div>
    </div>
  );
}

export default App;
