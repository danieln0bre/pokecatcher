import express from "express";
import { isAuthenticated, isOwner } from "../middlewares";
import { fetchAndSavePokemonData } from "../controllers/pokemonService";
import { getPokemonById } from "../db/pokemons";

export default (router: express.Router) => {

  router.get('/user/pokemon', isAuthenticated, async (req, res) => {
    const userId = req as any; // Assuming your user ID is stored in the _id field

    try {
      const pokemonData = await getPokemonById(userId);
      res.status(200).json(pokemonData);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).send('Internal Server Error');
    }
  });

  // Route to update a Pokemon
  router.patch('/pokemon/:pokemonId', isAuthenticated, isOwner, async (req, res) => {
    const { pokemonId } = req.params;
    const userId = req as any; // Assuming your user ID is stored in the _id field

    try {
      // Your logic here for handling the update
      res.status(200).send('Pokemon updated successfully');
    } catch (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).send('Internal Server Error');
    }
  });

  // Route to fetch and save Pokemon data
  router.post('/pokemon/:pokemonId', isAuthenticated, async (req, res) => {
    try {
      await fetchAndSavePokemonData(req, res); // Pass the entire request and response objects
    } catch (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).send('Internal Server Error');
    }
  });

  // Example of using isOwner middleware for deletion
  router.delete('/pokemon/:pokemonId', isAuthenticated, isOwner, async (req, res) => {
    const { pokemonId } = req.params;
    const userId = req as any; // Assuming your user ID is stored in the _id field

    try {
      // Your logic here for handling deletion by the owner
      res.status(200).send('Pokemon deleted successfully');
    } catch (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).send('Internal Server Error');
    }
  });
};
