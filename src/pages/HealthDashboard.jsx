import "../style/HealthDashboard.css"
import MainHeader from "../WorkoutComponents/MainHeader"
import Programs from "../WorkoutComponents/HealthPrograms"
import workoutAnalytics from "../assets/images/transportable.svg"
import dumbleImg from "../assets/images/fruitpile.png"
import Footer from "../pages/Footer";
import Image from "../assets/images/bowl1_ai.png"
import { Link } from "react-router-dom"
import chestPressImg from "../assets/images/chestPress.jpeg"
import HealthNavbar from "./HealthNavbar"
import fruitPileImg from "../assets/images/fruitpile.png"
import junkPileImg from "../assets/images/junkpile.png"
import healthOverview from "../assets/images/healthOverview.svg"
// import Values from "../WorkoutComponents/Values"
// import FAQs from "../WorkoutComponents/FAQs"
// import Testimonails from "../WorkoutComponents/Testimonails"
// import Footer from "../WorkoutComponents/Footer"

const HealthDashboard = () => {
    return (
        <>
            <div className="backgroundHealth">
                <HealthNavbar />
                <header className="maintoheader">
                    <div className="container maintoheader-container">
                        <div className="maintoheader-left">
                            <h4>#100DaysOfWorkOut</h4>
                            <h1 className="fw-bold text-light">Join The Legends Of The Fitness World</h1>
                            <p className="text-secondary">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Sit amet justo donec enim diam. Enim nulla aliquet porttitor lacus.
                            </p>
                            <Link to="/plans" className="bttn lg fw-bold" style={{ textDecoration: 'none', fontFamily: 'Space Mono' }}>Get Started</Link>
                        </div>
                        <div className="maintoheader-right">
                            <div className="maintoheader-circle"></div>
                            <div className="maintoheader-image">
                                <img width={400} src={Image} alt="Header Main Image" />
                            </div>
                        </div>
                    </div>
                </header>
                <Programs />
                <section className="programs py-5">
                    <div className="container programstocontainer">
                        <div className="sectiontohead undefined py-5 flex-column">
                            <h2 className="fw-bold" style={{ color: '#C0DEDD' }}>Health Analytics</h2>
                            <img src={healthOverview} />
                        </div>
                    </div>
                </section>
                <Footer />



                {/* <Values /> */}
                {/* <FAQs /> */}
                {/* <Testimonails /> */}
            </div>
        </>
    )
}

export default HealthDashboard;