// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import FitbitHome from "./pages/FitbitHome";
import NutrifitHome from "./pages/NutriFitHome";
import HomePage from "./pages/HomePage"; // Create a new HomePage component
import { BrowserRouter as Router } from "react-router-dom";



const App = () => {
  return (
    <Router>
      <div>
        {/* Navigation for the home page */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        {/* Define routes for Home, FitbitHome, and NutrifitHome */}
        <Routes>
          <Route
            path="/"
            element={
              <HomePage>
                {/* Nest links to FitbitHome and NutrifitHome in HomePage */}
                <Link to="/fitbit">Go to FitbitHome</Link>
                <Link to="/nutrifit">Go to NutrifitHome</Link>
              </HomePage>
            }
          />
          <Route path="/fitbit" element={<FitbitHome />} />
          <Route path="/nutrifit" element={<NutrifitHome />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
