
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class VpcCdkProjectStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {

    super(scope, id, props);

    // =========================
    // VPC + Subnets
    // =========================

    const vpc = new ec2.Vpc(this, 'MyVPC', {

      maxAzs: 2,

      subnetConfiguration: [

        {
          name: 'PublicSubnet',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },

        {
          name: 'PrivateSubnet',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 24,
        }, // <-- Missing comma fixed here

        {
          name: 'Database',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 24,
        },

      ]
    });

    // =========================
    // Security Group
    // =========================

    const webServerSG = new ec2.SecurityGroup(this, 'WebServerSG', {
      vpc,
      allowAllOutbound: true,
      description: 'Allow SSH and HTTP',
    });

    // Allow SSH
    webServerSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      'Allow SSH'
    );

    // Allow HTTP
    webServerSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      'Allow HTTP'
    );

    // =========================
    // EC2 Instance
    // =========================

    const instance = new ec2.Instance(this, 'MyEC2Instance', {

      vpc,

      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },

      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO
      ),

      machineImage: ec2.MachineImage.latestAmazonLinux2023(),

      securityGroup: webServerSG,

      // Replace with your actual EC2 Key Pair name
    });

    // =========================
    // Outputs
    // =========================

    new cdk.CfnOutput(this, 'VPCId', {
      value: vpc.vpcId,
      description: 'The ID of the VPC',
    });

    new cdk.CfnOutput(this, 'InstanceId', {
      value: instance.instanceId,
      description: 'The EC2 Instance ID',
    });

    new cdk.CfnOutput(this, 'PublicIP', {
      value: instance.instancePublicIp,
      description: 'Public IP Address',
    });

  }
}