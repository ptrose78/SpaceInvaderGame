import React from "react";

function GameStatus({gameStatus, onUpdateStatus}) {

    
    const start = 
        <div className={gameStatus.status === 'starting' ? 'start' : ''}>
            {gameStatus.status === 'starting' ?
                <>
                    <h2>Space Invaders</h2>
                    <p>Space Bar: Shoots Bullets</p>
                    <p>Left and Right Arrows: Move Hero</p>
                    <button onClick={onUpdateStatus}>START GAME</button>
                </>
               :
                <> 
                </>
            }
        </div>

    const play = 
        <div className={gameStatus.status === 'playing' ? 'play' : ''}>
            {gameStatus.status === 'playing' && (
                <>
                <p className="level">LEVEL {gameStatus.level}</p>
                <button onClick={onUpdateStatus}>RESET GAME</button>
                </>
            )} 
        </div>

    const result = 
        <div className={gameStatus.status === 'winning' || gameStatus.status === 'losing' ? 'result' : ''}>
                {gameStatus.status === 'winning' ? 
                    <>
                        <p>YOU WIN!</p>
                        <button onClick={onUpdateStatus}>PLAY AGAIN</button>
                    </>
                : gameStatus.status === 'losing' ?
                    <>
                        <p>SORRY, YOU LOST!</p>
                        <button onClick={onUpdateStatus}>TRY AGAIN</button>
                    </>
                : 
                <> 
                </>
                }
        </div>

    return (
        <div>
            <div>{start}</div>
            <div>{play}</div> 
            <div>{result}</div>  
        </div>
    )
}

export default GameStatus;
