import axios from 'axios';
import express from 'express';
import { PokemonModel } from '../db/pokemons';
import { UserModel } from '../db/users';

const POKEDEXAPI_BASE_URL = 'https://ex.traction.one/pokedex/pokemon';

export const fetchAndSavePokemonData = async (req: express.Request, res: express.Response) => {
  try {
    const { pokemonId, userId } = req.params;
    console.log(req.params);

    // Make a request to the Pokemon API
    const response = await axios.get(`${POKEDEXAPI_BASE_URL}/${pokemonId}`);
    console.log(response.data);
    
    // Extract relevant data from the API response
    const { name, types, id, sprites } = response.data;

    // Create or update the Pokemon in the MongoDB database
    const pokemonData = {
      name,
      type1: types[0]?.type?.name || '',
      type2: types[1]?.type?.name || '',
      number: id,
      image: sprites?.front_default || '',
      quantity: 1,
    };

    // Check if the Pokemon already exists in the database
    const existingPokemon = await PokemonModel.findOne({ name: pokemonData.name });

    if (existingPokemon) {
      // If the Pokemon exists, update its data
      await PokemonModel.updateOne({ _id: existingPokemon._id }, pokemonData);
      console.log(`Updated data for ${pokemonData.name}`);
    } else {
      // If the Pokemon doesn't exist, create a new entry
      const newPokemon = await PokemonModel.create(pokemonData);
      console.log(`Created new entry for ${pokemonData.name}`);

      // Add the new Pokemon to the user's pokemons array
      await UserModel.findByIdAndUpdate(userId, { $push: { pokemons: newPokemon._id } });
      console.log(`Added ${pokemonData.name} to user's pokemons array`);
    }

    return res.status(200).json({ message: 'Pokemon data fetched and saved successfully' });
  } catch (error) {
    console.error(`Error fetching or saving data for ${req.params.pokemonId}:`, error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
