import { useContext, useState } from "react";
import { Web5Context } from "../context/Web5Context";
import { useNavigate } from "react-router-dom";

const fitbitServerDid = "did:ion:EiCgPzS1oP09RTqUT-vCcKIwIpNSELbfJBejHrVQ8zBNLg:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiN0w3eEFkc0pyTzY0ZXM1VFNBY1pFZGVlbDBnY0hjTWhNUU9Jb2F4VWtmYyJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJ2V3VyNmtDeExDLWhNbG5iRFc4bnZQZWM2RUFtNFExQzJvSV8wOEVleUtFIiwieSI6InlEZHpTZGFPUUdZZzU0dmNjVlUtWERybmFPSG9vTzg2MzdRLWNEM0Q0TlkifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMyIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMSJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlEamZfTkEzZ3QxXzF6TWFWZ1FxaTNWb0x1ZzFXYjBNU3ZYYzF6UjI3SlI5ZyJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpQkRzaWM1NE9sUGpHaFJ2dTZXY1hwTFZJY2NKNEgxNTNFUllON0xQQTRRUVEiLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUFocWNoa1A3SmhxQUQ3c2JfR01wY1o5azF6NG1vRUNDbEFza3FaTTFQUlBBIn19"
const nutrifitServerDid = ""


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

    const createWorkout = async(workoutdata) => {
        const userWorkout = await getUserWorkout();
        try {
            const {record, status} = await web5.dwn.records.write({
                "data": workoutdata,
                "message": {
                    "recipient": fitbitServerDid,
                    "parentId": userWorkout[0].id,
                    "contextId": userWorkout[0].id,
                    "protocol": protocolDefinition.protocol,
                    "protocolPath": "userworkout/workout",
                    "schema": protocolDefinition.types.workout.schema,
                    "dataFormat": "application/json"
                }
            });
            console.log("create workout status:", status);
            return record;
        } catch (error) {
            console.error("Error Creating Workout : ", error);
        }    
    };

    const createExercise = async(exerciseData, workoutRecordId, DID) => {
        const userWorkout = await getUserWorkout();
        try {
            const { record } = await web5.dwn.records.write({
                "data": exerciseData,
                "message": {
                    "recipient": fitbitServerDid,
                    "parentId": workoutRecordId,
                    "contextId": userWorkout[0].id,
                    "protocol": protocolDefinition.protocol,
                    "protocolPath": "userworkout/workout/exercise",
                    "schema": protocolDefinition.types.exercise.schema,
                    "dataFormat": "application/json"
                }
            });
            const {status} = await record.send(DID);
            console.log(status);
            return record;
        } catch (error) {
            console.error("Error Creating Workout : ", error);
        }    
    };

    const getRecordsWithParentId = async(parentID, DID) => {
        try {
            const { records, status } = await web5.dwn.records.query({
              from: DID,
              message: {
                protocol: protocolDefinition.protocol,
                filter: {
                  parentId: parentID
                },
              },
            });
            console.log(records, status);
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

    const queryWorkoutRecords = async(DID) => {
      try {
        const { records, status } = await web5.dwn.records.query({
          from: DID,
          message: {
            filter: {
              schema: protocolDefinition.types.workout.schema,
            },
          },
        });
        console.log(records, status);
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
    }
    const queryAllExerciseRecords = async(DID) => {
      try {
        const { records, status } = await web5.dwn.records.query({
          from: DID,
          message: {
            filter: {
              schema: protocolDefinition.types.exercise.schema,
            }
          },
        });
        console.log(records, status);
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
    }
    const queryExerciseRecords = async(parentID, DID) => {
      try {
        const { records, status } = await web5.dwn.records.query({
          from: DID,
          message: {
            filter: {
              parentId: parentID,
              schema: protocolDefinition.types.exercise.schema,
            },
            dateSort: 'createdDescending',
          },
        });
        console.log(records, status);
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
    }

    const deleteWithRecordId = async (RecordId) => {
      try {
        await web5.dwn.records.delete({
          message: {
            protocol: protocolDefinition.protocol,
            recordId: RecordId,
          },
        });
        console.log("record deleted successfully")
      } catch (error) {
        console.error("Error Deleting Workout Name: ", error);
      }
    };

    const createRecExercise = async(exerciseData, userDid) => {
      try {
          const response = await web5.dwn.records.write({
              "data": exerciseData,
              "message": {
                  "protocol": protocolDefinition.protocol,
                  "protocolPath": "userworkout/workout/exercise",
                  "schema": protocolDefinition.types.exercise.schema,
                  "dataFormat": "application/json"
              }
          });
          console.log("rec" ,response);
          // const {status} = await record.send(userDid);
          // console.log(status);
          return record;
      } catch (error) {
          console.error("Error Creating Workout : ", error);
      }    
  };

  return {
    getUserWorkout,
    createUserWorkout,
    createWorkout,
    createExercise,
    getRecordsWithParentId,
    queryWorkoutRecords,
    queryExerciseRecords,
    queryAllExerciseRecords,
    deleteWithRecordId,
    createRecExercise
  };
};

export default FitbitService;
