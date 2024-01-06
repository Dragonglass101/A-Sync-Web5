import { useEffect, useState, useContext} from "react";
import { Web5Context } from "../context/Web5Context";
import AddWorkoutService from "../services/AddWorkoutService";
import exerciseList from "../data/exercises.js"

const AddWorkout = () => {

  const { web5, did, protocolDefinition} = useContext(Web5Context);
  const addWorkoutService = AddWorkoutService();

  const [workout, setWorkout] = useState({
    Name:'',
    Day:'',
    Exercises:[],
    Calorie:0,
  });
  const [exerciseList, setExerciseList] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);

  const handleCheckboxChange = (exerciseIndex) => {
    const updatedSelectedExercises = [...selectedExercises];

    if (updatedSelectedExercises.includes(exerciseIndex)) {
      const indexToRemove = updatedSelectedExercises.indexOf(exerciseIndex);
      updatedSelectedExercises.splice(indexToRemove, 1);
    } else {
      updatedSelectedExercises.push(exerciseIndex);
    }

    setSelectedExercises(updatedSelectedExercises);

  };

  
  const handleChange = (e) => {
    setExercise({
      ...exercise,
      [e.target.name]: e.target.value,
    });
  };

  const createWorkout = async () => {
    
  };
  async function addAllExercises(){
    const addExercise = async(exercise) => {
      try {
      const { record } = await web5.dwn.records.write({
        data: { exercise },
        message: {
        //   protocol: protocolDefinition.protocol,
          schema: `https://schema.org/Fitbit/ExerciseList`,
          dataFormat: 'application/json'
        },
      });
      const {status} = await record.send(did);
      console.log(status);
      } catch (error) {
        console.error("Error Adding Workout Name : ", error);
      }
    }

    exerciseList.forEach(addExercise);
}



  async function fetchExercises(){
    try {
      const { records, status } = await web5.dwn.records.query({
        message: {
          filter: {
            // protocol: protocolDefinition.protocol,
            schema: `https://schema.org/Fitbit/ExerciseList`,
          },
        },
      });
      console.log(status);
  
      const newList = await Promise.all(
        records.map(async (record) => {
          const data = await record.data.json();
          return { data};
        })
      );

      console.log("exercises fetched")
      console.log(newList);
      setExerciseList(newList);
      return newList;
  
    } catch (error) {
      console.error("Error Getting Workout", error);
    }
  }


  return (
  <>
  <h1>Welcome to FitBit!</h1>
  <button onClick={addAllExercises}>Add Exercises to Record </button>
  <button onClick={fetchExercises}>Load Workouts</button>


  <h1>Welcome to FitBit!</h1>
  <form>
        <label>
          Workout Name:
          <input
            type="text"
            name="Name"
            required
            value={workout.Name}
            onChange={handleChange}
          />
        </label>
        <label>
          Workout Day:
          <input
            type="text"
            name="Day"
            required
            value={workout.Day}
            onChange={handleChange}
          />
        </label>
        <div>
          <h2>Exercise List</h2>
          <ul>
            {exerciseList.map((exercise, index) => (
              <li key={index}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedExercises.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  {exercise.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <button type="button" onClick={createWorkout}>
          Create Workout
        </button>
      </form>

  </>

  );
};

export default AddWorkout;