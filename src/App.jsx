// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateWorkout from "./pages/CreateWorkout";
import MyWorkouts from "./pages/MyWorkouts";

// import MyWorkout from "./pages/MyWorkout";
import AddMedia from "./pages/AddMedia";
import MyMedia from "./pages/MyMedia";
import Navbar from "./pages/Navbar";
import DnDFlow from "./pages/DnDFlow";
import WorkoutDashboard from "./pages/WorkoutDashboard";
import HealthDashboard from "./pages/HealthDashboard";
import CreateHealth from "./pages/CreateHealth";

import { BrowserRouter as Router } from "react-router-dom";

const App = () => {

  return (
    <>
      <Router>
        {/* <Navbar/> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/workout/create" element={<CreateWorkout />} />
          <Route path="/workout/my" element={<MyWorkouts />} />
          <Route path="/add-media" element={<AddMedia />} />
          <Route path="/my-media" element={<MyMedia />} />
          <Route path="/protocolmap" element={<DnDFlow />} />
          <Route path="/workout/dashboard" element={<WorkoutDashboard/>} />
          <Route path="/health/dashboard" element={<HealthDashboard/>} />
          <Route path="/health/create" element={<CreateHealth/>} />
          
        </Routes>
      </Router>
    </>
  );
};

export default App;
