// userService.js

import { useContext, useState } from "react";
import { Web5Context } from "../context/Web5Context";
import {calcCalorie} from "../utils/calcCalorie"


const MyWorkoutService = () => {
  const { web5, did } = useContext(Web5Context);


  const getAllWorkout = async () => {
    try {
      const { records, status } = await web5.dwn.records.query({
        message: {
          filter: {
            // protocol: protocolDefinition.protocol,
            schema: `https://schema.org/Fitbit/Workouts`,
          },
        },
      });
      console.log(status);
  
      const newList = await Promise.all(
        records.map(async (record) => {
          const data = await record.data.json();
          console.log("Got your Workouts Successfully !");
          return { record, data, id: record.id };
        })
      );    
      return newList;
  
    } catch (error) {
      console.error("Error Getting Workouts", error);
    }
  };

  const deleteWorkout = async (workoutRecordId) => {
    try {
        await web5.dwn.records.delete({
          message: {
            // protocol: protocolDefinition.protocol,
            schema: `https://schema.org/Fitbit/Workouts`,
            recordId: workoutRecordId ,
          },
        });
    } catch (error) {
      console.error("Error Deleting Workout Name: ", error);
    }
  };



  const updateWorkout = async (workoutName) => {
    // To implement if needed, making no sense right now !
  };





  return {
    getAllWorkout,
    deleteWorkout,
    updateWorkout,
  };
};

export default MyWorkoutService;
