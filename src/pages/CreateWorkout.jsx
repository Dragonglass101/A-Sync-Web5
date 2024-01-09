import workoutIcon from "../assets/images/workoutIcon.png"
import calendarIcon from "../assets/images/calendarIconImg.png"
import exerciseList from "../data/exercises.js"
import FitbitService from "../utils/fitbitService";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Web5Context } from "../context/Web5Context";

const CreateWorkout = () => {
    const { web5, did, protocolDefinition} = useContext(Web5Context);

    const fitbitService = FitbitService();
    const [selectedExercises, setselectedExercises] = useState([]);
    const [workout, setWorkout] = useState([]);
    const workoutName = useRef('default');
    const workoutDay = useRef('default');
    const navigate = useNavigate();

    const exerciseCards = [];

    function handleSelectExercise(event, exe) {
        const card = event.currentTarget;

        if (card.classList.contains('selectedcard')) return;

        card.classList.add('selectedcard');
        card.classList.remove('unselectedcard');

        setselectedExercises([...selectedExercises, exe])
        console.log(selectedExercises);
    }

    for (let exe of exerciseList) {
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

    async function createWorkout(){
        const workoutRecord = await fitbitService.createWorkout({"Name": workoutName.current.value, "Day": workoutDay.current.value});
        console.log("workout record", workoutRecord);

        for(let e of selectedExercises){
            await fitbitService.createExercise(e, workoutRecord.id, did)
        }
        navigate("/workout/my");
    }

    return (
        <>
            <section className="programs">
                <div className="mx-auto programstocontainer" style={{ width: '90%' }}>
                    <div className="sectiontohead undefined w-75">
                        <div className="d-flex justify-content-center">
                            <img className="me-4" src={workoutIcon} style={{ width: '80px' }} />
                            {/* <input ref={workoutName} type="text" className="form-control style-input" id="workout-name" placeholder="Workout Name" /> */}
                            <input ref={workoutName} type="text" className="form-control bg-dark text-light workout-input" id="workout-name" placeholder="Workout Name" />
                        </div>
                        <div className="d-flex justify-content-center">
                            <img className="me-4" src={calendarIcon} style={{ width: '80px' }} />
                            {/* <input ref={workoutDay} type="number" className="form-control style-input" id="workout-day" placeholder="Workout Day" /> */}
                            <input ref={workoutDay} type="text" className="form-control bg-dark text-light workout-input" id="workout-id" placeholder="Workout Day" />
                        </div>
                        <button onClick={createWorkout} className="bttn fw-bold">Create</button>
                    </div>

                    <div className="programstowrapper d-flex flex-wrap">
                        {exerciseCards}
                    </div>
                </div>
            </section >
        </>
    )
}

export default CreateWorkout;