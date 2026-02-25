import "../index.d-D4qZxQJh.mjs";
import { AnyRouter } from "../unstable-core-do-not-import.d-1RewV6pM.mjs";
import "../index.d-vq_QHko2.mjs";
import { NodeHTTPCreateContextFnOptions, NodeHTTPHandlerOptions } from "../index.d-DJGodwWi.mjs";
import { NextApiHandler, NextApiHandler as NextApiHandler$1, NextApiRequest, NextApiRequest as NextApiRequest$1, NextApiResponse, NextApiResponse as NextApiResponse$1 } from "next";

//#region src/adapters/next.d.ts

type CreateNextContextOptions = NodeHTTPCreateContextFnOptions<NextApiRequest$1, NextApiResponse$1>;
/**
 * Preventing "TypeScript where it's tough not to get "The inferred type of 'xxxx' cannot be named without a reference to [...]"
 */

declare function createNextApiHandler<TRouter extends AnyRouter>(opts: NodeHTTPHandlerOptions<TRouter, NextApiRequest$1, NextApiResponse$1>): NextApiHandler$1;
//# sourceMappingURL=next.d.ts.map

//#endregion
export { CreateNextContextOptions, NextApiHandler, NextApiRequest, NextApiResponse, createNextApiHandler };
//# sourceMappingURL=next.d.mts.map