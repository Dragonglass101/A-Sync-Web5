import "../style/WorkoutDashboard.css"
import MainHeader from "../WorkoutComponents/MainHeader"
import Programs from "../WorkoutComponents/Programs"
import workoutAnalytics from "../assets/images/transportable.svg"
import dumbleImg from "../assets/images/workoutIcon.png"
import Footer from "../pages/Footer";
import Navbar from "./Navbar"
import pushWallImg from '../assets/images/pushWall.png'

const WorkoutDashboard = () => {

  return (
    <>
      <Navbar />
      <MainHeader />
      <Programs />
      <section className="programs py-5">
        <div className="container programstocontainer">
          <div className="sectiontohead undefined py-5">
            <img className="me-4" src={dumbleImg} style={{ width: '100px' }} />
            <h2 className="fw-bold" style={{ color: '#C0DEDD' }}>Workout Analytics</h2>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <div style={{ width: '60%' }}>
            <div className="container me-0">
              <img className="me-3" src={workoutAnalytics} />
            </div>
          </div>
          <div style={{ width: '40%' }}>
            <img className="" src={pushWallImg} />
          </div>
        </div>
      </section>
      <Footer />



      {/* <Values /> */}
      {/* <FAQs /> */}
      {/* <Testimonails /> */}
    </>
  )
}

export default WorkoutDashboard