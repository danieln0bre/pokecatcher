import express from 'express';

import { getAllUsers, deleteUser, updateUser, getUserById } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';
import { getAllUserPokemons } from '../controllers/pokemonService';
import { getUserBySessionToken } from '../db/users';

interface Results {
  next?: {
    page: number;
    limit: number;
  };
  previous?: {
    page: number;
    limit: number;
  };
  pokemons: Awaited<ReturnType<typeof getAllUserPokemons>>;
}

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.get('/users/:id', isAuthenticated, getUserById);
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
    router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
    //router.get('/user/pokemons', isAuthenticated, async (req, res) => {
      //  try {
        //await getAllUserPokemons(req, res);
        //} catch (error) {
        //console.error(`Error: ${error.message}`);
        //res.status(500).send('Internal Server Error');
        //}
    //});
    router.get('/user/pokemons', async (req, res) => {
      const page = parseInt(req.query?.page as string) || 1;
      const limit = parseInt(req.query?.limit as string) || 15;
    
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
    
      const results: Results = {} as Results;
      const pokemons = await getAllUserPokemons(req, res);
      if (endIndex < pokemons?.length) {
        results.next = {
          page: page + 1,
          limit: limit
        };
      }
      
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit
        };
      }
    
      results.pokemons = pokemons?.slice(startIndex, endIndex);
      return res.status(200).json(results.pokemons);
    });

    router.get('/user/rolls', isAuthenticated, async (req, res) => {
        try {
          const sessionToken = req.cookies['POKE-AUTH'];
          const user = await getUserBySessionToken(sessionToken);
      
          if (!user) {
            return res.sendStatus(403);
          }
      
          // Assuming the user object has a property "rolls"
          const rolls = user.rolls;
      
          return res.status(200).json({ rolls });
        } catch (error) {
          console.error('Error fetching user rolls:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      });
}