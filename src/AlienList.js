import React from "react";
import Alien from "./Alien.js";

function AlienList({aliens}) {
    
    return (
        <div>
        {aliens.map((alien) => <Alien key={alien.id} position={alien.position} image={alien.image} />)}
        </div>
    )
}

export default AlienList;