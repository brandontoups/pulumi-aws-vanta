import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

export interface VantaConnectionComponentArgs {
  /**
   * The AWS account ID for the account to be audited.
   */
  accountId: pulumi.Input<string>;
  /**
   * The external ID for the account to be audited.
   */
  externalId: pulumi.Input<string>;
}

export class VantaConnectionComponent extends pulumi.ComponentResource {
  public readonly vantaAuditor: aws.iam.Role;

  constructor(
    name: string,
    args: VantaConnectionComponentArgs,
    opts?: pulumi.ComponentResourceOptions
  ) {
    super("vanta:index:VantaConnectionComponent", name, args, opts);

    const vantaAdditionalPermissions = new aws.iam.Policy(
      `VantaAdditionalPermissions`,
      {
        name: `VantaAdditionalPermissions`,
        policy: {
          Version: "2012-10-17",
          Statement: [
            {
              Effect: "Allow",
              Action: [
                "ecr:BatchGetRepositoryScanningConfiguration",
                "ecr:DescribeImageScanFindings",
                "ecr:DescribeImages",
                "ecr:ListTagsForResource",
                "dynamodb:ListTagsOfResource",
                "inspector2:BatchGet*",
                "inspector2:Get*",
                "inspector2:Describe*",
                "inspector2:List*",
                "sqs:ListQueueTags",
              ],
              Resource: "*",
            },
            {
              Effect: "Deny",
              Action: [
                "datapipeline:EvaluateExpression",
                "datapipeline:QueryObjects",
                "rds:DownloadDBLogFilePortion",
              ],
              Resource: "*",
            },
          ],
        },
      },
      {
        protect: true,
        deleteBeforeReplace: true,
      }
    );

    this.vantaAuditor = new aws.iam.Role(
      "vanta-auditor",
      {
        name: "vanta-auditor",
        assumeRolePolicy: {
          Version: "2012-10-17",
          Statement: [
            {
              Effect: "Allow",
              Principal: {
                AWS: pulumi.interpolate`arn:aws:iam::${args.accountId}:root`,
              },
              Action: "sts:AssumeRole",
              Condition: {
                StringEquals: {
                  "sts:ExternalId": pulumi.interpolate`${args.externalId}`,
                },
              },
            },
          ],
        },
        description: "Auditor account for Vanta SOC2 compliance monitoring.",
        managedPolicyArns: [
          "arn:aws:iam::aws:policy/SecurityAudit",
          vantaAdditionalPermissions.arn,
        ],
      },
      {
        protect: true,
        deleteBeforeReplace: true,
      }
    );

    this.registerOutputs({
      vantaAuditorArn: this.vantaAuditor.arn,
    });
  }
}

exports.VantaConnectionComponent = VantaConnectionComponent;
