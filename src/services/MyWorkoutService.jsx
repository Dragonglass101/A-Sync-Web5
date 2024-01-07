// userService.js

import { useContext, useState } from "react";
import { Web5Context } from "../context/Web5Context";
import {calcCalorie} from "../utils/calcCalorie"


const MyWorkoutService = () => {
  const { web5, did} = useContext(Web5Context);



  const getAllWorkout = async () => {
    try {
      const { records, status } = await web5.dwn.records.query({
        message: {
          filter: {
            // protocol: protocolDefinition.protocol,
            schema: "https://schema.org/Fitbit/Workouts",
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
            schema: "https://schema.org/Fitbit/Workouts",
            recordId: workoutRecordId ,
          },
        });
    } catch (error) {
      console.error("Error Deleting Workout Name: ", error);
    }
  };



  const updateWorkoutDeleteExercise = async (workoutRecord, exerciseToDelete) => {
    try {
      console.log("Hehe");
      const { record } = await web5.dwn.records.read({
        message: {
          // protocol: protocolDefinition.protocol,
          schema: "https://schema.org/Fitbit/Workouts",
          recordId: workoutRecord.id,
        },
      });
  
      const currentExerciseList = await workoutRecord.data.json();
  
      const exerciseIndex = currentExerciseList.Exercises.findIndex(
        (exercise) => exercise.name === exerciseToDelete.name
      );
  
      if (exerciseIndex !== -1) {
        const updatedExerciseList = [
          ...currentExerciseList.Exercises.slice(0, exerciseIndex),
          ...currentExerciseList.Exercises.slice(exerciseIndex + 1),
        ];
  
        await record.update({
          data: {
            ...currentExerciseList,
            Exercises: updatedExerciseList,
          },
        });
  
        console.log("Exercise deleted successfully!");
      } else {
        console.error("Exercise not found in the workout");
      }
    } catch (error) {
      console.error("Error updating workout: ", error);
    }
  };
  

  const updateWorkoutExerciseToggle = async (workoutRecord, exerciseToUpdate) => {
    try {
      const { record } = await web5.dwn.records.read({
        message: {
          // protocol: protocolDefinition.protocol,
          schema: "https://schema.org/Fitbit/Workouts",
          recordId: workoutRecord.id,
        },
      });
  
      const currentExerciseList = await record.data.json();
  
      const updatedExerciseList = currentExerciseList.Exercises.map((exercise) => {
        if (exercise.name === exerciseToUpdate.name) {
          return {
            ...exercise,
            completed: !exercise.completed,
          };
        }
        return exercise;
      });
  
      await record.update({
        data: {
          ...currentExerciseList,
          Exercises: updatedExerciseList,
        },
      });
  
      console.log("Exercise status toggled successfully!");
    } catch (error) {
      console.error("Error toggling exercise status: ", error);
    }
  };
  





  return {
    getAllWorkout,
    deleteWorkout,
    updateWorkoutDeleteExercise,
    updateWorkoutExerciseToggle,
  };
};

export default MyWorkoutService;
