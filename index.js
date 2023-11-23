// Import the dotenv library to read environment variables from a .env file
require("dotenv").config();

// Import the jsonwebtoken library for working with JSON Web Tokens (JWT)
const jwt = require("jsonwebtoken");

// Retrieve the private key from environment variables and replace newline characters
const key = process.env.PRIVATE_KEY.replace(/\\n/gm, "\n");

/**
 * AWS Lambda function for custom authorization in API Gateway.
 *
 * @param {Object} event - The Lambda event object containing information about the HTTP request.
 * @param {Object} event.headers - The headers of the HTTP request.
 * @param {string} event.authorizationToken - The authorization token from the request.
 * @param {string} event.methodArn - The ARN of the invoked method.
 * @returns {Object} - An object representing the authorization response.
 * @throws {Error} - Throws an error if authorization fails.
 */
exports.handler = async ({ headers, authorizationToken, methodArn }) => {
    try {
        // Extract the JWT token from the request headers or the event itself
        const token = headers?.authorizationToken || authorizationToken || "";

        // Set the default permission to "Deny"
        const permission = validateToken(token) ? "Allow" : "Deny";

        // Build the authorization response object which is an IAM Policy
        const authResponse = {
            principalId: "user",
            policyDocument: {
                Version: "2012-10-17",
                Statement: [
                    {
                        Action: "execute-api:Invoke",
                        Effect: permission,
                        Resource: methodArn,
                    },
                ],
            },
        };

        // Return the authorization response
        return authResponse;
    } catch (error) {
        // Log and handle errors
        console.error(
            `Authorization failed: ${sanitizeErrorMessage(error.message)}`
        );
        throw new Error("Authorization failed");
    }
};

/**
 * Function to validate and decode a JWT token.
 *
 * @param {string} token - The JWT token to be validated and decoded.
 * @returns {Object|null} - The decoded token if valid, null otherwise.
 * @throws {Error} - Throws an error if the validation or verification fails.
 */
function validateToken(token) {
    try {
        // Validate the token format
        if (!token.startsWith("Bearer ")) {
            throw new Error("Invalid token format");
        }

        // Extract the actual token value without the "Bearer " prefix
        const actualToken = token.slice(7);

        // Verify and decode the token using the provided key and algorithm
        const decoded = jwt.verify(
            actualToken,
            key,
            { algorithms: "RS256" },
            function (err) {
                if (err) {
                    console.log(err);
                    return false;
                } else {
                    return true;
                }
            }
        );
        // Return the decoded token
        return decoded;
    } catch (error) {
        // Log and handle errors if the validation or verification fails
        console.error(
            `Token validation failed: ${sanitizeErrorMessage(error.message)}`
        );
        throw new Error("Token validation failed");
    }
}

/**
 * Function to sanitize error messages by removing newline characters.
 *
 * @param {string} errorMessage - The error message to be sanitized.
 * @returns {string} - The sanitized error message.
 */
const sanitizeErrorMessage = (errorMessage) =>
    errorMessage.replace(/[\r\n]/g, "");
