import React from "react";

function Alien({position}) {

    return (
        <div style={{position:"absolute", left:`${position.x}px`, top: `${position.y}px`, width:"50px", height:"50px"}} >
            <img src="space-invader-ship.png"  />
        </div>
    )
}

export default Alien;