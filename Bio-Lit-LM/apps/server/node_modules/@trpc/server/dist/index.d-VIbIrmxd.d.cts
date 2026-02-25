import { AnyRouter, CreateContextCallback, DistributiveOmit, HTTPBaseHandlerOptions, MaybePromise, TRPCRequestInfo, inferRouterContext } from "./unstable-core-do-not-import.d-BJCeJk5P.cjs";
import * as http$1 from "http";
import * as http2 from "http2";

//#region src/adapters/node-http/types.d.ts

type NodeHTTPRequest = DistributiveOmit<http$1.IncomingMessage | http2.Http2ServerRequest, 'socket'> & {
  /**
   * Many adapters will add a `body` property to the incoming message and pre-parse the body
   */
  body?: unknown;
  /**
   * Socket is not always available in all deployments, so we need to make it optional
   * @see https://github.com/trpc/trpc/issues/6341
   * The socket object provided in the request does not fully implement the expected Node.js Socket interface.
   * @see https://github.com/trpc/trpc/pull/6358
   */
  socket?: Partial<http$1.IncomingMessage['socket']> | Partial<http2.Http2ServerRequest['socket']>;
};
type NodeHTTPResponse = DistributiveOmit<http$1.ServerResponse | http2.Http2ServerResponse, 'write'> & {
  /**
   * Force the partially-compressed response to be flushed to the client.
   *
   * Added by compression middleware
   * (depending on the environment,
   * e.g. Next <= 12,
   * e.g. Express w/ `compression()`)
   */
  flush?: () => void;
  write: (chunk: string | Uint8Array) => boolean;
};
type NodeHTTPCreateContextOption<TRouter extends AnyRouter, TRequest, TResponse> = CreateContextCallback<inferRouterContext<TRouter>, NodeHTTPCreateContextFn<TRouter, TRequest, TResponse>>;
/**
 * @internal
 */
type ConnectMiddleware<TRequest extends NodeHTTPRequest = NodeHTTPRequest, TResponse extends NodeHTTPResponse = NodeHTTPResponse> = (req: TRequest, res: TResponse, next: (err?: any) => any) => void;
type NodeHTTPHandlerOptions<TRouter extends AnyRouter, TRequest extends NodeHTTPRequest, TResponse extends NodeHTTPResponse> = HTTPBaseHandlerOptions<TRouter, TRequest> & NodeHTTPCreateContextOption<TRouter, TRequest, TResponse> & {
  /**
   * By default, http `OPTIONS` requests are not handled, and CORS headers are not returned.
   *
   * This can be used to handle them manually or via the `cors` npm package: https://www.npmjs.com/package/cors
   *
   * ```ts
   * import cors from 'cors'
   *
   * nodeHTTPRequestHandler({
   *   middleware: cors()
   * })
   * ```
   *
   * You can also use it for other needs which a connect/node.js compatible middleware can solve,
   *  though you might wish to consider an alternative solution like the Express adapter if your needs are complex.
   */
  middleware?: ConnectMiddleware<TRequest, TResponse>;
  maxBodySize?: number;
};
type NodeHTTPRequestHandlerOptions<TRouter extends AnyRouter, TRequest extends NodeHTTPRequest, TResponse extends NodeHTTPResponse> = NodeHTTPHandlerOptions<TRouter, TRequest, TResponse> & {
  req: TRequest;
  res: TResponse;
  /**
   * The tRPC path to handle requests for
   * @example 'post.all'
   */
  path: string;
};
type NodeHTTPCreateContextFnOptions<TRequest, TResponse> = {
  req: TRequest;
  res: TResponse;
  info: TRPCRequestInfo;
};
type NodeHTTPCreateContextFn<TRouter extends AnyRouter, TRequest, TResponse> = (opts: NodeHTTPCreateContextFnOptions<TRequest, TResponse>) => MaybePromise<inferRouterContext<TRouter>>;
//#endregion
//#region src/adapters/node-http/nodeHTTPRequestHandler.d.ts
/**
 * @internal
 */
declare function internal_exceptionHandler<TRouter extends AnyRouter, TRequest extends NodeHTTPRequest, TResponse extends NodeHTTPResponse>(opts: NodeHTTPRequestHandlerOptions<TRouter, TRequest, TResponse>): (cause: unknown) => void;
/**
 * @remark the promise never rejects
 */
declare function nodeHTTPRequestHandler<TRouter extends AnyRouter, TRequest extends NodeHTTPRequest, TResponse extends NodeHTTPResponse>(opts: NodeHTTPRequestHandlerOptions<TRouter, TRequest, TResponse>): Promise<void>;
//# sourceMappingURL=nodeHTTPRequestHandler.d.ts.map
//#endregion
//#region src/adapters/node-http/incomingMessageToRequest.d.ts
declare function createURL(req: NodeHTTPRequest): URL;
/**
 * Convert an [`IncomingMessage`](https://nodejs.org/api/http.html#class-httpincomingmessage) to a [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request)
 */
declare function incomingMessageToRequest(req: NodeHTTPRequest, res: NodeHTTPResponse, opts: {
  /**
   * Max body size in bytes. If the body is larger than this, the request will be aborted
   */
  maxBodySize: number | null;
}): Request;
//# sourceMappingURL=incomingMessageToRequest.d.ts.map

//#endregion
export { NodeHTTPCreateContextFn, NodeHTTPCreateContextFnOptions, NodeHTTPCreateContextOption, NodeHTTPHandlerOptions, NodeHTTPRequest, NodeHTTPRequestHandlerOptions, NodeHTTPResponse, createURL, incomingMessageToRequest, internal_exceptionHandler, nodeHTTPRequestHandler };
//# sourceMappingURL=index.d-VIbIrmxd.d.cts.map