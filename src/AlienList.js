import React from "react";
import Alien from "./Alien.js";

function AlienList() {
    
    const aliens = [
    { id: 1,
      position: { x: 50, y: 0}},
    { id: 2,
      position: { x: 100, y: 0}},
    { id: 3,
      position: { x: 150, y: 0}}    
    ];

    return (
        <div>
        {aliens.map((alien) => <Alien key={alien.id} position={alien.position} />)}
        </div>
    )

}

export default AlienList;