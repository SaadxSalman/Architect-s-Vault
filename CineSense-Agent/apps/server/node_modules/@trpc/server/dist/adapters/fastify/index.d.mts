import "../../index.d-D4qZxQJh.mjs";
import { AnyRouter, HTTPBaseHandlerOptions } from "../../unstable-core-do-not-import.d-CjQPvBRI.mjs";
import "../../index.d-vq_QHko2.mjs";
import { NodeHTTPCreateContextFnOptions, NodeHTTPCreateContextOption } from "../../index.d-D7vhS0-R.mjs";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

//#region src/adapters/fastify/fastifyRequestHandler.d.ts

type FastifyHandlerOptions<TRouter extends AnyRouter, TRequest extends FastifyRequest, TResponse extends FastifyReply> = HTTPBaseHandlerOptions<TRouter, TRequest> & NodeHTTPCreateContextOption<TRouter, TRequest, TResponse>;
type FastifyRequestHandlerOptions<TRouter extends AnyRouter, TRequest extends FastifyRequest, TResponse extends FastifyReply> = FastifyHandlerOptions<TRouter, TRequest, TResponse> & {
  req: TRequest;
  res: TResponse;
  path: string;
};
declare function fastifyRequestHandler<TRouter extends AnyRouter, TRequest extends FastifyRequest, TResponse extends FastifyReply>(opts: FastifyRequestHandlerOptions<TRouter, TRequest, TResponse>): Promise<void>;
//#endregion
//#region src/adapters/fastify/fastifyTRPCPlugin.d.ts
interface FastifyTRPCPluginOptions<TRouter extends AnyRouter> {
  prefix?: string;
  useWSS?: boolean;
  trpcOptions: FastifyHandlerOptions<TRouter, FastifyRequest, FastifyReply>;
}
type CreateFastifyContextOptions = NodeHTTPCreateContextFnOptions<FastifyRequest, FastifyReply>;
declare function fastifyTRPCPlugin<TRouter extends AnyRouter>(fastify: FastifyInstance, opts: FastifyTRPCPluginOptions<TRouter>, done: (err?: Error) => void): void;
//# sourceMappingURL=fastifyTRPCPlugin.d.ts.map

//#endregion
export { CreateFastifyContextOptions, FastifyHandlerOptions, FastifyTRPCPluginOptions, fastifyRequestHandler, fastifyTRPCPlugin };
//# sourceMappingURL=index.d.mts.map