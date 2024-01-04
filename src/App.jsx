// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </Router>
  );
};

export default App;
