import "../../index.d-BiUz7kM_.cjs";
import { AnyRouter, CreateContextCallback, HTTPBaseHandlerOptions, TRPCRequestInfo, inferRouterContext } from "../../unstable-core-do-not-import.d-BXekdOPr.cjs";
import "../../index.d-CvZXeEyR.cjs";
import { APIGatewayProxyEvent, APIGatewayProxyEventV2, APIGatewayProxyResult, APIGatewayProxyStructuredResultV2, Context, StreamifyHandler } from "aws-lambda";

//#region src/adapters/aws-lambda/getPlanner.d.ts
type LambdaEvent = APIGatewayProxyEvent | APIGatewayProxyEventV2;
/** 1:1 mapping of v1 or v2 input events, deduces which is which.
 * @internal
 **/
type inferAPIGWReturn<TEvent> = TEvent extends APIGatewayProxyEvent ? APIGatewayProxyResult : TEvent extends APIGatewayProxyEventV2 ? APIGatewayProxyStructuredResultV2 : never;
//#endregion
//#region src/adapters/aws-lambda/index.d.ts
type CreateAWSLambdaContextOptions<TEvent extends LambdaEvent> = {
  event: TEvent;
  context: Context;
  info: TRPCRequestInfo;
};
type AWSLambdaOptions<TRouter extends AnyRouter, TEvent extends LambdaEvent> = HTTPBaseHandlerOptions<TRouter, TEvent> & CreateContextCallback<inferRouterContext<AnyRouter>, AWSLambdaCreateContextFn<TRouter, TEvent>>;
type AWSLambdaCreateContextFn<TRouter extends AnyRouter, TEvent extends LambdaEvent> = ({
  event,
  context,
  info
}: CreateAWSLambdaContextOptions<TEvent>) => inferRouterContext<TRouter> | Promise<inferRouterContext<TRouter>>;
declare function awsLambdaRequestHandler<TRouter extends AnyRouter, TEvent extends LambdaEvent>(opts: AWSLambdaOptions<TRouter, TEvent>): (event: TEvent, context: Context) => Promise<inferAPIGWReturn<TEvent>>;
declare function awsLambdaStreamingRequestHandler<TRouter extends AnyRouter, TEvent extends LambdaEvent>(opts: AWSLambdaOptions<TRouter, TEvent>): StreamifyHandler<TEvent>;
//# sourceMappingURL=index.d.ts.map

//#endregion
export { AWSLambdaCreateContextFn, AWSLambdaOptions, CreateAWSLambdaContextOptions, awsLambdaRequestHandler, awsLambdaStreamingRequestHandler };
//# sourceMappingURL=index.d.cts.map