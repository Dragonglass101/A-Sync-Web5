// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateWorkout from "./pages/CreateWorkout";
import MyWorkouts from "./pages/MyWorkouts";

// import MyWorkout from "./pages/MyWorkout";
import Navbar from "./pages/Navbar";
import DnDFlow from "./pages/DnDFlow";
import WorkoutDashboard from "./pages/WorkoutDashboard";
import HealthDashboard from "./pages/HealthDashboard";
import CreateHealth from "./pages/CreateHealth";
import MyMeals from "./pages/MyMeals";

import { BrowserRouter as Router } from "react-router-dom";
import FitbitServer from "./pages/FitbitServer";
import NutrifitServer from "./pages/NutrifitServer";

const App = () => {

  return (
    <>
      <Router>
        {/* <Navbar/> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/protocolmap" element={<DnDFlow />} />
          <Route path="/workout/dashboard" element={<WorkoutDashboard/>} />
          <Route path="/workout/create" element={<CreateWorkout />} />
          <Route path="/workout/my" element={<MyWorkouts />} />

          <Route path="/health/dashboard" element={<HealthDashboard/>} />
          <Route path="/health/create" element={<CreateHealth/>} />
          <Route path="/health/my" element={<MyMeals/>} />

          <Route path="/fitbitserver" element={<FitbitServer/>} />
          <Route path="/nutrifitserver" element={<NutrifitServer/>} />
          
        </Routes>
      </Router>
    </>
  );
};

export default App;
