// src/pages/CreateWorkout.jsx
import React from "react";
import WalletService from "../services/WalletService";

const Server = () => {
    const walletService = WalletService();
    const readData = async() =>{
        await walletService.readAllWorkouts();
    }
  return (
    <div>
      <h1>FitBit Service Emulator !</h1>
      <button onClick={readData}>Read</button>
      
    </div>
  );
};

export default Server;
