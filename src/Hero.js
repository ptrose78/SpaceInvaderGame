import React, { useEffect, useState } from 'react';

// Functional component named 'Hero', which receives props: positionHero
function Hero({positionHero}) {

    return (
        <div style={{position:"absolute", left:`${positionHero.x}px`, top:`${positionHero.y}px`, width:"50px", height:"50px"}}>
            {<img src="space-invader-ship.png"  />}
        </div> 
    );
}
export default Hero;