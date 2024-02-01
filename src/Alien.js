import React from "react";
import alien from "./assets/alien-02.jpeg"

function Alien({position}) {

    return (
        <div style={{ position: "absolute", left: `${position.x}px`, top: `${position.y}px`, width: "50px", height: "50px" }}>
            <img src={alien} alt="Alien Image" style={{ width: 50, height: 50 }} />
        </div>
 
    )
}

export default Alien;