const express = require( 'express' );
const router = express.Router();
const mongoose = require( 'mongoose' );
const Reservation = require( "../models/Reservation_model" );
const empty = require( 'is-empty' );

router.post( '/', ( req, res ) => {

	Reservation.findOne( { Email: req.body.email, Id_Res: req.body.Id_Res }, ( err, reservation ) => {
		if ( err ) {
			return res.json( { success: false, msg: 'Un probleme est survenue' } );
		} else if ( !empty( reservation ) && reservation.name !== null ) {
			Reservation.findOneAndDelete( { Email: req.body.email, Id_Res: req.body.Id_Res } )
				.then( () => {
					return res.json( { success: true, msg: 'Votre reservation a été supprimé' } );
				} )
		} else {
			return res.json( { success: false, msg: 'Votre reservation n\'a pas pu etre supprimé ' } );
		}
	} )

} );

module.exports = router;
