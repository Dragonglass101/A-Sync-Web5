import "../style/WorkoutDashboard.css"
import MainHeader from "../WorkoutComponents/MainHeader"
import Programs from "../WorkoutComponents/Programs"
import workoutAnalytics from "../assets/images/workoutAnalytics.svg"
import dumbleImg from "../assets/images/dumble.png"
// import Values from "../WorkoutComponents/Values"
// import FAQs from "../WorkoutComponents/FAQs"
// import Testimonails from "../WorkoutComponents/Testimonails"
// import Footer from "../WorkoutComponents/Footer"

const WorkoutDashboard = () => {
  return (
    <>
      <MainHeader />
      <Programs />
      <section className="programs py-5">
        <div className="container programstocontainer">
          <div className="sectiontohead undefined py-5">
            <img className="me-4" src={dumbleImg} style={{ width: '50px' }} />
            <h2 className="fw-bold">Workout Analytics</h2>
          </div>
          <img src={workoutAnalytics} />
        </div>
      </section>


      {/* <Values /> */}
      {/* <FAQs /> */}
      {/* <Testimonails /> */}
    </>
  )
}

export default WorkoutDashboard