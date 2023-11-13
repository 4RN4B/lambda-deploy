require("dotenv").config();
const jwt = require("jsonwebtoken");

const key = process.env.PrivateKey.replace(/\\n/gm, "\n");

exports.handler = async (event) => {
    const token = event["authorizationToken"];

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
                    Resource: event["methodArn"],
                },
            ],
        },
    };
    return authResponse;
};

function verifyToken(token) {
    console.log(key);
    const decoded = jwt.verify(
        token,
        key,
        {
            algorithms: "RS256",
        },
        function (err, payload) {
            // if token alg != RS256,  err == invalid signature

            if (err) {
                console.log(err);
                return false;
            } else if (payload) {
                return true;
            } else {
                return false;
            }
        }
    );
    return decoded;
}
