import React from "react";
import alien01 from "./assets/alien-01.jpg";
import alien02 from "./assets/alien-02.jpg";
import alien03 from "./assets/alien-03.jpg";


function Alien({position, image}) {

    const getAlienImage = () => {
        console.log('bye')
        if(`${image}` === "./assets/alien-01.jpg") {
            return alien01;
        } else if (`${image}` === "./assets/alien-02.jpg") {
            return alien02;
        } else if (`${image}` === "./assets/alien-03.jpg") {
            return alien03;
        }
    }
    const alien = getAlienImage();
    
    
    return (
        <div style={{ position: "absolute", left: `${position.x}px`, top: `${position.y}px`, width: "50px", height: "50px" }}>
            <img src={alien} alt="Alien Image" style={{ width: 50, height: 50 }} />
        </div>
 
    )
}

export default Alien;