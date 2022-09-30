// import logo from "./logo.svg";
import "./App.css";
import "@shopify/polaris/build/esm/styles.css";

import Polaris from "./Polaris";
import Dashboard from "./Dashboard";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Polaris />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
