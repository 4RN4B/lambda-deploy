require("dotenv").config();
const jwt = require("jsonwebtoken");

const key = process.env.PrivateKey.replace(/\\n/gm, "\n");

exports.handler = async (event) => {
    try {
        var token;
        if (event.headers) {
            token = event.headers.authorizationToken || "";
        } else {
            token = event.authorizationToken || "";
        }

        let permission = "Deny";
        if (verifyToken(token)) {
            permission = "Allow";
        }
        const authResponse = {
            principalId: "user",
            policyDocument: {
                Version: "2012-10-17",
                Statement: [
                    {
                        Action: "execute-api:Invoke",
                        Effect: `${permission}`,
                        Resource:
                            "arn:aws:execute-api:ap-south-1:154370838805:es8lis9q7e/test-deploy/POST/user",
                    },
                ],
            },
        };
        return authResponse;
    } catch (err) {
        console.error(err.message);
    }
};

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, key, {
            algorithms: "RS256",
        });
        return true;
    } catch (error) {
        console.error(error.message);
        return false;
    }
}
