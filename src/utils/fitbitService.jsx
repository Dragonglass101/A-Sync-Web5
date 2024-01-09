import { useContext } from "react";
import { Web5Context } from "../context/Web5Context";

const FitbitService = () => {
    const { web5, did, protocolDefinition} = useContext(Web5Context);

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

  const toggleExerciseStatus = async (workoutId, exerciseId) => {
    try {
      const { record } = await web5.dwn.records.read({
        message: {
          protocol: protocolDefinition.protocol,
          filter: {
            protocolPath: "userworkout/workout/exercise",
            schema: protocolDefinition.types.exercise.schema,
            parentId: workoutId,
            recordId: exerciseId,
          },
        },
      });
      console.log(record);
  
      const currentExerciseData = await record.data.json();
      console.log(currentExerciseData);
      const updatedExerciseData =  {
            ...currentExerciseData,
            completed: !currentExerciseData.completed,
      };

      await record.update({
        data: {
          ...updatedExerciseData,
        },
      });
  
      console.log("Exercise status toggled successfully!");
    } catch (error) {
      console.error("Error toggling exercise status: ", error);
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
    toggleExerciseStatus,
    createRecExercise
  };
};

export default FitbitService;
