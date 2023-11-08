require("dotenv").config();
const jwt = require("jsonwebtoken");

const key = process.env.PrivateKey;

exports.handler = async (event) => {
    const token = event["authorizationToken"];

    let permission = "Deny";
    if (verifyToken(token)) {
        permission = "Allow";
    }
    const authResponse = {
        principalId: "user",
        policyDocument: {
            Version: "2023-11-08",
            Statement: [
                {
                    Action: "execute-api:Invoke",
                    Effect: `${permission}`,
                    Resource:
                        "arn:aws:execute-api:us-west-2:123456789012:ymy8tbxw7b/dev/GET/",
                },
            ],
        },
    };
    return authResponse;
};

function verifyToken(token) {
    const decoded = jwt.verify(
        token,
        key,
        {
            algorithms: ["RS256"],
        },
        function (err, payload) {
            // if token alg != RS256,  err == invalid signature

            if (err) {
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
