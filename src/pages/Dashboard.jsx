// src/pages/HomePage.jsx
import React from "react";
import { Web5Context } from '../context/Web5Context';
import { useEffect, useState, useContext} from "react";

const Dashboard = () => {
    
    const { web5, did } = useContext(Web5Context);
    
    useEffect(() => {
        if (did) {
          console.log('The DID: ', did);
        }
      }, [web5, did]);

    return (
        <div>
        <h1>Welcome to the Dashboard</h1>
        <p>This is the Dashboard after sigin in the application.</p>
        <p>DID: {did}</p>
        </div>
    );
};

export default Dashboard;