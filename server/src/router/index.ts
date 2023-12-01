import express from 'express';
import authentication from './authentication';
import users from './users';
import pokeroute from './pokeroute';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    pokeroute(router);
    
    return router;
};