import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from './Pokemon';

interface PokemonData {
  id: number;
  name: string;
  image: string;
  types: string[];
}

const Collection: React.FC = () => {
  const [pokemonCollection, setPokemonCollection] = useState<PokemonData[]>([]);

  useEffect(() => {
    // Fetch the user's Pokemon data when the component mounts
    const fetchUserPokemonData = async () => {
      try {
        const response = await axios.get('https://api.example.com/user/pokemon');
        const data: PokemonData[] = response.data;
        setPokemonCollection(data);
      } catch (error) {
        console.error('Error fetching user Pokemon data:', error);
      }
    };

    fetchUserPokemonData();
  }, []);

  return (
    <div className='main-div'>
      <div className='collection-panel'>
        <h3>Your collection!</h3>
        <div className='collection-div'>
          {pokemonCollection.map((pokemon) => (
            <Pokemon key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
