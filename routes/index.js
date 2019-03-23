const express = require( 'express' );
const router = express.Router();

router.get('/', (req,res)=>{
	res.send('hello Station F this is a test route')
});

module.exports = router;
