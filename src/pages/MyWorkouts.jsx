// import Values from "../WorkoutComponents/Values"
// import FAQs from "../WorkoutComponents/FAQs"
// import Testimonails from "../WorkoutComponents/Testimonails"
// import Footer from "../WorkoutComponents/Footer"
import dumbleImg from "../assets/images/dumble.png"
import benchImg from "../assets/images/bench.png"
import { Link } from "react-router-dom"
import AddCircleIcon from '@mui/icons-material/AddCircle';

const MyWorkouts = () => {


  return (
    <>
      <section className="programs">
        <div className="container programstocontainer">
          <div className="sectiontohead undefined">
            <img className="me-4" src={dumbleImg} style={{ width: '50px' }} />
            <h2 className="fw-bold">Your Workouts</h2>
          </div>
          <div className="programstowrapper">
            <article className="card programstoprogram" style={{ width: '300px' }}>
              <span className="w-100 h-100">
                <AddCircleIcon fontSize="large"/>
                <h2>Add Workout</h2>
              </span>
              {/* <h4 className="fw-bold">Workout-1</h4> */}
              {/* <small className="text-secondary">This is the day that the lord has made. We will rejoice!</small> */}
              {/* <Link className="bttn sm fw-bold mt-2" style={{ textDecoration: 'none' }}>Edit</Link> */}
              {/* <Link className="bttn sm fw-bold" style={{ textDecoration: 'none' }} onClick={handleOpen}>Open modal</Link> */}
            </article>

            <article className="card programstoprogram" style={{ width: '300px' }}>
              <span className="w-100 h-100">
                <img src={benchImg} className="w-100" />
              </span>
              <h4 className="fw-bold">Workout-1</h4>
              {/* <small className="text-secondary">This is the day that the lord has made. We will rejoice!</small> */}
              <Link className="bttn sm fw-bold mt-2" style={{ textDecoration: 'none' }}>Edit</Link>
              {/* <Link className="bttn sm fw-bold" style={{ textDecoration: 'none' }} onClick={handleOpen}>Open modal</Link> */}
            </article>

          </div>
        </div>
      </section>
    </>
  )
}

export default MyWorkouts;