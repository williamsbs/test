const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationShema = new Schema({
	RoomName: {
		type: String,
		required: true
	},
	Email: {
		type: String,
		required: true
	},
	Id_Res: {
		type: String,
		unique: true,
		required: true
	},
	Date: {
		type: String,
	},
	Time: {
		type: String,
	},
});

module.exports = mongoose.model('Reservation',ReservationShema);
