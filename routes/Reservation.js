const express = require( 'express' );
const mongoose = require( 'mongoose' );
const uniqid = require( 'uniqid' );
const fs = require( 'fs' );

const Reservation = require( "../models/Reservation_model" );
let ResJson = require( "../Reservation.json" );
const router = express.Router();
const SendMail = require( '../utils/SendMail' )
const empty = require( 'is-empty' );

router.post( '/', ( req, res ) => {

	if ( req.body.payload.email === undefined ) {
		return res.json( { success: false, msg: 'Veuillez rentrer un email valide1' } );
	} else {
		Reservation.findOne({RoomName: req.body.payload.room, Date: req.body.payload.date, Time: req.body.payload.time.split( ':' )[ 0 ]}, (err, found) =>{
			if ( err ) {
				return res.json( { success: false, msg: 'Un probleme est survenu' } );
			}else if (empty(found)){
				let Id_Res = uniqid();
				let newRes = new Reservation( {
					RoomName: req.body.payload.room,
					Email: req.body.payload.email,
					Id_Res: Id_Res,
					Date: req.body.payload.date,
					Time: req.body.payload.time.split( ':' )[ 0 ],
				} );

				newRes.save( function ( err ) {
					if ( err ) {
						if ( err.code === 11000 ) {
							return res.json( { success: false, msg: 'Un probleme est survenu' } );
						}
					} else {
						let info = {
							Id_Res: Id_Res,
							date: req.body.payload.date,
							time: req.body.payload.time.split( ':' )[ 0 ],
						}
						SendMail( req, res, info, ( err, success ) => {
							if ( err ) {
								Reservation.findOneAndDelete( { Id_Res: Id_Res } )
									.then( () => {
										return res.json( { success: false, msg: err } );
									} )
							} else if ( success ) {
								fs.readFile( "Reservation.json", function ( err, data ) {
									var json = JSON.parse( data )
									json.push( newRes )

									fs.writeFileSync( 'Reservation.json', JSON.stringify( json, null, 2 ));
								} )
								res.json( { success: true, msg: 'Reservation crée avec succes.' } );
							} else {
								return res.json( { success: false, msg: 'Un probleme est survenu' } );
							}
						} )
					}
				} );
			}else{
				return res.json( { success: false, msg: 'Salle deja réservé' } );
			}
		})

	}
} );

module.exports = router;

