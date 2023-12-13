import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Pokemon from './Pokemon';
import { useSearchParams } from 'react-router-dom';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('page');
  const [page, setPage] = useState(1);

  const incrementPage = useCallback(() => {
      setPage(pg => pg + 1);
      setSearchParams((currentSearchParams) => {
        const newSearchParams = new URLSearchParams(currentSearchParams);
        newSearchParams.set('page', String(page + 1)); 
        return newSearchParams;
      });
  }, [page, setSearchParams]);
  const decrementPage = useCallback(() => {
    if (page > 1) {
      setPage(pg => pg - 1);
      setSearchParams((currentSearchParams) => {
        const newSearchParams = new URLSearchParams(currentSearchParams);
        newSearchParams.set('page', String(page - 1)); 
        return newSearchParams;
      });
    }
  }, [page, setSearchParams]);

  useEffect(() => {
    const fetchUserPokemonData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/pokemons?page=${queryParam}`,
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
  }, [page]);

  return (
    <div className='main-div'>
      <div className='collection-panel'>
        <h3>Your collection!</h3>
        {loading && <p>Loading...</p>}
        {error && <p className='error-message'>{error}</p>}
        {!loading && !error && (
          <div className='collection-div'>
            {pokemonCollection?.map((pokemon) => (
              <Pokemon key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        )}
        <button type='button' onClick={() => decrementPage()}>{'<'}</button>
        <button type='button' onClick={() => incrementPage()}>{'>'}</button>
      </div>
    </div>
  );
};

export default Collection;
