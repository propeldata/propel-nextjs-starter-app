// ./apollo-client.js

import { ApolloClient, InMemoryCache } from "@apollo/client";

import { ClientCredentials } from "simple-oauth2";

// Set the config for the OAuth2 client
const config = {
    client: {
        id: process.env.CLIENT_ID_SAMPLE_APP_DEV,
        secret: process.env.CLIENT_SECRET_SAMPLE_APP_DEV
    },
    auth: {
        tokenHost: process.env.TOKEN_HOST,
        tokenPath: process.env.TOKEN_PATH
    }
};

// Create the OAuth2 client
const oauth2Client = new ClientCredentials(config);
const tokenParams = {
    scope: '<scope>',
};

// Get a token using the client credentials

let token = '';
oauth2Client.getToken()
    .then(function (accessToken) {
        //console.log(accessToken);
        token = accessToken.token.access_token;
        console.log("token in: "+token);
    })
    .catch(function (error) {
        console.log("Error: "+error);
    });



const client = new ApolloClient({ 
    uri: "https://api.spacex.land/graphql/",
    cache: new InMemoryCache(),
});
export default client;

    