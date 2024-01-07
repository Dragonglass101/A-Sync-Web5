import React, {useState, useContext, useEffect} from "react";
import dumbleImg from "../assets/images/dumble.png"
import benchImg from "../assets/images/bench.png"
import { Link, useNavigate } from "react-router-dom"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import MyWorkoutService from "../services/MyWorkoutService";
import { Web5Context } from "../context/Web5Context";

const MyWorkouts = () => {
  const { web5, did} = useContext(Web5Context);
  const [workouts, setWorkouts] = useState([]);
  const myWorkoutService = MyWorkoutService();
  const navigate = useNavigate();

  function createWorkoutElements(workoutList){
    const workoutElement = [];

    for(let w of Object.values(workoutList)){
      workoutElement.push(
        <article className="card programstoprogram d-flex flex-row align-items-center p-0" style={{ borderRadius: '25px' }} >
        <span className="h-100 m-0" style={{ width: '20%' }}>
          <img src={benchImg} className="w-100" />
        </span>
        <h4 className="fw-bold w-50">{w.data.Name}</h4>
        <button className="btn btn-outline-light fw-bold me-2" style={{ width: '20%' }}>Edit</button>
        <button className="btn btn-light">
          <ShareIcon className="text-dark" />
        </button>
      </article>
      )
    }
    setWorkouts(workoutElement);
  }

  useEffect(() => {
    const getWorkouts = async () => {
      const workoutList = await myWorkoutService.getAllWorkout();
      console.log(workoutList);

      createWorkoutElements(workoutList);
    };
    if(web5)
      getWorkouts();
  }, [web5, did])
  


  return (
    <>
      <section className="programs">
        <div className="container programstocontainer">
          <div className="row justify-content-evenly">
            <div className="col-6">
              <div className="sectiontohead undefined">
                <img className="me-4" src={dumbleImg} style={{ width: '50px' }} />
                <h2 className="fw-bold">Your Workouts</h2>
              </div>
              <div className="programstowrapper d-flex flex-column">
                <button onClick={()=>{navigate("/workout/create")}} className="btn btn-dark h-100 m-0 text-center w-100 border border-3" style={{ borderRadius: '25px' }}>
                  <AddCircleIcon style={{ height: '50px' }} />
                </button>

                {workouts}
              </div>
            </div>
            <div className="col text-center d-flex">
              <div className="mx-auto" style={{ borderLeft: '6px solid white', height: '500px' }}></div>
            </div>

            <div className="col-4">
              <div className="sectiontohead undefined">
                <img className="me-4" src={dumbleImg} style={{ width: '50px' }} />
                <h2 className="fw-bold mb-0">Shared Workouts</h2>
              </div>
              <div className="programstowrapper d-flex flex-column">
                <article className="card programstoprogram d-flex flex-row align-items-center p-0" style={{ borderRadius: '25px' }} >
                  <span className="h-100 m-0" style={{ width: '20%' }}>
                    <img src={benchImg} className="w-100" />
                  </span>
                  <h4 className="fw-bold w-50">Workout-1</h4>
                  {/* <button variant="contained" className="btn btn-outline-light fw-bold w-25">Edit</button> */}
                </article>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default MyWorkouts;