import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

interface MyBucketProps {
    bucketName: string;
    versioned: boolean;
    encryption: s3.BucketEncryption;
}

export class Week10CdkStack extends cdk.Stack {

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const bucketProps: MyBucketProps = {
            bucketName: 'my-s3-bucket-ss-cdk-' + this.account,
            versioned: true,
            encryption: s3.BucketEncryption.S3_MANAGED,
        };

        new s3.Bucket(this, 'MyFirstBucket', {
            bucketName: bucketProps.bucketName,
            versioned: bucketProps.versioned,
            encryption: bucketProps.encryption,
        });
    }
}

