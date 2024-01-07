// userService.js

import { useContext, useState } from "react";
import { Web5Context } from "../context/Web5Context";
import {calcCalorie} from "../utils/calcCalorie"


const AddWorkoutService = () => {
  const { web5, did} = useContext(Web5Context);

  const [allWorkout, setAllWorkout] = useState([]);

  const addWorkout = async(workoutRecord) => {
    try {
        workoutRecord.calorie = calcCalorie();
        const { record } = await web5.dwn.records.write({
        data: { ...workoutRecord },
        message: {
            // protocol: protocolDefinition.protocol,
            schema: "https://schema.org/Fitbit/Workouts",
            dataFormat: 'application/json'
        },
        });
        const {status} = await record.send(did);
        console.log(status);
        alert(`Workout Added Successfully!`)
    } catch (error) {
        console.error("Error Creating Workout : ", error);
    }    
  };

  return {
    addWorkout,
  };
};

export default AddWorkoutService;
