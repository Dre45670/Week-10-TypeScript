
// Variables Const
const API_ENDPOINT = 'https://api.mycloud.com/v1';
console.log(API_ENDPOINT); // Outputs: https://api.mycloud.com/v1

// API_ENDPOINT = 'https://api.mycloud.com/v2'; // This would throw an error

// ----- Configuration Management -----
const AWS_REGION = 'us-west-2';
const MAX_RETRIES = 3;
const DYNAMODB_TABLE = 'Users';

function fetchUserData(userId) {
    // Use these constants in your AWS SDK calls
}

// ----- Security -----
const API_KEY = process.env.API_KEY;
API_KEY = 'new_key'; // This would throw an error, preventing accidental exposure

// ----- Preventing Bugs -----
const LAMBDA_TIMEOUT_MS = 3000;

function configureLambda(functionName) {
    LAMBDA_TIMEOUT_MS = 5000; // Error!
    // Configure Lambda function with the timeout
}