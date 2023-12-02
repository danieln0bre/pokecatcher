import React, { useState } from 'react';

const Catcher: React.FC = () => {
  const [caughtPokemon, setCaughtPokemon] = useState<any>(null);

  const generateRandomPokemonId = () => {
    const minId = 1; // Set the minimum Pokemon ID
    const maxId = 151; // Set the maximum Pokemon ID or adjust as needed

    return Math.floor(Math.random() * (maxId - minId + 1)) + minId;
  };

  const handleCatch = async () => {
    try {
      // Generate a random Pokemon ID
      const randomPokemonId = generateRandomPokemonId();

      // Fetch and save Pokemon data using the route
      const response = await fetch(`http://localhost:8080/pokemon/${randomPokemonId}`); // Replace with your actual route
      const caughtPokemonData = await response.json();

      // Update the state to store the caught Pokemon
      setCaughtPokemon(caughtPokemonData);
    } catch (error) {
      console.error('Error catching Pokemon:', error);
    }
  };

  return (
    <div className='main-div'>
      <div className='catcher'>
        <h1>Roulette</h1>
        {caughtPokemon ? (
          <>
            <img src={caughtPokemon.image} alt={`Caught Pokemon`} />
            <p>{caughtPokemon.name}</p>
          </>
        ) : (
          <img src={"/images/pokeballclosed.png"} alt={`Closed Roulette`} />
        )}
        <button className='catch-button' onClick={handleCatch}>
          Catch!
        </button>
      </div>
    </div>
  );
};

export default Catcher;
