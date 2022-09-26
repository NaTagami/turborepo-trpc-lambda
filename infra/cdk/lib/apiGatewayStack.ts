import { Stack, StackProps, aws_lambda, aws_apigateway } from "aws-cdk-lib";
import { Construct } from "constructs";

export class CdkApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const accountId = Stack.of(this).account;
    const region = Stack.of(this).region;
    const echoFunction = aws_lambda.Function.fromFunctionArn(
      this,
      "trpcLambda",
      `arn:aws:lambda:${region}:${accountId}:function:trpcLambda`
    );
    const restApi = new aws_apigateway.RestApi(this, "RestApi", {
      restApiName: `echo-api`,
      deployOptions: {
        stageName: "v1",
      },
    });

    const proxy = restApi.root.addProxy({
      defaultIntegration: new aws_apigateway.LambdaIntegration(echoFunction),
      anyMethod: false,
      defaultCorsPreflightOptions: {
        allowOrigins: aws_apigateway.Cors.ALL_ORIGINS,
        allowMethods: aws_apigateway.Cors.ALL_METHODS,
        allowHeaders: aws_apigateway.Cors.DEFAULT_HEADERS,
        statusCode: 200,
      },
    });
    proxy.addMethod("GET");
    proxy.addMethod("POST");

    new aws_lambda.CfnPermission(this, `${echoFunction}-Permission`, {
      principal: "apigateway.amazonaws.com",
      action: "lambda:InvokeFunction",
      functionName: echoFunction.functionName,
      sourceArn: restApi.arnForExecuteApi(),
    });
  }
}
