import { useEffect, useState, useContext} from "react";
import { Web5Context } from "../utils/Web5Context";
// import {publicDid} from "../utils/constants"


const Home = () => {
  const { web5, did } = useContext(Web5Context);
  useEffect(() => {
    if (did) {
      console.log("The DID : ", did);
    }
  }, [web5, did]);

  const [allWorkout, setAllWorkout] = useState([]);
  const [workout, setWorkout] = useState({
    workoutName: '',
    repTime: '',
    repetitions: '',
    workoutType: 'other',
  });

  const getAllWorkouts = async() => {
    const { records } = await web5.dwn.records.query({message: {
      filter:{
        schema: "https://schema.org/Fitbit",
      }  
    }});
    const newList = await Promise.all(records.map(async (record) => {
      const data = await record.data.json();
      return data;
    }));
    setAllWorkout(newList);
    
  }
  const handleChange = (e) => {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value,
    });
  };

  const addWorkout = async () => {
    try {
      const { record } = await web5.dwn.records.write({
        data: { ...workout },
        message: {
          schema: "https://schema.org/Fitbit",
          dataFormat: 'application/json'
        },
      });
      const {status} = await record.send(did);
      console.log(status);
      alert("Workout Created Successfully !")
    } catch (error) {
      alert("Workout Not Created ... ")
      console.error("Error Creating Workout : ", error);
    }
    
  };


  const handleFormSubmit = (e) => {
    e.preventDefault();
    addWorkout();
    console.log("Create Doctor Working Successfully !")
  }


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
                id="workoutName"
                name="workoutName"
                required
                value={workout.workoutName}
                onChange={handleChange}
              />
            </label>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>
              Rep Time (in seconds):
              <input
                type="number"
                id="repTime"
                name="repTime"
                required
                value={workout.repTime}
                onChange={handleChange}
              />
            </label>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>
              Number of Repetitions:
              <input
                type="number"
                id="repetitions"
                name="repetitions"
                required
                value={workout.repetitions}
                onChange={handleChange}
              />
            </label>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>
              Type of Workout:
              <select
                name="workoutType"
                id="workoutType"
                required
                value={workout.workoutType}
                onChange={handleChange}
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
      
      <div>
            <button type="submit" onClick={getAllWorkouts}>Get Workouts</button>
      </div>


      {/* Right side - List of Workouts */}
      <div style={{ width: '50%', padding: '20px' }}>
        <h2>Workout List</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {allWorkout.map((workout, index) => (
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
    </>
  );
};

export default Home;
