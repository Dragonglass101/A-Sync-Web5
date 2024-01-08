// import { FaCrown } from "react-icons/fa"
import { Link } from "react-router-dom"
// import { AiFillCaretRight } from "react-icons/ai"
import dumbleImg from "../assets/images/workoutIcon.png"
import chestPressImg from "../assets/images/chestPress.jpeg"
import { useRef, useState } from "react";
import exerciseList from "../data/exercises.js"

const Programs = () => {
  const [selectedExercises, setselectedExercises] = useState([]);
  const [workout, setWorkout] = useState([]);
  const workoutName = useRef('default');
  const workoutDay = useRef('default');

  const exerciseCards = [];
  const temp = exerciseList.slice(0, 4);
  for (let exe of temp) {
    exerciseCards.push(
      <article onClick={(e) => { handleSelectExercise(e, exe) }} className="selectedcard programstoprogram d-flex flex-column align-items-center p-0" style={{ borderRadius: '25px', width: '250px' }} >
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

  return (
    <section className="programs pb-5 mx-5 border border-2 border-top-0" style={{backgroundColor:'#1B1B1C', borderRadius:'25px', borderColor:'rgb(192, 222, 221) !important'}}>
      <div className="container programstocontainer">
        <div className="sectiontohead pt-4 undefined">
          <img className="me-4" src={dumbleImg} style={{ width: '100px' }} />
          <h2 className="fw-bold" style={{color:'#C0DEDD'}}>Recommended Workout</h2>
        </div>
        <div className="programstowrapper d-flex">
          {exerciseCards}
        </div>
      </div>
    </section>
  )
}

export default Programs