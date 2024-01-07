import dumbleImg from "../assets/images/dumble.png"
import exerciseList from "../data/exercises.js"
import AddWorkoutService from "../services/AddWorkoutService.jsx";
import { useRef, useState } from "react";

const CreateWorkout = () => {
    const addWorkoutService = AddWorkoutService();
    const [selectedExercises, setselectedExercises] = useState([]);
    const [workout, setWorkout] = useState([]);
    const workoutName = useRef('default');
    const workoutDay = useRef('default');

    const exerciseCards = [];


    function handleSelectExercise(event, exe){
        const card = event.currentTarget;

        if(card.classList.contains('selectedcard')) return;

        card.classList.add('selectedcard');
        card.classList.remove('card');

        setselectedExercises([...selectedExercises, exe])
        console.log(selectedExercises);
    }

    const createWorkout = async () => {
        const selectedExercisesData = selectedExercises.map(
          (index) => exerciseList[index]
        );
      
        setWorkout({
          Name: workoutName.current.value,
          Day: workoutDay.current.value,
          Exercises: selectedExercisesData,
        });
    
        addWorkoutService.addWorkout(workout);
    };

    for(let exe of exerciseList){
        exerciseCards.push(
            <article onClick={(e)=>{handleSelectExercise(e, exe)}} className="card programstoprogram d-flex flex-column align-items-center p-0" style={{ borderRadius: '25px', width:'250px' }} >
                <span className="h-100 m-0" style={{ width: '100%', borderRadius: '25px 25px 0 0' }}>
                    <img src={exe.imageurl} className="w-100" style={{borderRadius:'25px 25px 0 0'}}/>
                </span>
                <div className="w-100 d-flex">
                    <div className="w-50">
                        <p className="fw-bold text-white m-0 p-0">{exe.name}</p>
                        <p className="text-secondary small m-0 p-0">{exe.type}</p>
                    </div>
                    <div className="w-50">
                        <span className="p-0 m-0 w-100 border border-2" style={{fontSize: 'xx-small', borderRadius: '0px' }}>
                            {exe.cal} kcal<br/>
                            {exe.reps} reps
                        </span>
                    </div>
                </div>
            </article>
        )
    }


    return (
        <>
            <section className="programs">
                <div className="mx-auto programstocontainer" style={{width:'90%'}}>
                    <div className="sectiontohead undefined">
                        <img className="me-4" src={dumbleImg} style={{ width: '50px' }} />
                        <div className="form-floating mb-3">
                            <input ref={workoutName} type="text" className="form-control" id="workout-name" placeholder="Workout Name" />
                            <label forHtml="workout-name">Workout Name</label>
                        </div>
                            <input ref={workoutDay} type="text" className="form-control" id="workout-day" placeholder="Workout Day" />
                        <button onClick={createWorkout} style={{padding: '5px',backgroundColor: 'darkgreen', color: 'white'}}>Create Workout</button>
                    </div>

                    <div className="programstowrapper d-flex flex-wrap">
                    {exerciseCards}
                    </div>
                </div>
            </section>
        </>
    )
}

export default CreateWorkout;