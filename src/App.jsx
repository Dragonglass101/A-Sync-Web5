// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DnDFlow from "./pages/DnDFlow";
import Dashboard from "./pages/Dashboard";
import Navbar from "./pages/Navbar";
import WorkoutDashboard from "./pages/WorkoutDashboard";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {

  return (
    <>
      <Navbar/>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/protocolmap" element={<DnDFlow />} />
          <Route path="/workout-dashboard" element={<WorkoutDashboard/>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
