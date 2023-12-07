import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from './Pokemon';

interface PokemonData {
  id: number;
  name: string;
  sprite: string;
  types: string[];
}

const PokemonContainer: React.FC = () => {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/pokemon', // Adjust the endpoint as needed
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data: PokemonData = response.data;
        setPokemonData(data);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        setError('Error fetching Pokemon data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  return (
    <div>
      <h1>Pokemon Details</h1>
      {loading && <p>Loading...</p>}
      {error && <p className='error-message'>{error}</p>}
      {pokemonData && <Pokemon pokemon={pokemonData} />}
    </div>
  );
};

export default PokemonContainer;
