// userService.js

import { useContext, useState } from "react";
import { Web5Context } from "../context/Web5Context";
import {calcCalorie} from "../utils/calcCalorie"


const AddWorkoutService = () => {
  const { web5, did, protocolDefinition} = useContext(Web5Context);

  const [allWorkout, setAllWorkout] = useState([]);

  const addWorkout = async(workoutRecord) => {
    try {
        const { record } = await web5.dwn.records.write({
        data: { ...workoutRecord },
        message: {
            protocol: protocolDefinition.protocol,
            protocolPath: "sharedWorkouts",
            schema: protocolDefinition.types.sharedWorkouts.schema,
            dataFormat: 'application/json',
            recipient: did,
            published: true,
        },
        });
        const {status} = await record.send(did);
        console.log(status);
        alert(`Workout Added Successfully!`)
        // window.location.reload();
    } catch (error) {
        console.error("Error Creating Workout : ", error);
    }    
  };

  return {
    addWorkout,
  };
};

export default AddWorkoutService;
