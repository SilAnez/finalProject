const { getAll, create, remove, update } = require('../controllers/booking.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT')

const bookingRouter = express.Router();

bookingRouter.route('/bookings')
    .get(verifyJWT,getAll)
    .post(verifyJWT,create);

bookingRouter.route('/bookings/:id')
    .delete(verifyJWT,remove)
    .put(verifyJWT,update);

module.exports = bookingRouter;