const catchError = require("../utils/catchError");
const Review = require("../models/Review");
const User = require("../models/User");
const Hotel = require("../models/Hotel");

const getAll = catchError(async (req, res) => {
  const { hotelId, userId, offset, perPage } = req.query;
  const where = {};
  if (hotelId) where.hotelId = hotelId;
  if (userId) where.userId = userId;
  const results = await Review.findAll({
    include: [Hotel, { model: User, attributes: { exclude: ["password"] } }],
    where: where,
    offset: offset,
    perPage: perPage,
  });
  return res.json(results);
});

const create = catchError(async(req, res) => {
    const {rating, comment, hotelId} = req.body
    const userId = req.user.id
    const result = await Review.create({rating, comment, hotelId, userId});
    return res.status(201).json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Review.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const result = await Review.update(
    { rating, comment },
    { where: { id }, returning: true }
  );
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

module.exports = {
  getAll,
  create,
  remove,
  update,
};
