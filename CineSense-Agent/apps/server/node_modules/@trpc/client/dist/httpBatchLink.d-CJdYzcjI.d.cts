import { HTTPHeaders, NonEmptyArray, Operation, TRPCLink } from "./types.d-B2PuQAdV.cjs";
import { HTTPLinkBaseOptions } from "./httpUtils.d-e55oH-rp.cjs";
import { AnyClientTypes } from "@trpc/server/unstable-core-do-not-import";
import { AnyRouter as AnyRouter$1 } from "@trpc/server";

//#region src/links/HTTPBatchLinkOptions.d.ts
type HTTPBatchLinkOptions<TRoot extends AnyClientTypes> = HTTPLinkBaseOptions<TRoot> & {
  maxURLLength?: number;
  /**
   * Headers to be set on outgoing requests or a callback that of said headers
   * @see http://trpc.io/docs/client/headers
   */
  headers?: HTTPHeaders | ((opts: {
    opList: NonEmptyArray<Operation>;
  }) => HTTPHeaders | Promise<HTTPHeaders>);
  /**
   * Maximum number of calls in a single batch request
   * @default Infinity
   */
  maxItems?: number;
};
//# sourceMappingURL=HTTPBatchLinkOptions.d.ts.map
//#endregion
//#region src/links/httpBatchLink.d.ts
/**
 * @see https://trpc.io/docs/client/links/httpBatchLink
 */
declare function httpBatchLink<TRouter extends AnyRouter$1>(opts: HTTPBatchLinkOptions<TRouter['_def']['_config']['$types']>): TRPCLink<TRouter>;
//# sourceMappingURL=httpBatchLink.d.ts.map

//#endregion
export { HTTPBatchLinkOptions, httpBatchLink };
//# sourceMappingURL=httpBatchLink.d-CJdYzcjI.d.cts.map