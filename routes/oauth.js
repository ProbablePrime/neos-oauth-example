const express = require("express");
const router = express.Router();
const config = require('config');
const fetch = require('node-fetch');

const { AuthorizationCode } = require("simple-oauth2");

const oauthConfig = {
	client: config.get('oauth'),
	auth: {
		tokenHost: "https://cloudx-account.azurewebsites.net/",
		authorizePath: "connect/authorize",
		tokenPath: "connect/token",
	},
	options: {
		bodyFormat: 'form',
		authorizationMethod: 'body'
	},
};

const redirectParams = {
	redirect_uri: "http://localhost:8080",
	scope: "profile",
};

const client = new AuthorizationCode(oauthConfig);
const authorizationUri = client.authorizeURL(redirectParams);

// This may break later
async function getNeosProfile(token) {

	const res = await fetch('https://cloudx-account.azurewebsites.net/api/user/profile', {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		}
	});
	return await res.json();
}

router.get("/authorize", (req, res) => {
	// Here we redirect the user to Neos, they will log in and then come back to /callback
	res.redirect(authorizationUri);
});

router.get("/callback", async (req, res) => {
	// We're back from Neos, lets change the code into a token

	// The code comes from the query params
	const code = req.query.code;
	try {
		// Exchange the code for a token.
		// You probably need to save this somewhere
		const accessToken = await client.getToken({
			code,
			redirect_uri: redirectParams.redirect_uri
		});
		// Using the token we get the user's neos profile
		const profile = await getNeosProfile(accessToken.token.access_token);
		res.render('profile', {
			profile
		});
	} catch (error) {
		if(error.data && error.data.payload) {
			console.log(error.data.payload);
		} else {
			console.log(error);
		}
		console.error("Access Token Error", error.message);
		return res.status(500).json("Authentication failed");
	}
});

module.exports = router;
