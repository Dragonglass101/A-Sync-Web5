import { useContext, useState } from "react";
import { Web5Context } from "../context/Web5Context";
import { useNavigate } from "react-router-dom";
import FitbitServer from "../pages/FitbitServer";


const userDid = "did:ion:EiDbkSjMyUujcP2oc5SEzSvd94u0VIb2vpQOkrVg8ZXqig:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiMlJhMy1JODRjSlFJUnlyNmNQT1M4TG9LUlkxejhzWnV1S1lWRXFhLXNHdyJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJxbmdsQ1F0TmVpMjV1Y2FmNmFQMHJrejJNYXlBODRhWDZJMlktUldsVmFvIiwieSI6Ik9rb0NfWXQwZldLb2lFaGxtdHdKcVV0WmtmbldhVklKLVhVcDFXQTdtd3MifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMCIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduNiJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlDeEVaa0tRNVBEbEJVWEN5VDlsYjVVX29pek1PYlRsbFNNVUtCSmI5U01wZyJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpQzlCeVliUXpDN1ZBNW9YOGlWMUUzcWdKYXU3WWpONFBjQllnamVSVkZKM0EiLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUI2ZTEyUzI5Z1JBN2xTSzZWQTZKazhqTlRiQzRNQnY0S2FfMzBqSlo5cV9nIn19"
const fitbitServerDid = "did:ion:EiBe0V3UQnVDUuiXB1lTIsXIAd3YUj99ts5LYcm3mooDLw:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoidFp5UGoyN2N6WXRIa1lUWTRBcVpDelVVQWx1S0JKZ2ViQW1DcWFYbVNMayJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJkd0puQVo2YTJROVpoVHdFSHU2a004Z25qajlBX3VrS0NHZy1OQVVCVW9ZIiwieSI6IjhVREZfaHBhdU9WbVRfYllyeGstbHdZcTBmODZteDZoRWczUmkxSWpyUGcifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMyIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduNSJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlBeUFiaTZ4ajdsWlZUMHRhR1QwM0cwUDRTa3ZueUlud2VWWENKdlBvdlRCUSJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpRC1qR3NUY2RaeVg3b1A3UElRUmJ0NEY3Y25NYXRNRWNsTVloM09tUzdkbHciLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUJWWWx3OG9JSWxRU002M18xemx0c1pZRlF6bzhmM1dzLXQ2bko3UmdoM1VRIn19"
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
                    "published": true,
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
            const {record} = await web5.dwn.records.write({
                "data": workoutdata,
                "message": {
                    "published": true,
                    "parentId": userWorkout[0].id,
                    "contextId": userWorkout[0].id,
                    "protocol": protocolDefinition.protocol,
                    "protocolPath": "userworkout/workout",
                    "schema": protocolDefinition.types.workout.schema,
                    "dataFormat": "application/json"
                }
            });
            const {status} = await record.send(did);
            console.log("create workout status:", record, status);
            return record;
        } catch (error) {
            console.error("Error Creating Workout : ", error);
        }    
    };

    const createExercise = async(exerciseData, workoutRecordId) => {
        const userWorkout = await getUserWorkout();
        try {
            const { record } = await web5.dwn.records.write({
                "data": exerciseData,
                "message": {
                    "published": true,
                    "parentId": workoutRecordId,
                    "contextId": userWorkout[0].id,
                    "protocol": protocolDefinition.protocol,
                    "protocolPath": "userworkout/workout/exercise",
                    "schema": protocolDefinition.types.exercise.schema,
                    "dataFormat": "application/json"
                }
            });
            const {status} = await record.send(did);
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
        const {records, status} = await web5.dwn.records.query({
          from: DID,
          message: {
            filter: {
              schema: protocolDefinition.types.exercise.schema,
            }
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
          const {status} = await record.send(userDid);
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
