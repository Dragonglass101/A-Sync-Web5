import workoutIcon from "../assets/images/workoutIcon.png"
import calendarIcon from "../assets/images/calendarIconImg.png"
import healthyFoodsList from "../data/healthyFoods.js";
import NutrifitService from "../utils/nutrifitService.jsx";
import EditIcon from '@mui/icons-material/Edit';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HealthNavbar from "./HealthNavbar.jsx";

const CreateHealth = () => {
    const nutrifitService = NutrifitService();
    const [selectedFoods, setselectedFoods] = useState([]);
    const mealName = useRef('default');
    const mealDay = useRef('default');
    const navigate = useNavigate();

    const foodCards = [];

    function handleSelectFood(event, fd) {
        const card = event.currentTarget;

        if (card.classList.contains('selectedHealthcard')) return;

        card.classList.add('selectedHealthcard');
        card.classList.remove('unselectedHealthcard');

        setselectedFoods([...selectedFoods, fd])
        console.log(selectedFoods);
    }

    const temp = healthyFoodsList.slice(0, 6);

    for (let fd of temp) {
        foodCards.push(
            <article onClick={(e) => { handleSelectFood(e, fd) }} className="unselectedHealthcard programstoprogram d-flex flex-column align-items-center p-0" style={{ borderRadius: '25px', width: '250px' }} >
                <span className="h-100 m-0 p-1" style={{ width: '100%', borderRadius: '25px 25px 0 0' }}>
                    <img src={fd.imageurl} className="w-100" style={{ borderRadius: '25px 25px 0 0' }} />
                </span>
                <div className="w-100 d-flex">
                    <div className="w-75 border-end py-2">
                        <p className="fw-bold text-white small m-0 p-0">{fd.name}</p>
                        <p className="text-secondary small m-0 p-0">{fd.type}</p>
                    </div>
                    <div className="w-25 border-start py-3">
                        <p className="text-white small m-0 p-0" style={{ fontSize: 'xx-small' }}>{fd.cal} kcal</p>
                        <p className="text-white small m-0 p-0" style={{ fontSize: 'xx-small' }}>{fd.reps} reps</p>
                    </div>
                </div>
            </article>
        )
    }

    async function createMeal() {
        const mealRecord = await nutrifitService.createMeal({ "Name": mealName.current.value, "Day": mealDay.current.value });
        console.log("meal record", mealRecord);
        for (let f of selectedFoods) {
            await nutrifitService.createFood(f, mealRecord.id)
        }
        // navigate("/meal/my");
    }

    return (
        <>
            <HealthNavbar />
            <section className="programs">
                <div className="mx-auto programstocontainer d-flex mb-3" style={{ width: '90%' }}>
                    <div className="w-25 text-start fw-bold">
                        <h3 className="fw-bold">
                            <DriveFileRenameOutlineIcon className="mx-4 h2 fw-bold" style={{ color: 'rgb(200, 133, 0)' }} />
                            Details
                        </h3>
                    </div>
                    <div className="col text-center d-flex">
                        <div className="ms-5" style={{ borderLeft: '6px transparent', height: '100%' }}></div>
                    </div>
                    <div className="w-75 text-center fw-bold"><h3 className="fw-bold"><RestaurantIcon className="mx-3 h2 fw-bold" style={{ color: 'rgb(200, 133, 0)' }} /> Food Items</h3></div>
                </div>
                <div className="mx-auto programstocontainer d-flex" style={{ width: '90%' }}>
                    <div className="sectiontohead undefined w-25 d-flex flex-column justify-content-center">
                        <div className="input-group my-3">
                            <img className="input-group-text bg-dark" src={workoutIcon} style={{ width: '80px' }} />
                            <input ref={mealName} type="text" className="form-control bg-dark text-light workout-input" id="workout-name" placeholder="Meal Name" />
                        </div>
                        <div className="input-group my-3">
                            <img className="input-group-text bg-dark" src={calendarIcon} style={{ width: '80px' }} />
                            <input ref={mealDay} type="text" className="form-control bg-dark text-light workout-input" id="workout-id" placeholder="Meal Day" />
                        </div>
                        <button onClick={createMeal} className="bttn fw-bold w-100 mt-4" style={{ borderRadius: '8px !important' }}>Create</button>
                    </div>

                    <div className="col text-center d-flex">
                        <div className="ms-5" style={{ borderLeft: '6px solid white', height: '100%' }}></div>
                    </div>

                    <div className="programstowrapper d-flex flex-wrap w-75 justify-content-end mt-0">
                        {foodCards}
                    </div>
                </div>
            </section >
        </>
    )
}

export default CreateHealth;