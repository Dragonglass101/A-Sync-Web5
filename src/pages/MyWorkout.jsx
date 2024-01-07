import React, { useState, useEffect } from "react";
import MyWorkoutService from "../services/MyWorkoutService";

const MyWorkout = () => {
  const [workouts, setWorkouts] = useState([]);
  const myWorkoutService = MyWorkoutService();

  const getWorkouts = async () => {
    const workoutList = await myWorkoutService.getAllWorkout();
    console.log(workoutList);
    setWorkouts(workoutList);
  };

  const handleDeleteExercise = async (workout, exercise) => {
    await myWorkoutService.updateWorkoutDeleteExercise(workout, exercise);
    getWorkouts();
  };

  const handleToggleExercise = async (workout, exercise) => {
    await myWorkoutService.updateWorkoutExerciseToggle(workout, exercise);
    getWorkouts();
  };

  return (
    <>
      <div>
        <h1>My Workouts</h1>
        <button onClick={getWorkouts}>Get Workouts</button>
        {workouts.map((workout, index) => (
          <div key={index} className="workout-card">
            <h3>{workout.data.Name}</h3>
            <p>Day: {workout.data.Day}</p>
            <ul>
              {workout.data.Exercises && Array.isArray(workout.data.Exercises) && workout.data.Exercises.map((exercise, exerciseIndex) => (
                <li key={exerciseIndex} className={`exercise-card ${exercise.completed ? 'completed' : 'not-completed'}`}>
                  <span>{exercise.name}</span>
                  <button onClick={() => handleDeleteExercise(workout, exercise)}>
                    Delete Exercise
                  </button>
                  <button
                    onClick={() => handleToggleExercise(workout, exercise)}
                    style={{ backgroundColor: exercise.completed ? 'green' : 'red' }}
                  >
                    Toggle Exercise
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyWorkout;
