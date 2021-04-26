const express = require("express");
const router = express.Router();
const config = require('config');

const { AuthorizationCode } = require("simple-oauth2");

const oauthClient = config.get('oauth');
const oauthConfig = {
	client: oauthClient,
	auth: {
		tokenHost: "https://cloudx-account.azurewebsites.net/",
		authorizePath: "connect/authorize",
		tokenPath: "connect/token",
	},
};

const client = new AuthorizationCode(oauthConfig);

const params = {
	redirect_uri: "http://localhost:8080/auth/callback",
	scope: "profile",
};

const authorizationUri = client.authorizeURL(params);

async function getNeosProfile(token) {
	return {
		username: 'potato',
		userId: 'potato-2'
	}
}

router.get("/authorize", (req, res) => {
	// Here we redirect the user to Neos, they will log in and then come back to /callback
	console.log(authorizationUri);
	res.redirect(authorizationUri);
});

router.get("/callback", async (req, res) => {
	// We're back from Neos, lets change the code into a token

	// The code comes from the query params
	const code = req.query.code;

	try {
		// Exchange the code for a token.
		// You probably need to save this somewhere
		const accessToken = await client.getToken(code);

		// Using the token we get the user's neos profile
		const profile = await getNeosProfile(token);

		res.status(200);
		res.render('profile', {
			profile
		});
		return;
	} catch (error) {
		console.error("Access Token Error", error.message);
		return res.status(500).json("Authentication failed");
	}
});

module.exports = router;
