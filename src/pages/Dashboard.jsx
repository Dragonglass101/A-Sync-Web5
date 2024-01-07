// src/pages/Dashboard.jsx
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Web5Context } from "../context/Web5Context";

const Dashboard = () => {
  const { web5, did, protocolDefinition} = useContext(Web5Context);

  useEffect(() => {
    if (did) {
      console.log("The DID: ", did);
    }
  }, [web5, did]);

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>This is the Dashboard after signing in to the application.</p>
      <p>DID: {did}</p>

      {/* Links to different pages */}
      <nav>
        <ul>
          <li>
            <Link to="/add-workout">Add Workout</Link>
          </li>
          <li>
            <Link to="/my-workouts">My Workouts</Link>
          </li>
          <li>
            <Link to="/add-media">Add Media</Link>
          </li>
          <li>
            <Link to="/my-media">My Media</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
