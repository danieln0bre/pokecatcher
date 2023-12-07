// pokemonService.ts

import axios from 'axios';
import express from 'express';
import { PokemonModel, PokemonSchema } from '../db/pokemons';
import { UserModel } from '../db/users';
import { getUserBySessionToken } from '../db/users';
import { getUserPokemonsById } from '../db/users';

const POKEDEXAPI_BASE_URL = 'https://ex.traction.one/pokedex/pokemon';

export const fetchAndSavePokemonData = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { pokemonId } = req.params;
    const sessionToken = req.cookies['POKE-AUTH'];
    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.sendStatus(403);
    }

    const response = await axios.get(`${POKEDEXAPI_BASE_URL}/${pokemonId}`);
    const { name, types, number, sprite } = response.data[0];

    const pokemonData: PokemonSchema = {
      name,
      types,
      id: number,
      sprite,
      quantity: 1,
    };

    const existingPokemon = await PokemonModel.findOne({ name: pokemonData.name });

    if (existingPokemon) {
      await PokemonModel.updateOne({ _id: existingPokemon._id }, pokemonData);
      console.log(`Updated data for ${pokemonData.name}`);
    } else {
      const newPokemon = await PokemonModel.create(pokemonData);
      console.log(`Created new entry for ${pokemonData.name}`);
      await UserModel.findByIdAndUpdate(existingUser.id, { $push: { pokemons: newPokemon._id } });
      console.log(`Added ${pokemonData.name} to user's pokemons array`);
    }

    return res.status(200).json({ message: 'Pokemon data fetched and saved successfully' });
  } catch (error) {
    console.error(`Error fetching or saving data for ${req.params.pokemonId}:`, error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllUserPokemons = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const sessionToken = req.cookies['POKE-AUTH'];
    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.sendStatus(403);
    }

    // Use the getUserPokemonsById function to fetch the user's Pokemon collection
    const userPokemons = await getUserPokemonsById(existingUser.id);

    if (!userPokemons || userPokemons.length === 0) {
      return res.status(404).json({ error: 'User not found or no Pokemon in collection' });
    }

    return res.status(200).json(userPokemons);
  } catch (error) {
    console.error('Error fetching user Pokemon data:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

