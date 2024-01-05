// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DnDFlow from "./pages/DnDFlow";
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
          <Route path="/" element={<Home/>}/>
          <Route path="/protocolmap" element={<DnDFlow/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
