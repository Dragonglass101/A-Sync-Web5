import React, {useContext} from "react";
import FitbitService from "../utils/fitbitService";
import exerciseList from "../data/exercises";
import { Web5Context } from "../context/Web5Context";

const userDid = "did:ion:EiDbkSjMyUujcP2oc5SEzSvd94u0VIb2vpQOkrVg8ZXqig:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiMlJhMy1JODRjSlFJUnlyNmNQT1M4TG9LUlkxejhzWnV1S1lWRXFhLXNHdyJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJxbmdsQ1F0TmVpMjV1Y2FmNmFQMHJrejJNYXlBODRhWDZJMlktUldsVmFvIiwieSI6Ik9rb0NfWXQwZldLb2lFaGxtdHdKcVV0WmtmbldhVklKLVhVcDFXQTdtd3MifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMCIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduNiJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlDeEVaa0tRNVBEbEJVWEN5VDlsYjVVX29pek1PYlRsbFNNVUtCSmI5U01wZyJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpQzlCeVliUXpDN1ZBNW9YOGlWMUUzcWdKYXU3WWpONFBjQllnamVSVkZKM0EiLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUI2ZTEyUzI5Z1JBN2xTSzZWQTZKazhqTlRiQzRNQnY0S2FfMzBqSlo5cV9nIn19"
const fitbitServerDid = "did:ion:EiBe0V3UQnVDUuiXB1lTIsXIAd3YUj99ts5LYcm3mooDLw:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoidFp5UGoyN2N6WXRIa1lUWTRBcVpDelVVQWx1S0JKZ2ViQW1DcWFYbVNMayJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJkd0puQVo2YTJROVpoVHdFSHU2a004Z25qajlBX3VrS0NHZy1OQVVCVW9ZIiwieSI6IjhVREZfaHBhdU9WbVRfYllyeGstbHdZcTBmODZteDZoRWczUmkxSWpyUGcifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMyIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduNSJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlBeUFiaTZ4ajdsWlZUMHRhR1QwM0cwUDRTa3ZueUlud2VWWENKdlBvdlRCUSJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpRC1qR3NUY2RaeVg3b1A3UElRUmJ0NEY3Y25NYXRNRWNsTVloM09tUzdkbHciLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUJWWWx3OG9JSWxRU002M18xemx0c1pZRlF6bzhmM1dzLXQ2bko3UmdoM1VRIn19"
const nutrifitServerDid = ""

const FitbitServer = () => {
    const { web5, did, protocolDefinition} = useContext(Web5Context);
    const fitbitService = FitbitService();

    function getRandomElements(arr, count) {
        const copyArray = [...arr];
        count = Math.min(count, copyArray.length);
      
        for (let i = copyArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
        }
      
        return copyArray.slice(0, count);
      }

    async function handleReadWorkout(){
        const workoutRecords = await fitbitService.queryWorkoutRecords(userDid);
        const workoutRecords1 = await fitbitService.queryWorkoutRecords(fitbitServerDid);
        const exerciseRecords = await fitbitService.queryExerciseRecords(workoutRecords[0].id, userDid);
        const exerciseRecords1 = await fitbitService.queryExerciseRecords(workoutRecords1[0].id, fitbitServerDid);
        console.log(workoutRecords);
        // console.log(exerciseRecords);
        console.log(workoutRecords1);
        console.log(exerciseRecords1);
    }

    async function handleWriteRec(){
        const recExerciseList = getRandomElements(exerciseList, 4);
        const workoutRecord = await fitbitService.createWorkout({"Name":"Rec Workout", "Day":"NA"});
        console.log("workout record", workoutRecord);
        
        for(let e of recExerciseList){
            await fitbitService.createExercise(e, workoutRecord.id);
        }
    }

    async function handleExercise(){
        const exercises = await fitbitService.queryAllExerciseRecords(did);
        console.log("exe",exercises);
    }

    return (
        <div>
        <h1>Fitbit Server</h1>
        <p>{did}</p>
        <button onClick={handleReadWorkout}> Get All Workouts from user</button>
        <div>
        <button onClick={handleExercise}> Get All Exercises user without parent</button>
        </div>
        <div>
        <button onClick={handleWriteRec}> Write Rec Exercises</button>
        </div>
        </div>
    );
};

export default FitbitServer;
