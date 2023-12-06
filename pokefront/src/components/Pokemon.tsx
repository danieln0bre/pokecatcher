import React from 'react';

interface PokemonProps {
  pokemon: {
    id: number;
    name: string;
    image: string;
    types: string[]; // Assuming types is an array of strings
  };
}

const Pokemon: React.FC<PokemonProps> = ({ pokemon }) => {
  return (
    <div className='single-pokemon'>
      <img src={pokemon.image} alt={pokemon.name} />
      <p>{pokemon.name}</p>
      <p>Types: {pokemon.types.join(', ')}</p>
    </div>
  );
};

export default Pokemon;
