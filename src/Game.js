import React, { useEffect, useState } from 'react';
import Hero from './Hero.js';
import Bullet from './Bullet.js';

function Game() {
    // States to track the position of the game pieces
    const [positionHero, setPositionHero] = useState(0);
    const [bullets, setBullets] = useState([]);

    const handleKeyDown = (e) => {
        switch (e.key) {
          case 'ArrowLeft':
            // Handle left arrow key event for the Hero
            setPositionHero((prev) => prev - 10);
            break;
        case 'ArrowRight':
            // Handle left arrow key event for the Hero
            setPositionHero((prev) => prev + 10);
            break;
          case ' ':
            // Handle space bar key event for creating a new bullet
            setBullets((prevBullets) => [...prevBullets, <Bullet key={Date.now()} />]);
            break;
          default:
            break;
        }
      };
    
      useEffect(() => {
        // Add a centralized keydown event listener for the entire game
        document.addEventListener('keydown', handleKeyDown);
    
        // Remove the event listener when the component unmounts
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, []); // Empty dependency array to ensure the effect runs once when the component mounts

    return (
        <div>       
            <Hero positionHero={positionHero}></Hero>
            {bullets.map((bullet, index) => (
                <ol key={index}>
                {/* Pass the callback function to the Bullet component */}
                <Bullet />
                </ol>
            ))}       
        </div>
    );
}

export default Game;