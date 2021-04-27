# Neos OAuth Sample Express / Node.js

**This is purely meant as a technical example. It is not a complete app or ready for production use**

A quickly thrown together sample on how to use the New OAuth Capabilities with Neos.

## Status

**BARELY working**, Neos' OAuth is still under construction.

## Setup

You will need OAuth Application credentials from the Neos Team. **These aren't easy to get right now** and are given out manually to select applications or scenarios. You can request some by emailing [hello@neos.com](mailto:hello@neos.com).**Please don't spam them though. Only certain applications will be allowed right now.**

Once you have these credentials you can try them out.

Drop them into config/default.json. You will need both the client id and secret.

Once done, make sure you've ran `npm i` to install all of the dependencies.

## Running

To run the webserver use `npm run start`

## Use

Once running, head to `localhost:8080/auth/authorize`. This will redirect you to Neos' OAuth Systems, once you've logged in and accepted the application, you'll get redirected back to this webserver which will show your Neos Profile Details.

## Notes

While this may look simple, do note that you need to have some understanding of what OAuth is and how it works.

Don't expect to install this and have OAuth working for your application or scenario. You'll need to do some work to actually do something with this setup.
