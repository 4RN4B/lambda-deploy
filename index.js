require("dotenv").config();
const jwt = require("jsonwebtoken");

const key = process.env.PRIVATE_KEY;

exports.handler = async (event) => {
    console.log("event", event);

    const token = event["authorizationToken"];

    console.log("token", token);

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
                console.log(err);
            } else if (payload) {
                return true;
            } else {
                return false;
            }
        }
    );
    return decoded;
}
