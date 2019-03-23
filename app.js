/*================================
            IMPORT EXTERNE
==================================*/
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const cors = require( 'cors' );

mongoose.connect( 'mongodb://wsabates:Abc123!@ds217976.mlab.com:17976/reservation', { useNewUrlParser: true }, () => {
	console.log( 'connected' )
} );
mongoose.set( 'useCreateIndex', true );

/*================================
            IMPORT INTERNE
==================================*/
const app = express();
const index = require( './routes/index' );
const Reservation = require( './routes/Reservation' );
const Annuler_Res = require( './routes/Annuler_Res' );
const ApiGetRooms = require( './API/API_GetRooms' );

/*================================
            MIDDLEWARE
==================================*/
app.use( bodyParser.json() );
app.use( cors() );
app.use(express.static (__dirname + '/client/dist/'));//pour mettre en production
// app.get('', function ( req, res ) {
// 	res.sendFile(__dirname + '/client/dist/index.html')
// })

/*================================
            ROUTES
==================================*/
app.use( '/', index );
app.use( '/reservation', Reservation );
app.use( '/api/getrooms', ApiGetRooms );
app.use( '/annuler', Annuler_Res );


const port = process.env.PORT || 5000;
app.listen( port, () => console.log( `Server started on port :${port}` ) );
