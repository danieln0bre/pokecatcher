import React, { useState } from 'react';

const Catcher: React.FC = () => {
  return (
    <div className='main-div'>
        <div className='catcher'>
          <h1>Roulette</h1>
          <img src={"/images/pokeballclosed.png"} alt={`Closed Roulette`} />
          <button className='catch-button'>Catch!</button>
        </div>
    </div>

  );
};

export default Catcher;