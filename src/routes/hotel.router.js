const { getAll, create, getOne, remove, update } = require('../controllers/hotel.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT')

const hotelRouter = express.Router();

hotelRouter.route('/hotels')
    .get(verifyJWT,getAll)
    .post(create);

hotelRouter.route('/hotels/:id')
    .get(verifyJWT,getOne)
    .delete(verifyJWT,remove)
    .put(verifyJWT,update);

module.exports = hotelRouter;