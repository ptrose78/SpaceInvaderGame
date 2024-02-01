import React, { useEffect, useState } from 'react';
import player from './assets/space-invader-ship.png'

// Functional component named 'Hero', which receives props: positionHero
function Hero({hero}) {

    return (
        <div style={{position:"absolute", left:`${hero.x}px`, top:`${hero.y}px`, width:"50px", height:"50px"}}>
            <img src={player}  alt="space ship"  style={{ width: 50, height: 50 }} />
        </div> 
    );
}
export default Hero;