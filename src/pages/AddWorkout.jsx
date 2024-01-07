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
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value,
    });
  };

  const createWorkout = async () => {
    const selectedExercisesData = selectedExercises.map(
      (index) => exerciseList[index]
    );
  
    setWorkout({
      ...workout,
      Exercises: selectedExercisesData,
    });

    addWorkoutService.addWorkout(workout);
    
  };

  function addExercise(e){
    const exerciseName = e.target.value;

    for(let exe of exerciseList){

    }

    for(let exe of exerciseList){
      if(exe.name === exerciseName){
        const updatedExercises = [...workout.Exercises, exe];

        // Update the workout state
        setWorkout(prevWorkout => ({
          ...prevWorkout,
          Exercises: updatedExercises,
        }));
      }
    }

  }

  const exerciseElements = [];

  console.log(exerciseList.length, "exercises");
  for(let exe of exerciseList){
    exerciseElements.push(
    <div>
      <input type="checkbox" id={exe.name} onClick={addExercise} name="exercise" value={exe.name}/>
      <label for="exercise1">{exe.name}</label>
    </div>
    )
  }

  return (
  <>
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
            {exerciseElements}
        </div>
        <button type="button" onClick={createWorkout}>
          Create Workout
        </button>
      </form>

  </>

  );
};

export default AddWorkout;