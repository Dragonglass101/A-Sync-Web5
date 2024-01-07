// import Values from "../WorkoutComponents/Values"
// import FAQs from "../WorkoutComponents/FAQs"
// import Testimonails from "../WorkoutComponents/Testimonails"
// import Footer from "../WorkoutComponents/Footer"
import dumbleImg from "../assets/images/dumble.png"
import chestPressImg from "../assets/images/chestPress.jpeg"
import { Link } from "react-router-dom"
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ShareIcon from '@mui/icons-material/Share';
import benchImg from "../assets/images/bench.png"
import exerciseList from "../data/exercises.js"
import { useState } from "react";

const CreateWorkout = () => {

    const [selectedExercises, setselectedExercises] = useState([]);

    const exerciseCards = [];


    function handleSelectExercise(event, exe){
        const card = event.currentTarget;

        if(card.classList.contains('selectedcard')) return;
        
        card.classList.add('selectedcard');
        card.classList.remove('card');

        setselectedExercises([...selectedExercises, exe])
        console.log(selectedExercises);
    }

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
                            765 kcal<br/>
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
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label forHtml="floatingInput">Workout Name</label>
                        </div>
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