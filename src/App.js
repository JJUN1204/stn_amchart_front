import {BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Chart from "./view/chart.js"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Chart />} />
    </Routes>
  );
}

export default App;
