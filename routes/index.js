const router = require('express').Router();
const path = require('path');

var shortnerRouter=require('./shorten');
router.use('/shortners',shortnerRouter);

router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../url_shortener_react/build/index.html'));
});
module.exports=router;