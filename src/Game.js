import React, { useEffect, useState } from 'react';
import Hero from './Hero';

function Game() {
    // State to track the position of the hero
    const [positionHero, setPositionHero] = useState(0);

    // Effect hook to listen for left arrow key presses
    useEffect(() => {
         // Event handler for left arrow key press
        const handleLeftArrow = (e) => {
            if (e.key === 'ArrowLeft') {
              setPositionHero((prev) => prev - 100);
            }
          };
        
        // Adding event listener for keydown event
        document.addEventListener('keydown', handleLeftArrow);
        
        // Remove event listener when the component is unmounted
        return () => {
          document.removeEventListener('keydown', handleLeftArrow);
        };
      }, []); 
    
    return (
        <div>
            <Hero positionHero={positionHero}></Hero>
        </div>
    );
}

export default Game;