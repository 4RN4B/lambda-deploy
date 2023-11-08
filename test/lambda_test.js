// Import necessary modules and the Lambda function
const assert = require("assert");
const lambdaFunction = require("../index.js"); // Update the path accordingly

// Describe block for the Lambda function
describe("Lambda Function Tests", () => {
    // Test case for a specific functionality
    it("Should return the correct result for a specific input", async () => {
        // Set up input parameters for the Lambda function
        // Give the correct authorization Token here
        // Enter the data you want to pass using event to the calling function
        const event = {
            authorizationToken:
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjlHbW55RlBraGMzaE91UjIybXZTdmduTG83WSIsImtpZCI6IjlHbW55RlBraGMzaE91UjIybXZTdmduTG83WSJ9.eyJhdWQiOiJhcGk6Ly9iNTVkNzJmYy04MDg1LTQ2NzktYWU3Yy1hMzcxNzViYjczZTciLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kZGQ2NmNjZS1mZmUxLTQwMjktOTY3Yy01ZTE1ZWY3MzEyN2YvIiwiaWF0IjoxNjk5NDQxMzE1LCJuYmYiOjE2OTk0NDEzMTUsImV4cCI6MTY5OTQ0NTIxNSwiYWlvIjoiRTJWZ1lOREllcS9udHVtRWt2WC9EMDRkZDk4ZUFBQT0iLCJhcHBpZCI6ImI1NWQ3MmZjLTgwODUtNDY3OS1hZTdjLWEzNzE3NWJiNzNlNyIsImFwcGlkYWNyIjoiMSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0L2RkZDY2Y2NlLWZmZTEtNDAyOS05NjdjLTVlMTVlZjczMTI3Zi8iLCJvaWQiOiI5MGM4MWYwZS04ZDJlLTRlMjgtYWY1Yy02YmU3YzAyZWU4ZmMiLCJyaCI6IjAuQVFzQXptelczZUhfS1VDV2ZGNFY3M01TZl94eVhiV0ZnSGxHcm55amNYVzdjLWNMQUFBLiIsInJvbGVzIjpbIkdFVF9NRUFMX0FORF9QQVgiLCJDT05GSVJNRURfQ09VTlRfVVBEQVRFIl0sInN1YiI6IjkwYzgxZjBlLThkMmUtNGUyOC1hZjVjLTZiZTdjMDJlZThmYyIsInRpZCI6ImRkZDY2Y2NlLWZmZTEtNDAyOS05NjdjLTVlMTVlZjczMTI3ZiIsInV0aSI6IlVieWhfcTg1ZDBpYS10cGFGcXVvQUEiLCJ2ZXIiOiIxLjAifQ.doNod-Dg4jdANn7FlM_TrmGuCsNuq9sp70I0wlEOXG_3iQ--crNHyJkC5yH2WvBu-0h7WtcZCgGZClB5nYwguSmE_SacV5Xt1YPQ3RiMqvsBmt2fp2oNnmAWwqmG2WLh4lY17ksYgpldhKdxEasAlMRheSiQak_BrKQLzqcuz_4CtualBZRc_r035zMTiw0yioX3_9dJe8nPppH74eot9x5J9QVERgRoY2JtxY9SgL59DMWCBT1kmgjt5YMAoJRXXuUzKU2RUI8Lt4p1woEnJN3B_nLSLp8qK84BLQ3UgD6PEucMIqeKxktuezR-eyjqJyj8a1apKAUzrSqi4iWGOA",
            methodArn:
                "arn:aws:execute-api:us-west-2:123456789012:ymy8tbxw7b/dev/GET/",
        };

        // Call the Lambda function
        const result = await lambdaFunction.handler(event);

        // Assert the expected result
        // assert.strictEqual(result.statusCode, 200); // Update based on your expected result
        assert.deepStrictEqual(result, {
            principalId: "user",
            policyDocument: {
                Version: "2012-10-17",
                Statement: [
                    {
                        Action: "execute-api:Invoke",
                        Effect: "Allow",
                        Resource:
                            "arn:aws:execute-api:us-west-2:123456789012:ymy8tbxw7b/dev/GET/",
                    },
                ],
            },
        }); // Update based on your expected result
    });

    // Test case for another functionality
    it("Should handle edge cases gracefully", async () => {
        // Set up input parameters for the Lambda function
        // Enter the data you want to pass using event to the calling function
        const event = {
            authorizationToken:
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjlHbW55RlBraGMzaE91UjIybXZTdmduTG83WSIsImtpZCI6IjlHbW55RlBraGMzaE91UjIybXZTdmduTG83WSJ9.eyJhdWQiOiJhcGk6Ly9iNTVkNzJmYy04MDg1LTQ2NzktYWU3Yy1hMzcxNzViYjczZTciLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kZGQ2NmNjZS1mZmUxLTQwMjktOTY3Yy01ZTE1ZWY3MzEyN2YvIiwiaWF0IjoxNjk5MDA3MzgzLCJuYmYiOjE2OTkwMDczODMsImV4cCI6MTY5OTAxMTI4MywiYWlvIjoiRTJGZ1lEQThaZlUxOFBpVFQ0ZkxGeCszWURaZUJRQT0iLCJhcHBpZCI6ImI1NWQ3MmZjLTgwODUtNDY3OS1hZTdjLWEzNzE3NWJiNzNlNyIsImFwcGlkYWNyIjoiMSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0L2RkZDY2Y2NlLWZmZTEtNDAyOS05NjdjLTVlMTVlZjczMTI3Zi8iLCJvaWQiOiI5MGM4MWYwZS04ZDJlLTRlMjgtYWY1Yy02YmU3YzAyZWU4ZmMiLCJyaCI6IjAuQVFzQXptelczZUhfS1VDV2ZGNFY3M01TZl94eVhiV0ZnSGxHcm55amNYVzdjLWNMQUFBLiIsInJvbGVzIjpbIkdFVF9NRUFMX0FORF9QQVgiLCJDT05GSVJNRURfQ09VTlRfVVBEQVRFIl0sInN1YiI6IjkwYzgxZjBlLThkMmUtNGUyOC1hZjVjLTZiZTdjMDJlZThmYyIsInRpZCI6ImRkZDY2Y2NlLWZmZTEtNDAyOS05NjdjLTVlMTVlZjczMTI3ZiIsInV0aSI6IkdyQVViRWZhc1VhZE5wOFcxdjAyQUEiLCJ2ZXIiOiIxLjAifQ.pmcwkEgHZiM2kC9h1I-PfZZW1dTlTRDWPfidU71EamfCj95tHu3RHra6cYbeuTiLcKMFCEfwBAOVLVQRFUeq7qeTwHgDTeR4FbDkXgwvsBsYoO6IZ2PR36t77H2P_BupgOIDHtoNZ9nZyjiq7z9NWBOJFTiC2e2yNeWTfQwEFf84e7U4CTuXYkiZHxUWfrqmcVETdpTepsQ4L4txfJe2LDNZG2FSueNuCYWUojn1gyrSIVl4JVTVsUrh_ZYV2Cb6-YLu3iIU_hcxa_-9cPnkleLTDT4kkfai5TndHlhjUjs0aNtVAbc-Z8x-YNNkKDF5lEQqe7HAHkBLHkl0RulgTQ",
            methodArn:
                "arn:aws:execute-api:us-west-2:123456789012:ymy8tbxw7b/dev/GET/",
        };

        // Call the Lambda function
        const result = await lambdaFunction.handler(event);
        // console.log("Result body ===> " + result.body);

        // Assert the expected result for edge cases
        // assert.strictEqual(result.statusCode, 401); // Update based on your expected result for edge cases
        assert.deepStrictEqual(result, {
            principalId: "user",
            policyDocument: {
                Version: "2012-10-17",
                Statement: [
                    {
                        Action: "execute-api:Invoke",
                        Effect: "Deny",
                        Resource:
                            "arn:aws:execute-api:us-west-2:123456789012:ymy8tbxw7b/dev/GET/",
                    },
                ],
            },
        }); // Update based on your expected result for edge cases
    });

    // Add more test cases as needed
});