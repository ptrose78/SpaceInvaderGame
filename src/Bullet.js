import React, { useEffect, useState } from 'react';
import explosion from "./assets/bullet.jpg"

function Bullet({position}) {
    
    return ( 
        <> 
         <div style={{position:"absolute", left:`${position.x}px`, top:`${position.y}px`, width:"50px", height:"50px"}}>
            <img src={explosion} style={{ width: 15, height: 65 }} />
        </div> 
        </>
    );
}

export default Bullet; 