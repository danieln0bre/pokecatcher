import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../sessionContext';

const Catcher: React.FC = () => {
  const { sessionToken } = useAuth();
  const [caughtPokemon, setCaughtPokemon] = useState<any>(null);
  const [rolls, setRolls] = useState<number>(0);

  const generateRandomPokemonId = () => {
    const minId = 1;
    const maxId = 151;
    return Math.floor(Math.random() * (maxId - minId + 1)) + minId;
  };

  const handleCatch = useCallback(async () => {
    try {
      const randomPokemonId = generateRandomPokemonId();

      // Get the user's current rolls count
      const rollsResponse = await axios.get('http://localhost:8080/user/rolls', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const userRolls = rollsResponse.data.rolls;

      // Check if the user has enough rolls
      if (userRolls <= 0) {
        console.log('Not enough rolls!');
        alert('Not enough rolls!');
        return;
      }

      // Continue with catching Pokémon logic...

      // Obtains data of the random Pokémon
      const response = await axios.get(`https://ex.traction.one/pokedex/pokemon/${randomPokemonId}`);
      const caughtPokemonData = response.data[0];

      // Makes the request to catch the Pokémon using the session token as a cookie
      const response2 = await axios.post(
        `http://localhost:8080/pokemon/${caughtPokemonData.number}`,
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response2.status !== 200) {
        console.log('Pokemon escaped!');
        alert('Pokemon escaped!');
      } else {
        // Update the rolls count in the state after a successful catch
        setRolls(userRolls - 1);
      }

      setCaughtPokemon(caughtPokemonData);
    } catch (error) {
      console.error('Error catching Pokemon:', error);
    }
  }, [sessionToken]);

  // Fetch the user's rolls count on component mount
  useEffect(() => {
    const fetchUserRolls = async () => {
      try {
        const rollsResponse = await axios.get('http://localhost:8080/user/rolls', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const userRolls = rollsResponse.data.rolls;
        setRolls(userRolls);
      } catch (error) {
        console.error('Error fetching user rolls:', error);
      }
    };

    fetchUserRolls();
  }, [sessionToken]);

  return (
    <div className='main-div'>
      <div className='catcher'>
        <h1>Roulette</h1>
        <h3>Rolls: {rolls}</h3>
        {caughtPokemon ? (
          <>
            <img src={caughtPokemon.sprite} alt={`Caught Pokemon`} />
            <h3>{caughtPokemon.name}</h3>
          </>
        ) : (
          <img src={'/images/pokeballclosed.png'} alt={`Closed Roulette`} />
        )}
        <button className='catch-button' onClick={handleCatch}>
          Catch!
        </button>
      </div>
    </div>
  );
};

export default Catcher;
