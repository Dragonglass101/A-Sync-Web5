import { useEffect, useState } from "react";
import { useContext } from "react";
import { Web5Context } from "../utils/Web5Context";


const Home = () => {
  const { did, userType } = useContext(Web5Context);
  useEffect(() => {
    if (did) {
      console.log("The DID : ", did);
    }
  }, [did, userType]);

  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({
    workoutName: '',
    repTime: '',
    repetitions: '',
    workoutType: 'cardio', // Default value
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Add the new workout to the list
    setWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);

    // Clear the form fields
    setNewWorkout({
      workoutName: '',
      repTime: '',
      repetitions: '',
      workoutType: 'cardio',
    });
  };

  const handleDeleteWorkout = (index) => {
    // Remove the workout at the specified index
    setWorkouts((prevWorkouts) => [
      ...prevWorkouts.slice(0, index),
      ...prevWorkouts.slice(index + 1),
    ]);
  };

  const handleCheckboxChange = (index) => {
    // Toggle the "done" status of the workout at the specified index
    setWorkouts((prevWorkouts) =>
      prevWorkouts.map((workout, i) =>
        i === index ? { ...workout, done: !workout.done } : workout
      )
    );
  };

  return (
    <>
      <h1>Welcome to the FitBit !</h1>
      <div style={{ display: 'flex', height: '70vh', margin: '0 auto', maxWidth: '70%', border: '1px solid #ccc', borderRadius: '5px' }}>
      <div style={{ width: '50%', borderRight: '1px solid #ccc', padding: '20px' }}>
        <h2>Add Workout</h2>
        <form onSubmit={handleFormSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label>
              Workout Name:
              <input
                type="text"
                name="workoutName"
                value={newWorkout.workoutName}
                onChange={(e) => setNewWorkout({ ...newWorkout, workoutName: e.target.value })}
                required
              />
            </label>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>
              Rep Time (in seconds):
              <input
                type="number"
                name="repTime"
                value={newWorkout.repTime}
                onChange={(e) => setNewWorkout({ ...newWorkout, repTime: e.target.value })}
                required
              />
            </label>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>
              Number of Repetitions:
              <input
                type="number"
                name="repetitions"
                value={newWorkout.repetitions}
                onChange={(e) => setNewWorkout({ ...newWorkout, repetitions: e.target.value })}
                required
              />
            </label>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>
              Type of Workout:
              <select
                name="workoutType"
                value={newWorkout.workoutType}
                onChange={(e) => setNewWorkout({ ...newWorkout, workoutType: e.target.value })}
                required
              >
                <option value="cardio">Cardio</option>
                <option value="strength">Strength</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>
          <div>
            <button type="submit">Add Workout</button>
          </div>
        </form>
      </div>
      
      {/* Right side - List of Workouts */}
      <div style={{ width: '50%', padding: '20px' }}>
        <h2>Workout List</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {workouts.map((workout, index) => (
            <li key={index} style={{ marginBottom: '15px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px', position: 'relative' }}>
              <div>
                <strong>{workout.workoutName}</strong> - {workout.repTime} seconds, {workout.repetitions} repetitions, {workout.workoutType}
              </div>
              <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
                <input
                  type="checkbox"
                  checked={workout.done || false}
                  onChange={() => handleCheckboxChange(index)}
                />{' '}
                Done{' '}
                <button onClick={() => handleDeleteWorkout(index)} style={{ marginLeft: '10px' }}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
      {/* <h4>{did}</h4> */}
    </>
  );
};

export default Home;
