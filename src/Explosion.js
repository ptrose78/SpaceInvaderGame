import React from "react";
import bomb from "./assets/explosion.jpg"

function Explosion({position}) {

    return (
        <> 
            <div style={{position:"absolute", left:`${position.x}px`, top:`${position.y}px`, width:"50px", height:"50px"}}>
                {console.log(position.x)} 
                <img src={bomb} alt="Explosion Image" style={{ width: 50, height: 50 }} />  
            </div>
        </>
    )
}

export default Explosion;