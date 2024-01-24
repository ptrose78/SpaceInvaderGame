import React, { useEffect, useState } from 'react';
import Hero from './Hero.js';
import Bullet from './Bullet.js';
import AlienList from './AlienList.js';

function Game() {
    // States to track the position of the game pieces
    const [positionHero, setPositionHero] = useState({x: 0, y: 50});
    const [bullets, setBullets] = useState([]);
    const [aliens, setAliens] = useState([{ id: 1,position: { x: 50, y: 0}},
                                          { id: 2, position: { x: 100, y: 0}},
                                          { id: 3, position: { x: 150, y: 0}}])
    const [direction, setDirection] = useState('right');

    
    useEffect(() => {
        // Set initial position of the Hero at the bottom and middle of the screen
        const windowHeight = window.innerHeight;
        console.log(windowHeight/10)
        const windowWidth = window.innerWidth;
        const heroHeight = 50; // Adjust this based on your Hero's height
        const heroWidth = 50;
        setPositionHero({ x: (windowWidth - heroWidth) / 2, y: (windowHeight - 50)});
        
        // Set initial position of the Aliens
        const initialAlienY = (windowHeight - 50) - roundDownToNearestHundred(windowHeight - 50);
        setAliens((prevAliens) => prevAliens.map((alien) => ({...alien, position:{ ...alien.position, y: initialAlienY }})));
      }, []);

    
    //helper function
    function roundDownToNearestHundred(number) {
        return Math.floor(number / 100) * 100;
    }

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
              position: { ...bullet.position, y: bullet.position.y - 50 }, 
            }))
          );
        }, 1000);
    
        return () => clearInterval(intervalId);
      }, []);

    useEffect(() => {
        const moveAliens = () => { 
          setAliens((prevAliens) => {
            const updatedAliens = prevAliens.map((alien) => {
              let newX = alien.position.x;
              let newY = alien.position.y;
    
              // Adjust the position based on the current movement direction
              if (direction === 'right') {
                newX += 50;
              } else if (direction === 'left') {
                newX -= 50;
              }
    
              return { ...alien, position: {x: newX, y: newY }};
            });
    
            // Check if aliens hit the right edge
            const rightEdge = Math.max(...updatedAliens.map((alien) => alien.position.x));
            if (rightEdge > window.innerWidth - 85) {
              // If hitting the right edge, change direction and move down
              updatedAliens.forEach((alien) => (alien.position.y += 50));
              setDirection('left'); 
            }
    
            // Check if aliens hit the left edge
            const leftEdge = Math.min(...updatedAliens.map((alien) => alien.position.x));
            if (leftEdge < 25) {
              // If hitting the left edge, change direction and move down
              updatedAliens.forEach((alien) => (alien.position.y += 50));
              setDirection('right');
            }
    
            return updatedAliens;
          });
        };
    
        const intervalId = setInterval(moveAliens, 250);
    
        return () => clearInterval(intervalId);
      }, [direction]);
     
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
            <AlienList aliens={aliens}></AlienList>
            <Hero positionHero={positionHero}></Hero>
            {bullets.map((bullet) => (
                <Bullet key={bullet.id} position={bullet.position} />
                ))}
        </div> 
    );
}

export default Game;