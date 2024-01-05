import { useEffect, useState, useContext} from "react";
import { Web5Context } from "../utils/Web5Context";
import { protocolDefinition } from "../protocol";
// import protocolDefinition from "../protocol";
// import {publicDid} from "../utils/constants"


const FitbitHome = () => {
  const { web5, did, protocolDefinition} = useContext(Web5Context);
  useEffect(() => {
    if (did) {
      console.log("The DID : ", did);
    }
  }, [web5, did, protocolDefinition]);



  const [allWorkout, setAllWorkout] = useState([]);
  const [allMeals, setAllMeals] = useState([]);
  const [workout, setWorkout] = useState({
    workoutName: '',
    repTime: '',
    repetitions: '',
    completed: false,
    calorie: 0,
    workoutType: 'other',
  });

  const calculateCalorie = (repTime, repetitions) => {
    return repTime * repetitions;
  };

  const getAllMeals = async() => {
    console.log("Getting Your Meals ... ")
    const { records } = await web5.dwn.records.query({message: {
      filter:{
        protocol: protocolDefinition.protocol,
        schema: protocolDefinition.types.NutriFit.schema,
      }  
    }});
    const newList = await Promise.all(records.map(async (record) => {
      const data = await record.data.json();
      console.log(data);
      return { record, data, id: record.id };
    }));

    setAllMeals(newList);
    
  }

  const addMeal = async () => {
    console.log("Trying to create new meal")
    const meal = {
      mealName: 'Nahi Hona Plis',
      time: 2,
      dish: 2,
      completed: false,
      calorie: 0,
      mealType: 'other',
    };
    try {
      meal.calorie = calculateCalorie(meal.time, meal.dish);
      const { record } = await web5.dwn.records.write({
        data: { ...meal },
        message: {
          sprotocol: protocolDefinition.protocol,
          schema: protocolDefinition.types.NutriFit.schema,
          dataFormat: 'application/json'
        },
      });
      const {status} = await record.send(did);
      console.log(status);
      alert("Meal Created Successfully !")
    } catch (error) {
      alert("Meal Not Created ... ")
      console.error("Error Creating Meal : ", error);
    }
    
  };


  const getAllWorkouts = async () => {
    try {
      const { records, status } = await web5.dwn.records.query({
        message: {
          filter: {
            protocol: protocolDefinition.protocol,
            schema: protocolDefinition.types.Fitbit.schema,
          },
        },
      });
      console.log(status);
  
      const newList = await Promise.all(
        records.map(async (record) => {
          const data = await record.data.json();
          console.log("Got all your workouts Successfully !");
          return { record, data, id: record.id };
        })
      );
  
      setAllWorkout(newList);
    } catch (error) {
      console.error("Error Getting Workouts", error);
    }
  };
  
  const handleChange = (e) => {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value,
    });
  };

  const addWorkout = async () => {
    try {
      workout.calorie = calculateCalorie(workout.repTime, workout.repetitions);
      const { record } = await web5.dwn.records.write({
        data: { ...workout },
        message: {
          protocol: protocolDefinition.protocol,
          schema: protocolDefinition.types.Fitbit.schema,
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

  const handleDeleteWorkout = async (workoutRecord) => {
    try {
      // Find the index of the workout to be deleted
      const index = allWorkout.findIndex((record) => record.id === workoutRecord.id);
  
      if (index !== -1) {
        // Create a new array without the deleted workout
        const newList = [...allWorkout];
        newList.splice(index, 1);
        setAllWorkout(newList);
  
        // Delete the record in DWN
        await web5.dwn.records.delete({
          message: {
            protocol: protocolDefinition.protocol,
            schema: protocolDefinition.types.Fitbit.schema,
            recordId: workoutRecord.id,
          },
        });
  
        console.log(`Deleted workout with record ID: ${workoutRecord.id}`);
      } else {
        console.error("Workout not found for deletion");
      }
    } catch (error) {
      console.error("Error deleting workout: ", error);
    }
  };

  const handleUpdateWorkout = async (workoutRecord) => {
    console.log("Hehe");

    const index = allWorkout.findIndex((record) => record.id === workoutRecord.id);
    allWorkout[index].data.completed = !allWorkout[index].data.completed ;

    

  // Get record in DWN
    const { record } = await web5.dwn.records.read({
      message: {
        protocol: protocolDefinition.protocol,
        schema: protocolDefinition.types.Fitbit.schema,
        filter: {
          recordId: workoutRecord.id
        }
      }
    });

  // Update the record in DWN
    await record.update({ data: allWorkout[index].data });
  };
  


  const handleFormSubmit = (e) => {
    e.preventDefault();
    addWorkout();
    console.log("Create Doctor Working Successfully !")
  }


  return (
  <>
  <h1>Welcome to FitBit!</h1>
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
      <button type="submit" onClick={getAllWorkouts}>
        Get Workouts
      </button>

      <button type="submit" onClick={getAllMeals}>
        Get Meals
      </button>

      <button type="submit" onClick={addMeal}>
        Add Meals
      </button>

      {/* Right side - List of Workouts */}
      <div style={{ width: '100%', padding: '20px' }}>
        <h2>Workout List</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {allWorkout.map(({ record, data, id }, index) => (
            <li
              key={index}
              style={{
                marginBottom: '15px',
                padding: '15px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                position: 'relative',
                backgroundColor: data.completed ? 'green' : 'red',
              }}
            >
              <div>
                <strong>{data.workoutName}</strong>
              </div>
              <div style={{ marginTop: '10px' }}>
                <strong style={{ fontSize: '16px' }}>Calorie:</strong>
                <div style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '5px' }}>{data.calorie}</div>
              </div>
              <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
                <button onClick={() => handleUpdateWorkout(record)} style={{ marginLeft: '10px' }}>
                  Done
                </button>
                <button onClick={() => handleDeleteWorkout(record)} style={{ marginLeft: '10px' }}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Right side - List of Meals */}
      <div style={{ width: '100%', padding: '20px' }}>
        <h2>Meal List</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {allMeals.map(({ record, data, id }, index) => (
            <li
              key={index}
              style={{
                marginBottom: '15px',
                padding: '15px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                position: 'relative',
                backgroundColor: data.completed ? 'green' : 'red',
              }}
            >
              <div>
                <strong>{data.mealName}</strong>
              </div>
              <div style={{ marginTop: '10px' }}>
                <strong style={{ fontSize: '16px' }}>Calorie:</strong>
                <div style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '5px' }}>{data.calorie}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
  </>

  );
};

export default FitbitHome;
