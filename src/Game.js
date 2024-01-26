import React, { useEffect, useState } from 'react';
import Hero from './Hero.js';
import Bullet from './Bullet.js';
import AlienList from './AlienList.js';
import GameStatus from './GameStatus.js';


function Game() {
    // States to track the position of the game pieces
    const [hero, setHero] = useState({x: 0, y: 50});
    const [bullets, setBullets] = useState([]);
    const [aliens, setAliens] = useState([]);
    const [direction, setDirection] = useState('right');
    const [gameStatus, setGameStatus] = useState({status: 'playing', level: 1});
    const [showGame, setShowGame] = useState(true);
    

    useEffect(() => {
        if (gameStatus.level === 1) {
            setAliens([{ id: 1, position: { x: 50, y: 0}},
                       { id: 2, position: { x: 100, y: 0}},
                       { id: 3, position: { x: 150, y: 0}}])
        }
        if (gameStatus.level === 2) {
            setAliens([{ id: 1, position: { x: 25, y: 50}},
                       { id: 2, position: { x: 50, y: 0}},
                       { id: 3, position: { x: 100, y: 0}},
                       { id: 4, position: { x: 150, y: 0}},
                       { id: 5, position: { x: 75, y: 50}},
                       { id: 6, position: { x: 125, y: 50}},
                       { id: 7, position: { x: 175, y: 50}}])
        }
    }, [gameStatus]);
    
    useEffect(() => {
        // Set initial position of the Hero at the bottom and middle of the screen
        const windowHeight = window.innerHeight;
        console.log(windowHeight)
        const windowWidth = window.innerWidth;
        const heroHeight = 50; // Adjust this based on your Hero's height
        const heroWidth = 50;
        setHero({ x: (windowWidth - heroWidth) / 2, y: (windowHeight - 50)});
        
        // Set initial position of the Aliens
         //const initialAlienY = (windowHeight - 50) - roundDownToNearestHundred(windowHeight - 50);
         // setAliens((prevAliens) => prevAliens.map((alien) => ({...alien, position:{ ...alien.position, y: initialAlienY }})));
      }, []);

    
    //helper function
    function roundDownToNearestHundred(number) {
        return Math.floor(number / 100) * 100;
    }

    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                // Handle left arrow key event for the Hero
                setHero((prev) => ({ ...prev, x: prev.x - 10 }));
                break;
            case 'ArrowRight':
                // Handle left arrow key event for the Hero
                setHero((prev) => ({ ...prev, x: prev.x + 10 }));
                break;
            case ' ':   
                setBullets((prevBullets) => [...prevBullets, 
                    { id: Date.now(), position: {...hero, y: (hero.y - 50) }}]);
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
                newX += 0;
              } else if (direction === 'left') {
                newX -= 50;
              }     
     
              return { ...alien, position: {x: newX, y: newY }};
            });
    
            // Check if aliens hit the right edge
            const rightEdge = Math.max(...updatedAliens.map((alien) => alien.position.x));
            if (rightEdge > window.innerWidth - 85) {
              updatedAliens.forEach((alien) => (alien.position.y += 50));
              setDirection('left'); 
            }
    
            // Check if aliens hit the left edge
            const leftEdge = Math.min(...updatedAliens.map((alien) => alien.position.x));
            if (leftEdge < 25) {
              updatedAliens.forEach((alien) => (alien.position.y += 50));
              setDirection('right');
            }
    
            return updatedAliens;
          });
        };

        const moveBullets = () => { 
            setBullets((prevBullets) => {
                const updatedBullets = prevBullets.map((bullet) => ({
                    ...bullet,
                    position: { ...bullet.position, y: bullet.position.y - 50 },
                }));
                return updatedBullets;
            });    
        };  

        const checkCollisions = (bullets, aliens, hero, gameStatus) => {

            bullets.forEach((bullet) => {
 
                aliens.forEach((alien) => {
                    // Check if bullet and alien overlap
                    if (
                    bullet.position.x < alien.position.x + 25 &&
                    bullet.position.x + 25 > alien.position.x &&
                    bullet.position.y < alien.position.y + 60 &&
                    bullet.position.y + 60 > alien.position.y
                     || bullet.position.y > window.innerHeight) {
                    // Collision detected, handle it (e.g., remove bullet and alien)
                    handleCollision(bullet, alien);
                    }
              });
            }); 
          };

        const handleCollision = (bullet, alien) => {
            // Handle collision, e.g., remove bullet and alien
            setBullets((prevBullets) => prevBullets.filter((b) => b.id !== bullet.id));
            setAliens((prevAliens) => prevAliens.filter((a) => a.id !== alien.id));
        };

        const checkBulletPosition = (bullets) => {
            //Remove bullet when it exits screen
            bullets.forEach((bullet) => {
                if (bullet.position.y < -100) {
                    setBullets((prevBullets) => prevBullets.filter((b => b.id != bullet.id)))
                }
            })
        }
        
        const checkWin = (aliens, hero, gameStatus) => {
            
            if (aliens.length === 0){
                if (gameStatus.level < 2) {
                setGameStatus({status: 'playing', level: (gameStatus.level+1)});
                } else {
                setGameStatus({status: 'win', level: 1});
                }
            }

            aliens.forEach((alien) => {
                // Check if alien and hero overlap
                if (alien.position.x + 15 > hero.x && 
                    alien.position.x < hero.x + 15 &&
                    alien.position.y < hero.y + 15 &&
                    alien.position.y + 15 > hero.y) {
                        gameStatus.status = 'lost';
                        setShowGame(!showGame);
                }
            })
        }

        const intervalId = setInterval(() => {
            moveAliens();
            moveBullets();
            checkCollisions(bullets, aliens, hero, gameStatus);
            checkBulletPosition(bullets);
            checkWin(aliens, hero, gameStatus);
          }, 700);  
    
        return () => clearInterval(intervalId);
      }, [direction, gameStatus, bullets, aliens]);

    useEffect(() => {
        // Add a centralized keydown event listener for the entire game
        document.addEventListener('keydown', handleKeyDown);
    
        // Remove the event listener when the component unmounts
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, [hero]); // Empty dependency array to ensure the effect runs once when the component mounts

    return (
        <div>
            <GameStatus gameStatus={gameStatus}></GameStatus>       
            <AlienList aliens={aliens}></AlienList>
            {showGame}
            <Hero hero={hero}></Hero>
            {bullets.map((bullet) => (
                <Bullet key={bullet.id} position={bullet.position} />
                ))}
        </div> 
    );
} 

export default Game;