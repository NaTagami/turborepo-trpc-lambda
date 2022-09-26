#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { CdkApiStack } from "../lib/apiGatewayStack";
import { CdkLambdaStack } from "../lib/lambdaStack";

const app = new cdk.App();
new CdkLambdaStack(app, "LambdaStack");
new CdkApiStack(app, "ApiGatewayStack");

/*
import * as cdk from "@aws-cdk/core";
import { CdkApiStack } from "../lib/apiGatewayStack";
import { CdkLambdaStack } from "../lib/lambdaStack";

const app = new cdk.App();
new CdkLambdaStack(app, "LambdaStack");
new CdkApiStack(app, "ApiGatewayStack");
*/
