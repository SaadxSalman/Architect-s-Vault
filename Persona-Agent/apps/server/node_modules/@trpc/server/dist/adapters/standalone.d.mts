import "../index.d-D4qZxQJh.mjs";
import { AnyRouter } from "../unstable-core-do-not-import.d-CjQPvBRI.mjs";
import "../index.d-vq_QHko2.mjs";
import { NodeHTTPCreateContextFnOptions, NodeHTTPHandlerOptions, NodeHTTPRequest, NodeHTTPResponse } from "../index.d-D7vhS0-R.mjs";
import http from "http";
import * as http2 from "http2";

//#region src/adapters/standalone.d.ts

type StandaloneHandlerOptions<TRouter extends AnyRouter, TRequest extends NodeHTTPRequest, TResponse extends NodeHTTPResponse> = NodeHTTPHandlerOptions<TRouter, TRequest, TResponse> & {
  /**
   * The base path to handle requests for.
   * This will be sliced from the beginning of the request path
   * (Do not miss including the trailing slash)
   * @default '/'
   * @example '/trpc/'
   * @example '/trpc/api/'
   */
  basePath?: string;
};
type CreateHTTPHandlerOptions<TRouter extends AnyRouter> = StandaloneHandlerOptions<TRouter, http.IncomingMessage, http.ServerResponse>;
type CreateHTTPContextOptions = NodeHTTPCreateContextFnOptions<http.IncomingMessage, http.ServerResponse>;
/**
 * @internal
 */
declare function createHTTPHandler<TRouter extends AnyRouter>(opts: CreateHTTPHandlerOptions<TRouter>): http.RequestListener;
declare function createHTTPServer<TRouter extends AnyRouter>(opts: CreateHTTPHandlerOptions<TRouter>): http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
type CreateHTTP2HandlerOptions<TRouter extends AnyRouter> = StandaloneHandlerOptions<TRouter, http2.Http2ServerRequest, http2.Http2ServerResponse>;
type CreateHTTP2ContextOptions = NodeHTTPCreateContextFnOptions<http2.Http2ServerRequest, http2.Http2ServerResponse>;
declare function createHTTP2Handler(opts: CreateHTTP2HandlerOptions<AnyRouter>): (req: http2.Http2ServerRequest, res: http2.Http2ServerResponse<http2.Http2ServerRequest>) => void;
//#endregion
export { CreateHTTP2ContextOptions, CreateHTTP2HandlerOptions, CreateHTTPContextOptions, CreateHTTPHandlerOptions, createHTTP2Handler, createHTTPHandler, createHTTPServer };
//# sourceMappingURL=standalone.d.mts.map