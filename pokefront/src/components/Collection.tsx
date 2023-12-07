import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from './Pokemon';

interface PokemonData {
  id: number;
  name: string;
  sprite: string;
  types: string[];
}

const Collection: React.FC = () => {
  const [pokemonCollection, setPokemonCollection] = useState<PokemonData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserPokemonData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/user/pokemons',
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data: PokemonData[] = response.data;
        setPokemonCollection(data);
      } catch (error) {
        console.error('Error fetching user Pokemon data:', error);
        setError('Error fetching user Pokemon data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserPokemonData();
  }, []);

  return (
    <div className='main-div'>
      <div className='collection-panel'>
        <h3>Your collection!</h3>
        {loading && <p>Loading...</p>}
        {error && <p className='error-message'>{error}</p>}
        {!loading && !error && (
          <div className='collection-div'>
            {pokemonCollection.map((pokemon) => (
              <Pokemon key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
