import React, { useEffect, useState } from 'react';

// Functional component named 'Hero', which receives props: moveHero and positionHero
function Hero({positionHero}) {

    return (
        <div style={{position:"relative", left:`${positionHero}px`, width:"50px", height:"50px"}}>
            <img src="space-invader-ship.png"  />
        </div> 
    );
}
export default Hero;