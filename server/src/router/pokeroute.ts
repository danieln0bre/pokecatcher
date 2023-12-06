import express from "express";
import { isAuthenticated, isOwner } from "../middlewares";
import { fetchAndSavePokemonData, getAllUserPokemons } from "../controllers/pokemonService";

export default (router: express.Router) => {
  // Handle user-specific route first
  router.get('/user/pokemon', isAuthenticated, async (req, res) => {
    try {
      await getAllUserPokemons(req, res);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).send('Internal Server Error');
    }
  });

  // Handle other routes that require authentication
  router.patch('/pokemon/:pokemonId', isAuthenticated, isOwner, async (req, res) => {
    const { pokemonId } = req.params;
    try {
      // Your logic here for handling the update
      res.status(200).send('Pokemon updated successfully');
    } catch (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).send('Internal Server Error');
    }
  });

  router.post('/pokemon/:pokemonId', isAuthenticated, async (req, res) => {
    try {
      await fetchAndSavePokemonData(req, res);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).send('Internal Server Error');
    }
  });

  router.delete('/pokemon/:pokemonId', isAuthenticated, isOwner, async (req, res) => {
    const { pokemonId } = req.params;
    try {
      // Your logic here for handling deletion by the owner
      res.status(200).send('Pokemon deleted successfully');
    } catch (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).send('Internal Server Error');
    }
  });
};
