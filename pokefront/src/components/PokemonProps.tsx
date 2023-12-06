import React from 'react';
import Pokemon from './Pokemon';

const PokemonContainer: React.FC = () => {
  // Assuming you have a Pokemon object from the database
  const pokemonData = {
    id: 25,
    name: 'Pikachu',
    image: '/images/pokemons/25.png', // Replace with the actual image path
    types: ['Electric'], // Replace with the actual types array
  };

  return (
    <div>
      <h1>Pokemon Details</h1>
      <Pokemon pokemon={pokemonData} />
    </div>
  );
};

export default PokemonContainer;
