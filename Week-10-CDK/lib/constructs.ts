
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

import { S3ToLambda } from '@aws-solutions-constructs/aws-s3-lambda';


// ==============================
// L1 CONSTRUCT
// ==============================

export class L1BucketStack extends cdk.Stack {

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {

        super(scope, id, props);

        new s3.CfnBucket(this, 'MyL1Bucket', {
            bucketName: 'my-l1-bucket-' + this.account,

            versioningConfiguration: {
                status: 'Enabled'
            },

            publicAccessBlockConfiguration: {
                blockPublicAcls: true,
                blockPublicPolicy: true,
                ignorePublicAcls: true,
                restrictPublicBuckets: true
            }
        });
    }
}


// ==============================
// L2 CONSTRUCT
// ==============================

export class L2BucketStack extends cdk.Stack {

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {

        super(scope, id, props);

        new s3.Bucket(this, 'MyL2Bucket', {
            bucketName: 'my-l2-bucket-' + this.account,
            versioned: true,
            encryption: s3.BucketEncryption.S3_MANAGED,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        });
    }
}


// ==============================
// L3 CONSTRUCT
// ==============================

export class L3BucketStack extends cdk.Stack {

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {

        super(scope, id, props);

        // Lambda function
        const myLambda = new lambda.Function(this, 'MyLambdaFunction', {
            runtime: lambda.Runtime.NODEJS_18_X,
            handler: 'index.handler',
            code: lambda.Code.fromInline(`
                exports.handler = async function(event) {
                    console.log("S3 Event:", JSON.stringify(event));
                    return {};
                };
            `),
        });

        // L3 Construct
        new S3ToLambda(this, 'MyL3Bucket', {
            lambdaFunctionProps: {
                runtime: lambda.Runtime.NODEJS_18_X,
                handler: 'index.handler',
                code: lambda.Code.fromInline(`
                    exports.handler = async function(event) {
                        console.log("Event:", JSON.stringify(event));
                    };
                `),
            }
        });
    }
}