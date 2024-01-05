
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
import img_health from "../assets/images/health.jpeg"

const Dashboard = () => {
    return (
        <>
            <h1 className='fw-bold text-light collection-slider my-5' style={{ fontFamily: "Space Mono" }}>Dashboard</h1>
            <div className=' d-flex'>
                <div className='w-50'>
                    <h3 className="text-center text-secondary fw-bold">Applications</h3>
                    <div className='collection-slider'>
                        <div className='collection-card'>
                            <img src={img_music2} className='dashboard-app-card' />
                            <div className='' style={{ width: '300px' }}>
                                <h4 className='text-white fw-bold' >Harmony 5.0</h4>
                                <span className='text-secondary'>Unleash your music, own your data. Build your music world with Harmony.</span>
                            </div>
                        </div>
                        <div className='collection-card'>
                            <img src={img_spotify2} className='dashboard-app-card' />
                            <div className='' style={{ width: '300px' }}>
                                <h4 className='text-white fw-bold'>Spotify 5.0</h4>
                                <span className='text-secondary'>Your ears, your data, your choice. This is Spotify 5.0</span>
                            </div>
                        </div>
                        <div className='collection-card'>
                            <img src={img_workout} className='dashboard-app-card' />
                            <div className='' style={{ width: '300px' }}>
                                <h4 className='text-white fw-bold'>Kinetica</h4>
                                <span className='text-secondary'>Own Your Sweat, Own Your Goals. Train free with Kinetica</span>
                            </div>
                        </div>
                        <div className='collection-card'>
                            <img src={img_health} className='dashboard-app-card' />
                            <div className='' style={{ width: '300px' }}>
                                <h4 className='text-white fw-bold'>Nourish</h4>
                                <span className='text-secondary'>Nourish isn't just a diet app, it's a personalized journey to a healthier you.</span>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='w-50 text-light d-flex justify-content-center align-content-start flex-wrap flex-row'>
                    <h3 className="text-center text-secondary fw-bold">Protocol Playground</h3>
                    <DeleteEdgeDrop/>
                </div>
                {/* display: flex;
                justify-content: center;
                flex-direction: row;
                flex-wrap: wrap;
                align-content: flex-start; */}
            </div>
        </>
    )
}
export default Dashboard;