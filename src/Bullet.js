import React, { useEffect, useState } from 'react';

function Bullet({bulletData, onBulletMove}) {

    return (
        <> 
        <div className='bullet' style={{position:"relative", width:"50px", height:"50px"}}>
            <img src="bullet.png" />
        </div>
        </>
    );
}

export default Bullet;