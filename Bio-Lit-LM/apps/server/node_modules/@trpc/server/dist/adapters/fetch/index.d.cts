import "../../index.d-BiUz7kM_.cjs";
import { AnyRouter, CreateContextCallback, HTTPBaseHandlerOptions, TRPCRequestInfo, inferRouterContext } from "../../unstable-core-do-not-import.d-BJCeJk5P.cjs";
import "../../index.d-CvZXeEyR.cjs";

//#region src/adapters/fetch/types.d.ts

type FetchCreateContextFnOptions = {
  req: Request;
  resHeaders: Headers;
  info: TRPCRequestInfo;
};
type FetchCreateContextFn<TRouter extends AnyRouter> = (opts: FetchCreateContextFnOptions) => inferRouterContext<TRouter> | Promise<inferRouterContext<TRouter>>;
type FetchCreateContextOption<TRouter extends AnyRouter> = CreateContextCallback<inferRouterContext<TRouter>, FetchCreateContextFn<TRouter>>;
type FetchHandlerOptions<TRouter extends AnyRouter> = FetchCreateContextOption<TRouter> & HTTPBaseHandlerOptions<TRouter, Request> & {
  req: Request;
  endpoint: string;
};
type FetchHandlerRequestOptions<TRouter extends AnyRouter> = HTTPBaseHandlerOptions<TRouter, Request> & CreateContextCallback<inferRouterContext<TRouter>, FetchCreateContextFn<TRouter>> & {
  req: Request;
  endpoint: string;
};
//# sourceMappingURL=types.d.ts.map
//#endregion
//#region src/adapters/fetch/fetchRequestHandler.d.ts
declare function fetchRequestHandler<TRouter extends AnyRouter>(opts: FetchHandlerRequestOptions<TRouter>): Promise<Response>;
//# sourceMappingURL=fetchRequestHandler.d.ts.map

//#endregion
export { FetchCreateContextFn, FetchCreateContextFnOptions, FetchCreateContextOption, FetchHandlerOptions, FetchHandlerRequestOptions, fetchRequestHandler };
//# sourceMappingURL=index.d.cts.map