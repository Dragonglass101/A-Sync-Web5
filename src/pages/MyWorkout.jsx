// src/pages/CreateWorkout.jsx
import React, { useState } from "react";
import MyWorkoutService from "../services/MyWorkoutService";

const MyWorkout = () => {
  const [workout, setworkout] = useState();
  const myWorkoutService = MyWorkoutService();

  const getWorkout = async (e) => {
    e.preventDefault();
    const workoutList = await myWorkoutService.getAllWorkout();
    console.log(workoutList);

    const workoutElement = [];

    const w = workoutList[1];
    workoutElement.push(<><h3>{w.Name}</h3> <button>{"Delete Workout"}</button></>);
    for (let exe of w.data.Exercises) {
      workoutElement.push(
        <div>
          <label htmlFor="exercise1">{exe.name}</label>
          <button>Completed</button>
          <button onClick={() => { myWorkoutService.updateWorkoutDeleteExercise(w, exe) }}>Delete</button>
        </div>
      );
    }
    setworkout(workoutElement);
  };

  return (
    <div>
      <h1>Add Media Page</h1>
      <button onClick={getWorkout}> Get All Workouts</button>
      {workout}
    </div>
  );
};

export default MyWorkout;
