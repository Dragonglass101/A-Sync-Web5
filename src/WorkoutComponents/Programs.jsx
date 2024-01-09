import dumbleImg from "../assets/images/workoutIcon.png"
import { useRef, useState, useContext, useEffect } from "react";
import exerciseList from "../data/exercises.js"
import FitbitService from "../utils/fitbitService.jsx";
import { Web5Context } from "../context/Web5Context";

const fitbitServerDid = "did:ion:EiBe0V3UQnVDUuiXB1lTIsXIAd3YUj99ts5LYcm3mooDLw:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoidFp5UGoyN2N6WXRIa1lUWTRBcVpDelVVQWx1S0JKZ2ViQW1DcWFYbVNMayJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJkd0puQVo2YTJROVpoVHdFSHU2a004Z25qajlBX3VrS0NHZy1OQVVCVW9ZIiwieSI6IjhVREZfaHBhdU9WbVRfYllyeGstbHdZcTBmODZteDZoRWczUmkxSWpyUGcifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMyIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduNSJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlBeUFiaTZ4ajdsWlZUMHRhR1QwM0cwUDRTa3ZueUlud2VWWENKdlBvdlRCUSJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpRC1qR3NUY2RaeVg3b1A3UElRUmJ0NEY3Y25NYXRNRWNsTVloM09tUzdkbHciLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUJWWWx3OG9JSWxRU002M18xemx0c1pZRlF6bzhmM1dzLXQ2bko3UmdoM1VRIn19"
const nutrifitServerDid = ""

const Programs = () => {
  const { web5, did} = useContext(Web5Context);
  const fitbitService = FitbitService();
  const [recElements, setRecElements] = useState([]);

  async function getRecExercises(){
    const workoutRecords = await fitbitService.queryWorkoutRecords(fitbitServerDid);
    const index = Object.keys(workoutRecords).length;
    const exerciseRecords = await fitbitService.queryExerciseRecords(workoutRecords[index-1].id, fitbitServerDid);

    console.log(workoutRecords);
    console.log(exerciseRecords);

    const exerciseElements = [];
    for(let exe of Object.values(exerciseRecords)){
      exerciseElements.push(
        <article className="selectedcard programstoprogram d-flex flex-column align-items-center p-0" style={{ borderRadius: '25px', width: '250px' }} >
        <span className="h-100 m-0 p-1" style={{ width: '100%', borderRadius: '25px 25px 0 0' }}>
          <img src={exe.data.imageurl} className="w-100" style={{ borderRadius: '25px 25px 0 0' }} />
        </span>
        <div className="w-100 d-flex">
          <div className="w-75 border-end py-2">
            <p className="fw-bold text-white small m-0 p-0">{exe.data.name}</p>
            <p className="text-secondary small m-0 p-0">{exe.data.type}</p>
          </div>
          <div className="w-25 border-start py-3">
            <p className="text-white small m-0 p-0" style={{ fontSize: 'xx-small' }}>{exe.data.cal} kcal</p>
            <p className="text-white small m-0 p-0" style={{ fontSize: 'xx-small' }}>{exe.data.reps} reps</p>
          </div>
        </div>
      </article>
      )
    }
    setRecElements(exerciseElements);
}

  useEffect(() => {
    if(web5){
      getRecExercises();
    }
  }, [web5, did]);
  

  return (
    <section className="programs pb-5 mx-5 border border-2 border-top-0" style={{backgroundColor:'#1B1B1C', borderRadius:'25px', borderColor:'rgb(192, 222, 221) !important'}}>
      <div className="container programstocontainer">
        <div className="sectiontohead pt-4 undefined">
          <img className="me-4" src={dumbleImg} style={{ width: '100px' }} />
          <h2 className="fw-bold" style={{color:'#C0DEDD'}}>Recommended Workout</h2>
        </div>
        <div className="programstowrapper d-flex">
          {recElements}
        </div>
      </div>
    </section>
  )
}

export default Programs