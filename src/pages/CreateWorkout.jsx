import Navbar from "./Navbar.jsx";

import workoutIcon from "../assets/images/workoutIcon.png"
import calendarIcon from "../assets/images/calendarIconImg.png"
import exerciseList from "../data/exercises.js"
import FitbitService from "../utils/fitbitService";
import EditIcon from '@mui/icons-material/Edit';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const CreateWorkout = () => {
    const fitbitService = FitbitService();
    const [selectedExercises, setselectedExercises] = useState([]);
    const workoutName = useRef('default');
    const workoutDay = useRef('default');
    const navigate = useNavigate();

    const [backdropOpen, setBackdropOpen] = useState(false);
    const closeBackdrop = () => {
        setBackdropOpen(false);
    };
    const openBackdrop = () => {
        setBackdropOpen(true);
    };

    const exerciseCards = [];

    function handleSelectExercise(event, exe) {
        const card = event.currentTarget;

        if (card.classList.contains('selectedcard')) return;

        card.classList.add('selectedcard');
        card.classList.remove('unselectedcard');

        setselectedExercises([...selectedExercises, exe])
        console.log(selectedExercises);
    }

    const temp = exerciseList.slice(0, 6);

    for (let exe of temp) {
        exerciseCards.push(
            <article onClick={(e) => { handleSelectExercise(e, exe) }} className="unselectedcard programstoprogram d-flex flex-column align-items-center p-0" style={{ borderRadius: '25px', width: '250px' }} >
                <span className="h-100 m-0 p-1" style={{ width: '100%', borderRadius: '25px 25px 0 0' }}>
                    <img src={exe.imageurl} className="w-100" style={{ borderRadius: '25px 25px 0 0' }} />
                </span>
                <div className="w-100 d-flex">
                    <div className="w-75 border-end py-2">
                        <p className="fw-bold text-white small m-0 p-0">{exe.name}</p>
                        <p className="text-secondary small m-0 p-0">{exe.type}</p>
                    </div>
                    <div className="w-25 border-start py-3">
                        <p className="text-white small m-0 p-0" style={{ fontSize: 'xx-small' }}>{exe.cal} kcal</p>
                        <p className="text-white small m-0 p-0" style={{ fontSize: 'xx-small' }}>{exe.reps} reps</p>
                    </div>
                </div>
            </article>

        )
    }

    async function createWorkout() {
        openBackdrop();
        const workoutRecord = await fitbitService.createWorkout({ "Name": workoutName.current.value, "Day": workoutDay.current.value });
        console.log("workout record", workoutRecord);

        for(let e of selectedExercises){
            await fitbitService.createExercise(e, workoutRecord.id)
        }
        closeBackdrop();
        navigate("/workout/my");
    }

    return (
        <>
            <Navbar />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdropOpen}
            >
                <div className="d-flex justify-content-center p-5" style={{backgroundColor:'black'}}>
                    <CircularProgress color="inherit" />
                    <h3 className="ms-5 fw-bold" style={{ color: 'rgb(18, 185, 129)' }}>Creating Workout ...</h3>
                </div>
            </Backdrop>
            <section className="programs">
                <div className="mx-auto programstocontainer d-flex mb-3" style={{ width: '90%' }}>
                    <div className="w-25 text-start fw-bold">
                        <h3 className="fw-bold">
                            <DriveFileRenameOutlineIcon className="mx-4 h2 fw-bold" style={{ color: 'rgb(200, 133, 0)' }} />
                            Details
                        </h3>
                    </div>
                    <div className="col text-center d-flex">
                        <div className="ms-5" style={{ borderLeft: '6px transparent', height: '100%' }}></div>
                    </div>
                    <div className="w-75 text-center fw-bold"><h3 className="fw-bold"><FitnessCenterIcon className="mx-3 h2 fw-bold" style={{ color: 'rgb(200, 133, 0)' }} /> Excercises</h3></div>
                </div>
                <div className="mx-auto programstocontainer d-flex" style={{ width: '90%' }}>
                    <div className="sectiontohead undefined w-25 d-flex flex-column justify-content-center">
                        <div className="input-group my-3">
                            <img className="input-group-text bg-dark" src={workoutIcon} style={{ width: '80px' }} />
                            <input ref={workoutName} type="text" className="form-control bg-dark text-light workout-input" id="workout-name" placeholder="Workout Name" />
                        </div>
                        <div className="input-group my-3">
                            <img className="input-group-text bg-dark" src={calendarIcon} style={{ width: '80px' }} />
                            <input ref={workoutDay} type="text" className="form-control bg-dark text-light workout-input" id="workout-id" placeholder="Workout Day" />
                        </div>
                        <button onClick={createWorkout} className="bttn fw-bold w-100 mt-4" style={{ borderRadius: '8px !important' }}>Create</button>
                    </div>

                    <div className="col text-center d-flex">
                        <div className="ms-5" style={{ borderLeft: '6px solid white', height: '100%' }}></div>
                    </div>

                    <div className="programstowrapper d-flex flex-wrap w-75 justify-content-end mt-0">
                        {exerciseCards}
                    </div>
                </div>
            </section >
        </>
    )
}

export default CreateWorkout;