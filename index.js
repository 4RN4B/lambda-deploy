// Import the dotenv library to read environment variables from a .env file
require("dotenv").config();

// Import the jsonwebtoken library for working with JSON Web Tokens (JWT)
const jwt = require("jsonwebtoken");

// Retrieve the private key from environment variables and replace newline characters
const key = process.env.PrivateKey.replace(/\\n/gm, "\n");

/**
 * AWS Lambda function for custom authorization in API Gateway.
 *
 * @param {Object} event - The Lambda event object containing information about the HTTP request.
 * @returns {Object} - An object representing the authorization response.
 */
exports.handler = async (event) => {
    try {
        // Extract the JWT token from the request headers or the event itself
        var token;
        if (event.headers) {
            token = event.headers.authorizationToken || "";
        } else {
            token = event.authorizationToken || "";
        }

        // Set the default permission to "Deny"
        let permission = "Deny";

        // If the token is valid, set permission to "Allow"
        if (verifyToken(token)) {
            permission = "Allow";
        }

        // Build the authorization response object which is an IAM Policy
        const authResponse = {
            principalId: "user",
            policyDocument: {
                Version: "2012-10-17",
                Statement: [
                    {
                        Action: "execute-api:Invoke",
                        Effect: `${permission}`,
                        Resource: process.env.methodArn,
                    },
                ],
            },
        };
        // Return the authorization response
        return authResponse;
    } catch (err) {
        // Log and handle errors
        console.error(err.message);
    }
};

/**
 * Function to verify the validity of a JWT token.
 *
 * @param {string} token - The JWT token to be verified.
 * @returns {boolean} - True if the token is valid, false otherwise.
 */
function verifyToken(token) {
    try {
        // Verify the token using the provided key and algorithm
        const decoded = jwt.verify(token, key, {
            algorithms: "RS256",
        });

        // Return true if the verification is successful
        return true;
    } catch (error) {
        // Log and handle errors if the verification fails
        console.error(error.message);
        return false;
    }
}
