// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddWorkout from "./pages/AddWorkout";
import MyWorkout from "./pages/MyWorkout";
import AddMedia from "./pages/AddMedia";
import MyMedia from "./pages/MyMedia";
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
          <Route path="/add-workout" element={<AddWorkout />} />
          <Route path="/my-workouts" element={<MyWorkout />} />
          <Route path="/add-media" element={<AddMedia />} />
          <Route path="/my-media" element={<MyMedia />} />
          <Route path="/protocolmap" element={<DnDFlow />} />
          <Route path="/workout-dashboard" element={<WorkoutDashboard/>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
