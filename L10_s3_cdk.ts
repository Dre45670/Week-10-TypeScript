
import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';

export class MyStack extends cdk.Stack {

    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Define resources for the stack
        new s3.Bucket(this, 'MyBucket', {
            versioned: true,
            encryption: s3.BucketEncryption.S3_MANAGED,
        });
    }
}