const Booking = require("./Booking")
const City = require("./City")
const Hotel = require("./Hotel")
const Image = require("./Image")
const Review = require("./Review")
const User = require("./User")

Hotel.belongsTo(City);
City.hasMany(Hotel);

Hotel.hasMany(Image);
Image.belongsTo(Hotel);

User.hasMany(Review);
Review.belongsTo(User);

Hotel.hasMany(Review);
Review.belongsTo(Hotel);

Booking.belongsTo(Hotel);
Hotel.hasMany(Booking);

User.hasMany(Booking);
Booking.belongsTo(User);