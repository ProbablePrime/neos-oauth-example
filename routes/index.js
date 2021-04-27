const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	// Neos Test OAuth requires a static callback of localhost:8080 right now so we'll bounce that to the right place.
	// In a production use case we wouldn't need to do this.
	if (req.query.code) {
		res.redirect('/oauth/callback?code=' + req.query.code);
		return;
	}
	res.render("index");
});

module.exports = router;
