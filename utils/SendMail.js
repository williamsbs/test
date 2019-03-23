let nodemailer = require( 'nodemailer' );

function SendMail( req, res, info, cb ) {
	let time = parseInt( info.time ) + 1;
	let transporter = nodemailer.createTransport( {
		service: 'gmail',
		secure: false,
		port: 25,
		auth: {
			user: 'Matcha42matcha42matcha@gmail.com',
			pass: 'password123456!'
		},
		tls: {
			rejectUnauthorized: false
		}
	} );

	let mailOption = {
		form: "Sation F",
		to: req.body.payload.email,
		subject: 'Comfirmation reservation',
		text: `Votre Réservation a été confirmé pour le ${info.date} de ${info.time}h à ${time}h voici votre numero de reservation: ${info.Id_Res} Vous pouvez l'utiliser pour annuler votre reservation`
	};

	transporter.sendMail( mailOption, ( error ) => {
		if ( error ) {
			cb( error, error )
		}
		else {
			cb( null, 'success' )
		}
	} );
}

module.exports = SendMail;
