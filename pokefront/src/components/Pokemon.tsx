import React from 'react';

interface PokemonProps {
  pokemon: {
    id: number;
    name: string;
    sprite: string;
    types: string[]; // Assuming types is an array of strings

    //<p>{pokemon.name}</p>
    //<p>Types: {pokemon.types.join(', ')}</p>
  };
}

const Pokemon: React.FC<PokemonProps> = ({ pokemon }) => {
  return (
    <div className='single-pokemon'>
      <img src={pokemon.sprite} alt={pokemon.name} />

    </div>
  );
};

export default Pokemon;
