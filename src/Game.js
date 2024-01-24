import React, { useEffect, useState } from 'react';
import Hero from './Hero.js';
import Bullet from './Bullet.js';
import AlienList from './AlienList.js';

function Game() {
    // States to track the position of the game pieces
    const [positionHero, setPositionHero] = useState({x: 0, y: 0});
    const [bullets, setBullets] = useState([]);

    useEffect(() => {
        // Set initial position of the Hero at the bottom and middle of the screen
        const windowHeight = window.innerHeight;
        console.log(windowHeight/10)
        const windowWidth = window.innerWidth;
        const heroHeight = 50; // Adjust this based on your Hero's height
        const heroWidth = 50;
        setPositionHero({ x: (windowWidth - heroWidth) / 2, y: windowHeight - heroHeight / 2 });
      }, []);

    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                // Handle left arrow key event for the Hero
                setPositionHero((prev) => ({ ...prev, x: prev.x - 10 }));
                break;
            case 'ArrowRight':
                // Handle left arrow key event for the Hero
                setPositionHero((prev) => ({ ...prev, x: prev.x + 10 }));
                break;
            case ' ':   
                setBullets((prevBullets) => [...prevBullets, 
                    { id: Date.now(), position: {...positionHero, y: (positionHero.y - 50) }}]);
                break;
            default:
                break; 
        }
      }; 

      useEffect(() => {
        const intervalId = setInterval(() => {
          setBullets((prevBullets) =>
            prevBullets.map((bullet) => ({
              ...bullet,
              position: { ...bullet.position, y: bullet.position.y - 50 }, // Adjust the value for speed
            }))
          );
        }, 1000);
    
        return () => clearInterval(intervalId);
      }, []);
     
      useEffect(() => {
        // Add a centralized keydown event listener for the entire game
        document.addEventListener('keydown', handleKeyDown);
    
        // Remove the event listener when the component unmounts
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, [positionHero]); // Empty dependency array to ensure the effect runs once when the component mounts

    return (
        <div>       
            <AlienList></AlienList>
            <Hero positionHero={positionHero}></Hero>
            {bullets.map((bullet) => (
                <Bullet key={bullet.id} position={bullet.position} />
                ))}
        </div> 
    );
}

export default Game;