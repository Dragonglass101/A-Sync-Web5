import React, { useState, useEffect } from "react";
import MyWorkoutService from "../services/MyWorkoutService";
import Modal from "react-modal"; // Import the modal library

const MyWorkout = () => {
  const [workouts, setWorkouts] = useState([]);
  const [shareModalIsOpen, setShareModalIsOpen] = useState(false);
  const [recipientDID, setRecipientDID] = useState("");
  const [selectedWorkout, setSelectedWorkout] = useState(null); // New state for selected workout
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

  const handleDeleteWorkout = async (workout) => {
    await myWorkoutService.deleteWorkout(workout.id);
    getWorkouts();
  };

  const handleOpenShareModal = (workout) => {
    setShareModalIsOpen(true);
    setSelectedWorkout(workout); // Set the selected workout
  };

  const handleCloseShareModal = () => {
    setShareModalIsOpen(false);
    setSelectedWorkout(null); // Clear the selected workout when the modal is closed
  };

  const handleShareWorkout = (e) => {
    // Perform the sharing logic here using recipientDID and selectedWorkout
    // You can call the relevant service function to share the workout with the specified recipientDID
    // After sharing, close the modal
    e.preventDefault();
    console.log('Entering handleShareWorkout');
    console.log(recipientDID, selectedWorkout);
    myWorkoutService.shareWorkout(recipientDID, selectedWorkout);
    setShareModalIsOpen(false);
    console.log('Exiting handleShareWorkout');
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
              {workout.data.Exercises &&
                Array.isArray(workout.data.Exercises) &&
                workout.data.Exercises.map((exercise, exerciseIndex) => (
                  <li
                    key={exerciseIndex}
                    className={`exercise-card ${exercise.completed ? 'completed' : 'not-completed'}`}
                  >
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
            <button onClick={() => handleDeleteWorkout(workout)}>
              Delete Workout
            </button>
            <button onClick={() => handleOpenShareModal(workout)}>
              Share Workout
            </button>
          </div>
        ))}
      </div>

      {/* Share Modal */}
      <Modal isOpen={shareModalIsOpen} onRequestClose={handleCloseShareModal}>
        <h2>Share Workout</h2>
        <label>Recipient DID:</label>
        <input
          type="text"
          value={recipientDID}
          onChange={(e) => setRecipientDID(e.target.value)}
        />
        <button onClick={handleShareWorkout} style={{ backgroundColor: 'green' }}>
          Send
        </button>
        <button onClick={handleCloseShareModal}>
          Cancel
        </button>
      </Modal>
    </>
  );
};

export default MyWorkout;
