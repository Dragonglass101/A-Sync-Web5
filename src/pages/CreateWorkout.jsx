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

const CreateWorkout = () => {


    return (
        <>
            <section className="programs">
                <div className="mx-auto programstocontainer" style={{width:'90%'}}>
                    <div className="sectiontohead undefined">
                        <img className="me-4" src={dumbleImg} style={{ width: '50px' }} />
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label for="floatingInput">Workout Name</label>
                        </div>
                    </div>

                    <div className="programstowrapper d-flex flex-wrap">

                        <article className="card programstoprogram d-flex flex-column align-items-center p-0" style={{ borderRadius: '25px', width:'250px' }} >
                            <span className="h-100 m-0" style={{ width: '100%', borderRadius: '25px 25px 0 0' }}>
                                <img src={benchImg} className="w-100" />
                            </span>
                            <div className="w-100 d-flex">
                                <div className="w-50">
                                    <p className="fw-bold text-white m-0 p-0">Chest Press</p>
                                    <p className="text-secondary small m-0 p-0">Chest</p>
                                </div>
                                <div className="w-50">
                                    <span className="p-0 m-0 w-100 border border-2" style={{fontSize: 'xx-small', borderRadius: '0px' }}>
                                        765 kcal<br/>
                                        15 reps
                                    </span>
                                </div>
                            </div>
                        </article>
                        

                        <article className="card programstoprogram d-flex flex-column align-items-center p-0" style={{ borderRadius: '25px', width:'250px' }} >
                            <span className="h-100 m-0" style={{ width: '100%', borderRadius: '25px 25px 0 0' }}>
                                <img src={benchImg} className="w-100" />
                            </span>
                            <div className="w-100 d-flex">
                                <div className="w-50">
                                    <p className="fw-bold text-white m-0 p-0">Chest Press</p>
                                    <p className="text-secondary small m-0 p-0">Chest</p>
                                </div>
                                <div className="w-50">
                                    <span className="p-0 m-0 w-100 border border-2" style={{fontSize: 'xx-small', borderRadius: '0px' }}>
                                        765 kcal<br/>
                                        15 reps
                                    </span>
                                </div>
                            </div>
                        </article>

                        <article className="card programstoprogram d-flex flex-column align-items-center p-0" style={{ borderRadius: '25px', width:'250px' }} >
                            <span className="h-100 m-0" style={{ width: '100%', borderRadius: '25px 25px 0 0' }}>
                                <img src={benchImg} className="w-100" />
                            </span>
                            <div className="w-100 d-flex">
                                <div className="w-50">
                                    <p className="fw-bold text-white m-0 p-0">Chest Press</p>
                                    <p className="text-secondary small m-0 p-0">Chest</p>
                                </div>
                                <div className="w-50">
                                    <span className="p-0 m-0 w-100 border border-2" style={{fontSize: 'xx-small', borderRadius: '0px' }}>
                                        765 kcal<br/>
                                        15 reps
                                    </span>
                                </div>
                            </div>
                        </article>

                        <article className="card programstoprogram d-flex flex-column align-items-center p-0" style={{ borderRadius: '25px', width:'250px' }} >
                            <span className="h-100 m-0" style={{ width: '100%', borderRadius: '25px 25px 0 0' }}>
                                <img src={benchImg} className="w-100" />
                            </span>
                            <div className="w-100 d-flex">
                                <div className="w-50">
                                    <p className="fw-bold text-white m-0 p-0">Chest Press</p>
                                    <p className="text-secondary small m-0 p-0">Chest</p>
                                </div>
                                <div className="w-50">
                                    <span className="p-0 m-0 w-100 border border-2" style={{fontSize: 'xx-small', borderRadius: '0px' }}>
                                        765 kcal<br/>
                                        15 reps
                                    </span>
                                </div>
                            </div>
                        </article>

                    </div>
                </div>
            </section>
        </>
    )
}

export default CreateWorkout;