const express = require( 'express' );
const router = express.Router();
const mongoose = require( 'mongoose' );
const empty = require( 'is-empty' );

const Reservation = require( "../models/Reservation_model" );
const Rooms = require( '../Rooms' );

function SortRoomsPers( req, res ) {
	let nb_pers = Object.values( req.query )[ 1 ];
	return Rooms.rooms.filter( room => {
		return room.capacity >= nb_pers;
	} )
}

function SortRoomsEquip( req, res ) {
	let SortParam = Rooms.rooms
	let equipement = Object.values( req.query )[ 0 ].split( ',' );
	if ( Object.values( req.query )[ 1 ] !== undefined )
		SortParam = SortRoomsPers( req, res );
	return SortParam.filter( room => {
		let count = 0;
		let tab = [];
		room.equipements.forEach( elem => {
			tab.push( elem.name );
		} );
		if ( tab[ 0 ] !== undefined ) {
			equipement.forEach( equip => {
				if ( Object.values( tab ).includes( equip ) )
					count++;
			} )
		}
		return ( count !== 0 );
	} )
}

router.get( '/:date/:time', ( req, res ) => {
	if ( req.params.time !== undefined && req.params.date !== undefined ) {
		let ListRooms;
		let equip = Object.values( req.query )[ 0 ];
		Reservation.find( { Date: req.params.date, Time: req.params.time.split( ':' )[ 0 ] }, ( err, reservation ) => {
			if ( err ) {
				return res.json( { success: false, msg: 'Probleme.' } );
			} else if ( !empty( reservation ) && reservation.name !== null ) {
				if ( equip !== '' && equip !== undefined ) {
					ListRooms = SortRoomsEquip( req, res );
				} else {
					ListRooms = SortRoomsPers( req, res );
				}
				reservation.forEach( ( value ) => {
					let filteredRooms = ListRooms.filter( room => {
						return room.name !== value.RoomName;
					} );
					ListRooms = filteredRooms
				} );
				return res.json( { success: true, rooms: ListRooms } );
			} else {
				if ( equip !== '' && equip !== undefined ) {
					return res.json( { success: true, rooms: SortRoomsEquip( req, res ) } );
				} else {
					return res.json( { success: true, rooms: SortRoomsPers( req, res ) } );
				}
			}
		} )
	} else {
		return res.json( { success: false, msg: 'Veuillez seclectionner une date et une heure' } );
	}
} );

module.exports = router;
