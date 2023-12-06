import express from 'express';

import { getAllUsers, deleteUser, updateUser } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';
import { getAllUserPokemons } from '../controllers/pokemonService';

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
}