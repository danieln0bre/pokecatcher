import express from 'express';

import { getAllUsers, deleteUser, updateUser } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';
import { getAllUserPokemons } from '../controllers/pokemonService';
import { getUserBySessionToken } from '../db/users';

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
    router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
    router.get('/user/pokemons', isAuthenticated, async (req, res) => {
        try {
        await getAllUserPokemons(req, res);
        } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send('Internal Server Error');
        }
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