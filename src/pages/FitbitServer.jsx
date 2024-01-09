import React, { useContext, useState } from "react";
import FitbitService from "../utils/fitbitService";
import NutrifitService from "../utils/nutrifitService";
import exerciseList from "../data/exercises";
import { Web5Context } from "../context/Web5Context";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const userDid = "did:ion:EiDbkSjMyUujcP2oc5SEzSvd94u0VIb2vpQOkrVg8ZXqig:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiMlJhMy1JODRjSlFJUnlyNmNQT1M4TG9LUlkxejhzWnV1S1lWRXFhLXNHdyJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJxbmdsQ1F0TmVpMjV1Y2FmNmFQMHJrejJNYXlBODRhWDZJMlktUldsVmFvIiwieSI6Ik9rb0NfWXQwZldLb2lFaGxtdHdKcVV0WmtmbldhVklKLVhVcDFXQTdtd3MifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMCIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduNiJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlDeEVaa0tRNVBEbEJVWEN5VDlsYjVVX29pek1PYlRsbFNNVUtCSmI5U01wZyJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpQzlCeVliUXpDN1ZBNW9YOGlWMUUzcWdKYXU3WWpONFBjQllnamVSVkZKM0EiLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUI2ZTEyUzI5Z1JBN2xTSzZWQTZKazhqTlRiQzRNQnY0S2FfMzBqSlo5cV9nIn19"

const FitbitServer = () => {
    const { web5, did, protocolDefinition } = useContext(Web5Context);
    const fitbitService = FitbitService();
    const nutrifitService = NutrifitService();

    const [backdropOpen, setBackdropOpen] = useState(false);
    const closeBackdrop = () => {
        setBackdropOpen(false);
    };
    const openBackdrop = () => {
        setBackdropOpen(true);
    };

    function getRandomElements(arr, count) {
        const copyArray = [...arr];
        count = Math.min(count, copyArray.length);

        for (let i = copyArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
        }

        return copyArray.slice(0, count);
    }

    async function handleWriteRec(recExerciseList) {
        const workoutRecord = await fitbitService.createWorkout({ "Name": "Rec Workout", "Day": "NA" });
        console.log("workout record", workoutRecord);

        for (let e of recExerciseList) {
            await fitbitService.createExercise(e, workoutRecord.id);
        }
        closeBackdrop();
    }

    async function handleRunAlgo(){
        openBackdrop();
        const foodItems = await nutrifitService.queryAllFoodRecords(userDid);
        console.log('user foodItems', foodItems);

        var totalCalories = 0;

        for(let exe of Object.values(foodItems)){
            if(exe.data.completed)
                totalCalories += exe.data.cal;
        }
        console.log(totalCalories);

        if(totalCalories > 1200){
            const heavyWorkout = exerciseList.slice(-4);
            handleWriteRec(heavyWorkout);
        }
        else{
            const lightWorkout = exerciseList.slice(0, 4);
            handleWriteRec(lightWorkout);
        }
    }

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdropOpen}
            >
                <div className="d-flex justify-content-center p-5" style={{backgroundColor:'black'}}>
                    <CircularProgress color="inherit" />
                    <h3 className="ms-5 fw-bold" style={{ color: 'rgb(18, 185, 129)' }}>Algorithm Running...</h3>
                </div>
            </Backdrop>
            <div className="container my-5">
                <h1 className="fw-bold mb-5" style={{ color: '#C0DEDD' }}>Fitbit Server</h1>
                <p style={{ overflowWrap: 'anywhere' }}>{did}</p>
                <div onClick={handleRunAlgo} className="d-flex flex-column justify-content-start w-25">
                    <Button variant="outlined" style={{textTransform:'capitalize', fontFamily:'Space Mono', width: '800px', backgroundColor:'#f24646'}} className="my-3">
                        <h2>Run Recommendation Algorithm</h2>
                    </Button>
                </div>
            </div>
        </>
    );
};

export default FitbitServer;
