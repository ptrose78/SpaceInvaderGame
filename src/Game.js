import React, { useEffect, useState, useRef } from 'react';
import Hero from './Hero.js';
import Bullet from './Bullet.js';
import Explosion from './Explosion.js';
import AlienList from './AlienList.js';
import GameStatus from './GameStatus.js';


function Game() {
    // States to track the position of the game pieces
    const [hero, setHero] = useState({});   
    const [bullets, setBullets] = useState([]);
    const [aliens, setAliens] = useState([]); 
    const [explosion, setExplosion] = useState({status: false, position: { x: 0, y: 0}});
    const [direction, setDirection] = useState('stop');
    const [gameStatus, setGameStatus] = useState({status: 'starting', speed: 500, level: 1, points: 0});
    const [points, setPoints] = useState(0);
    
    useEffect(() => {
       console.log(previousLevelRef)

        if (gameStatus.level !== previousLevelRef.current) {
            console.log(previousLevelRef.current)
            console.log(gameStatus.level)
            if (gameStatus.level === 1) {
                setAliens([{ id: 1, position: { x: 50, y: 110}, image: './assets/alien-01.jpg'},
                        { id: 2, position: { x: 125, y: 110}, image: './assets/alien-01.jpg'},
                        { id: 3, position: { x: 200, y: 110}, image: './assets/alien-01.jpg'}]) 
                resetHero();
            }

            if (gameStatus.level === 2) {
                setAliens([{ id: 1, position: { x: 25, y: 150}, image: './assets/alien-02.jpg'},
                        { id: 2, position: { x: 85, y: 100}, image: './assets/alien-02.jpg'},
                        { id: 3, position: { x: 145, y: 150}, image: './assets/alien-02.jpg'},
                        { id: 4, position: { x: 205, y: 100}, image: './assets/alien-02.jpg'},
                        { id: 5, position: { x: 265, y: 150}, image: './assets/alien-02.jpg'},
                        { id: 6, position: { x: 325, y: 100}, image: './assets/alien-02.jpg'},
                        { id: 7, position: { x: 385, y: 150}, image: './assets/alien-02.jpg'}])
                setDirection('right');
            }

            if (gameStatus.level === 3) {
                setAliens([{ id: 1, position: { x: 25, y: 100}, image: './assets/alien-03.jpg'},
                        { id: 2, position: { x: 85, y: 170}, image: './assets/alien-03.jpg'},
                        { id: 3, position: { x: 145, y: 100}, image: './assets/alien-03.jpg'},
                        { id: 4, position: { x: 205, y: 170}, image: './assets/alien-03.jpg'},
                        { id: 5, position: { x: 265, y: 100}, image: './assets/alien-03.jpg'},
                        { id: 6, position: { x: 325, y: 170}, image: './assets/alien-03.jpg'},
                        { id: 7, position: { x: 385, y: 100}, image: './assets/alien-03.jpg'}])
                setDirection('right');
            }

            // Set initial position of the Hero at the bottom and middle of the screen
            function resetHero() {
                const windowHeight = window.innerHeight;
                const windowWidth = window.innerWidth;
                const heroHeight = 50; // Adjust this based on your Hero's height
                const heroWidth = 50;

                setHero({ x: (windowWidth - heroWidth) / 2, y: (windowHeight - 50)});
            }
            previousLevelRef.current = gameStatus.level;
            console.log(previousLevelRef.current)
            console.log(gameStatus.level)
        }

        }, [gameStatus]);
        const previousLevelRef = useRef();

    const onUpdateStatus = () => {
            previousLevelRef.current = 0;
            setBullets([]);
            setGameStatus({status: 'playing', speed: 500, level: 1, points: 0});
            setExplosion(({status: false, position: { x: 0, y: 0}}));
            setDirection('right');
    }        
    
    const handleKeyDown = (e) => {
        e.preventDefault();
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
              } else if (direction === 'stop') {
                newX += 0;
              }  
       
              return { ...alien, position: {x: newX, y: newY }};
            });
    
            // Check if aliens hit the right edge
            if (direction != 'stop') {
                const rightEdge = Math.max(...updatedAliens.map((alien) => alien.position.x));
                if (rightEdge > window.innerWidth - 125) {
                    updatedAliens.forEach((alien) => (alien.position.y += 50));
                    setDirection('left'); 
                }
        
                // Check if aliens hit the left edge
                const leftEdge = Math.min(...updatedAliens.map((alien) => alien.position.x));
                if (leftEdge < 65) {
                    updatedAliens.forEach((alien) => (alien.position.y += 50));
                    setDirection('right');
                }
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
            let isCollision = false;
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
                    setExplosion({status: true, position: {x: alien.position.x, y: alien.position.y}});
                    // Hide explosion after a brief delay
                        setTimeout(() => {
                            setExplosion(false);
                        }, 100);
                        isCollision = true;
                    }
                });
            })
            return isCollision;
        }
    
        const handleCollision = (bullet, alien) => {
            // Handle collision and remove bullet and alien
            setBullets((prevBullets) => prevBullets.filter((b) => b.id !== bullet.id));
            setAliens((prevAliens) => prevAliens.filter((a) => a.id !== alien.id));
        }

        const updatePoints = (gameStatus) => {
                const updatedPoints = gameStatus.points + (gameStatus.level * 50);
                setGameStatus({status: 'playing', speed: gameStatus.speed, level: gameStatus.level, points: updatedPoints});
        }

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
                if (gameStatus.level < 3) {
                    setGameStatus({status: 'playing', speed: (gameStatus.speed-150), level: (gameStatus.level+1)});
                } else {
                    setGameStatus({status: 'winning', points: 0});
                    setDirection('stop');
                }
            }

            aliens.forEach((alien) => {
                // Check if alien and hero overlap
                if (alien.position.x + 35 > hero.x && 
                    alien.position.x < hero.x + 35 &&
                    alien.position.y < hero.y + 35 &&
                    alien.position.y + 35 > hero.y) {
                        setGameStatus({status: 'losing', points: 0});
                        setExplosion({status: true, position: {x: hero.x, y: hero.y}});
                        setDirection('stop');            
                }
            })
        }

        const intervalId = setInterval(() => {
            moveAliens();
            moveBullets(); 
            const isCollision = checkCollisions(bullets, aliens, hero, gameStatus);
            if (isCollision) {
                updatePoints(gameStatus);
            }
            checkBulletPosition(bullets);
            checkWin(aliens, hero, gameStatus);
          }, gameStatus.speed);  
    
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
            <GameStatus gameStatus={gameStatus} onUpdateStatus={onUpdateStatus}></GameStatus>       
            <AlienList aliens={aliens}></AlienList>
            <Hero hero={hero} ></Hero>
            {bullets.map((bullet) => (
                <Bullet key={bullet.id} position={bullet.position} />
                ))} 
           
            {explosion.status && <Explosion position={explosion.position} />}
        </div> 
    );
} 

export default Game;