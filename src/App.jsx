// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DnDFlow from "./pages/DnDFlow";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/protocolmap" element={<DnDFlow/>}/>
        </Routes>
      </Router>
  );
};

export default App;
