import { useContext, useState } from "react";
import { Web5Context } from "../context/Web5Context";
import { useNavigate } from "react-router-dom";

const FitbitService = () => {
  const { web5, did, protocolDefinition} = useContext(Web5Context);
  const navigate = useNavigate();

  const getUserWorkout = async() => {
        try {
          const { records, status } = await web5.dwn.records.query({
            message: {
              protocol: protocolDefinition.protocol,
              filter: {
                protocolPath: "userworkout",
                schema: protocolDefinition.types.userworkout.schema,
              },
            },
          });
          console.log(status);
          const newList = await Promise.all(
            records.map(async (record) => {
              const data = await record.data.json();
              return { record, data, id: record.id };
            })
          );    
          return newList;
      
        } catch (error) {
          console.error("Error Getting Workouts", error);
        }
    };

    const createUserWorkout = async() => {
        try {
            const { record } = await web5.dwn.records.write({
                "data": {
                    "name": "userworkout"
                },
                "message": {
                    "protocol": protocolDefinition.protocol,
                    "protocolPath": "userworkout",
                    "schema": protocolDefinition.types.userworkout.schema,
                    "dataFormat": "application/json"
                }
            });
            const {status} = await record.send(did);
            console.log(status);
        } catch (error) {
            console.error("Error Creating Workout : ", error);
        }    
      };

  return {
    getUserWorkout,
    createUserWorkout,
  };
};

export default FitbitService;
