import { Stack, StackProps, aws_lambda_nodejs, aws_lambda } from "aws-cdk-lib";
import { Construct } from "constructs";

export class CdkLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const region = Stack.of(this).region;
    new aws_lambda_nodejs.NodejsFunction(this, "trpcLambda", {
      entry: "lib/lambdaEntry.ts",
      runtime: aws_lambda.Runtime.NODEJS_16_X,
      environment: {
        REGION: region,
        TZ: "Asia/Tokyo",
      },
      functionName: "trpcLambda",
    });
  }
}
