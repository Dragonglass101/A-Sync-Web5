
import DeleteEdgeDrop from "./DnDFlow";
import React, { useState } from 'react';

import '../style/Dashboard.css';
import img_spotify from "../assets/images/spotify.jpeg";
import img_spotify2 from "../assets/images/spotify2.jpeg";
import img_music from "../assets/images/music.jpeg";
import img_music2 from "../assets/images/music2.jpeg";
import img_workout from "../assets/images/workout.jpeg"
import img_workout2 from "../assets/images/workout2.jpeg"
import img_workout3 from "../assets/images/workout3.jpeg"
import img_workout4 from "../assets/images/workout4.jpeg"

const Dashboard = () => {
    return (
        <>
            <h1 className='fw-bold text-light collection-slider my-5' style={{fontFamily:"Space Mono"}}>App Dashboard</h1>
            <div className=' d-flex'>
                <div className='w-50'>
                    <div className='collection-slider'>
                        <div className='collection-card'>
                            <img src={img_music2} className='dashboard-app-card' />
                            <div className='' style={{ width: '300px' }}>
                                <h4 className='text-white fw-bold' >Harmony 5.0</h4>
                                <span className='text-secondary'>Unleash your music, own your data</span>
                            </div>
                        </div>
                        <div className='collection-card'>
                            <img src={img_spotify2} className='dashboard-app-card' />
                            <div className='' style={{ width: '300px' }}>
                                <h4 className='text-white fw-bold'>Spotify 5.0</h4>
                                <span className='text-secondary'>lora ipsum, an app where you can lorkadjgfljadsgflkjha ipsum</span>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard;