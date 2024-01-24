import React from "react";
import Alien from "./Alien.js";

function AlienList({aliens}) {
    
    return (
        <div>
        {aliens.map((alien) => <Alien key={alien.id} position={alien.position} />)}
        </div>
    )
}

export default AlienList;