import React, { useEffect, useState } from 'react';

// Functional component named 'Hero', which receives props: positionHero
function Hero({hero}) {

    return (
        <div style={{position:"absolute", left:`${hero.x}px`, top:`${hero.y}px`, width:"50px", height:"50px"}}>
            {<img src="space-invader-ship.png"  />}
        </div> 
    );
}
export default Hero;