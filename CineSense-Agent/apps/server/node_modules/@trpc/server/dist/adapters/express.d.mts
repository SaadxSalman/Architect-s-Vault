import "../index.d-D4qZxQJh.mjs";
import { AnyRouter } from "../unstable-core-do-not-import.d-CjQPvBRI.mjs";
import "../index.d-vq_QHko2.mjs";
import { NodeHTTPCreateContextFnOptions, NodeHTTPHandlerOptions } from "../index.d-D7vhS0-R.mjs";
import * as express from "express";

//#region src/adapters/express.d.ts

type CreateExpressContextOptions = NodeHTTPCreateContextFnOptions<express.Request, express.Response>;
declare function createExpressMiddleware<TRouter extends AnyRouter>(opts: NodeHTTPHandlerOptions<TRouter, express.Request, express.Response>): express.Handler;
//# sourceMappingURL=express.d.ts.map

//#endregion
export { CreateExpressContextOptions, createExpressMiddleware };
//# sourceMappingURL=express.d.mts.map