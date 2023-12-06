// Catcher.tsx
import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../sessionContext'; // Update the path

const Catcher: React.FC = () => {
  const { sessionToken } = useAuth();
  const [caughtPokemon, setCaughtPokemon] = useState<any>(null);

  const generateRandomPokemonId = () => {
    const minId = 1;
    const maxId = 151;
    return Math.floor(Math.random() * (maxId - minId + 1)) + minId;
  };

  const handleCatch = useCallback(async () => {
    try {
      const randomPokemonId = generateRandomPokemonId();

      const response = await axios.get(`https://ex.traction.one/pokedex/pokemon/${randomPokemonId}`);
      const caughtPokemonData = await response.data[0];
      
      const response2 = await axios.post(
        `http://localhost:8080/pokemon/${caughtPokemonData.number}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`, // Include the sessionToken in the headers
          },
        }
      );

      //console.log(response2);
      console.log(caughtPokemonData.number);
      if (response2.status !== 201) {
        console.log('Pokemon escaped!');
        alert('Pokemon escaped!');
      }
      setCaughtPokemon(caughtPokemonData);
    } catch (error) {
      console.error('Error catching Pokemon:', error);
    }
  }, [sessionToken]);

  return (
    <div className='main-div'>
      <div className='catcher'>
        <h1>Roulette</h1>
        {caughtPokemon ? (
          <>
            <img src={caughtPokemon.sprite} alt={`Caught Pokemon`} />
            <h3>{caughtPokemon.name}</h3>
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
