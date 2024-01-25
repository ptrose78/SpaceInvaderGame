import React from "react";

function GameStatus({gameStatus}) {

    return (
        <div className = 'gameStatus'>
            {gameStatus.status === 'win' ? 'You win!' : gameStatus.status === 'lost' ? 'You lost' 
                : `Level `  + `${gameStatus.level}`}
        </div>
    )
}

export default GameStatus;