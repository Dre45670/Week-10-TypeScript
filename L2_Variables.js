
// Variables, Let and Const

function deployResources(isProduction) {
    let region = 'eu-west-1'; // Default region for development

    if (isProduction) {
        let region = 'eu-west-2'; // Region for production
        console.log(`Deploying production resources in ${region}`);

        // Deploy production-specific resources here
    }

    console.log(`Setting up monitoring in ${region}`);

    // Set up monitoring here
}

deployResources(true);  // Deploy for production
deployResources(false); // Deploy for development