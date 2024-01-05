// src/pages/HomePage.jsx
import React from "react";
import { useEffect, useState, useContext} from "react";
import { Web5Context } from "../utils/Web5Context";


const HomePage = ({ children }) => {
  const { web5, did } = useContext(Web5Context);
  useEffect(() => {
    if (did) {
      console.log("The DID : ", did);
    }
  }, [web5, did]);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main page of your application.</p>
      <h2>The User Did is as follows: </h2>
      <h3>{did}</h3>
      <div>
        <h2>Explore:</h2>
        <ul>
          {React.Children.map(children, (child, index) => (
            <li key={index}>{child}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
