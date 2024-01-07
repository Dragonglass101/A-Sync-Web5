// userService.js

import { useContext, useState } from "react";
import { Web5Context } from "../context/Web5Context";
import {calcCalorie} from "../utils/calcCalorie"
import { useNavigate } from "react-router-dom";


const AddWorkoutService = () => {
  const { web5, did, protocolDefinition} = useContext(Web5Context);
  const navigate = useNavigate();

  const [allWorkout, setAllWorkout] = useState([]);

  const addWorkout = async(workoutRecord) => {
    try {
        const { record } = await web5.dwn.records.write({
            data: { ...workoutRecord },
            message: {
                protocol: protocolDefinition.protocol,
                protocolPath: "myWorkouts",
                schema: protocolDefinition.types.myWorkouts.schema,
                dataFormat: 'application/json',
                recipient: did,
            },
        });
        const {status} = await record.send(did);
        console.log(status);
        alert(`Workout Added Successfully!`)
        navigate("/workout/my")
    } catch (error) {
        console.error("Error Creating Workout : ", error);
    }    
  };

  return {
    addWorkout,
  };
};

export default AddWorkoutService;
