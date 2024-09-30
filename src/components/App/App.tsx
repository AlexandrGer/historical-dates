import React, { useState } from "react";
import "./App.scss";
import Title from "../Title/Title";
import Years from "../Years/Years";

function App() {
  return (
    <div className="app">
      <div className="page">
        <Title />
        <Years />
      </div>
    </div>
  );
}

export default App;
