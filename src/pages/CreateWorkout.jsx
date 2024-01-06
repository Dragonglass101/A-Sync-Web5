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

const CreateWorkout = () => {


    return (
        <>
            <section className="programs">
                <div className="container programstocontainer">
                    <div className="sectiontohead undefined">
                        <img className="me-4" src={dumbleImg} style={{ width: '50px' }} />
                        {/* <h2 className="fw-bold">Recommended Workout</h2> */}
                        {/* <TextField id="standard-basic" label="Standard" variant="standard" className="bg-light text-dark"/> */}
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label for="floatingInput">Workout Name</label>
                        </div>
                    </div>
                    <div className="programstowrapper">
                        <article className="card programstoprogram pb-0 pt-0 px-0 border" style={{ width: '300px' }}>
                            <span className="w-100 h-100" style={{ borderRadius: '0 3rem 0 0' }}>
                                <p className="p-0 m-0">Chest</p>
                                <img src={chestPressImg} className="w-100" />
                            </span>
                            <h4 className="fw-bold">Chest Press</h4>
                            <div className="d-flex text-muted mt-3 px-2">
                                {/* <span style={{ width: 'fit-content', fontSize: 'small' }}>765 kcal</span> */}

                                <span className="mx-1" style={{ width: 'fit-content', fontSize: 'small' }}>
                                    <Input
                                        id="standard-adornment-weight"
                                        endAdornment=
                                        {<InputAdornment position="end">
                                            kcal
                                        </InputAdornment>}
                                        aria-describedby="standard-weight-helper-text"
                                        size="small"
                                        className="bg-transparent ps-2 fw-bold"
                                    />
                                </span>

                                <span className="ms-1" style={{ width: 'fit-content' }}>
                                    <Input
                                        id="standard-adornment-reps"
                                        endAdornment=
                                        {<InputAdornment position="end">
                                            reps
                                        </InputAdornment>}
                                        aria-describedby="standard-weight-helper-text"
                                        size="small"
                                        className="bg-transparent ps-2 fw-bold"
                                    />
                                </span>
                                {/* <span style={{ width: 'fit-content', fontSize: 'small' }}>15 reps</span> */}
                            </div>
                            <div className="w-100 mb-0 py-2 bg-dark border border-2 border-white" style={{borderRadius:'0 0 0 3rem'}}>
                                <Link variant="contained" className='text-light fw-bold' style={{textDecoration:'none'}}>ADD</Link>
                            </div>
                        </article>

                    </div>
                </div>
            </section>
        </>
    )
}

export default CreateWorkout;