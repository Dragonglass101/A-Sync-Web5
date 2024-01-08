import "../style/HealthDashboard.css"
import MainHeader from "../WorkoutComponents/MainHeader"
import Programs from "../WorkoutComponents/Programs"
import workoutAnalytics from "../assets/images/analytics.svg"
import dumbleImg from "../assets/images/dumble.png"
import Footer from "../pages/Footer";
import Image from "../assets/images/bowl1_ai.png"
import { Link } from "react-router-dom"
import chestPressImg from "../assets/images/chestPress.jpeg"
// import Values from "../WorkoutComponents/Values"
// import FAQs from "../WorkoutComponents/FAQs"
// import Testimonails from "../WorkoutComponents/Testimonails"
// import Footer from "../WorkoutComponents/Footer"

const HealthDashboard = () => {
    return (
        <>
            <div className="backgroundHealth">
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
                <section className="programs pb-5">
                    <div className="container programstocontainer">
                        <div className="sectiontohead undefined">
                            <img className="me-4" src={dumbleImg} style={{ width: '50px' }} />
                            <h2 className="fw-bold">Recommended Workout</h2>
                        </div>
                        <div className="programstowrapper">
                            <article className="card programstoprogram pb-2" style={{ width: '300px' }}>
                                <span className="w-100 h-100">
                                    <img src={chestPressImg} className="w-100" />
                                </span>
                                <h4 className="fw-bold">Chest Press</h4>
                                <div className="d-flex text-muted mt-3">
                                    <span style={{ width: 'fit-content', fontSize: 'small' }}>765 kcal</span>
                                    <span style={{ width: 'fit-content', fontSize: 'small' }}>15 reps</span>
                                </div>
                            </article>

                            <article className="card programstoprogram pb-2" style={{ width: '300px' }}>
                                <span className="w-100 h-100">
                                    <img src={chestPressImg} className="w-100" />
                                </span>
                                <h4 className="fw-bold">Chest Press</h4>
                                <div className="d-flex text-muted mt-3">
                                    <span style={{ width: 'fit-content', fontSize: 'small' }}>765 kcal</span>
                                    <span style={{ width: 'fit-content', fontSize: 'small' }}>15 reps</span>
                                </div>
                            </article>

                            <article className="card programstoprogram pb-2" style={{ width: '300px' }}>
                                <span className="w-100 h-100">
                                    <img src={chestPressImg} className="w-100" />
                                </span>
                                <h4 className="fw-bold">Chest Press</h4>
                                <div className="d-flex text-muted mt-3">
                                    <span style={{ width: 'fit-content', fontSize: 'small' }}>765 kcal</span>
                                    <span style={{ width: 'fit-content', fontSize: 'small' }}>15 reps</span>
                                </div>
                            </article>

                            <article className="card programstoprogram pb-2" style={{ width: '300px' }}>
                                <span className="w-100 h-100">
                                    <img src={chestPressImg} className="w-100" />
                                </span>
                                <h4 className="fw-bold">Chest Press</h4>
                                <div className="d-flex text-muted mt-3">
                                    <span style={{ width: 'fit-content', fontSize: 'small' }}>765 kcal</span>
                                    <span style={{ width: 'fit-content', fontSize: 'small' }}>15 reps</span>
                                </div>
                            </article>

                        </div>
                    </div>
                </section>
                <section className="programs py-5">
                    <div className="container programstocontainer">
                        <div className="sectiontohead undefined py-5">
                            <img className="me-4" src={dumbleImg} style={{ width: '50px' }} />
                            <h2 className="fw-bold">Workout Analytics</h2>
                        </div>
                        <img src={workoutAnalytics} />
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