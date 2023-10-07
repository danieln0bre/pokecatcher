import React from 'react';

const Pokemon: React.FC = () => {
  // Generate a random number between 1 and 898 (inclusive)
  const randomPokemonNumber = Math.floor(Math.random() * 898) + 1;

  // Construct the image filename based on the random Pokemon number
  const imageFileName = `/images/pokemons/${randomPokemonNumber}.png`;

  return (
    <div className='single-pokemon'>
      <img src={imageFileName} alt={`Random Pokemon`} />
    </div>
  );
};

export default Pokemon;