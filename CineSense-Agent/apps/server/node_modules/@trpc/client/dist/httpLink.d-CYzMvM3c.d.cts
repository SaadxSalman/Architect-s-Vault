import { HTTPHeaders, Operation, TRPCLink } from "./types.d-B2PuQAdV.cjs";
import { HTTPLinkBaseOptions } from "./httpUtils.d-e55oH-rp.cjs";
import { AnyClientTypes, AnyRouter } from "@trpc/server/unstable-core-do-not-import";

//#region src/links/httpLink.d.ts
type HTTPLinkOptions<TRoot extends AnyClientTypes> = HTTPLinkBaseOptions<TRoot> & {
  /**
   * Headers to be set on outgoing requests or a callback that of said headers
   * @see http://trpc.io/docs/client/headers
   */
  headers?: HTTPHeaders | ((opts: {
    op: Operation;
  }) => HTTPHeaders | Promise<HTTPHeaders>);
};
/**
 * @see https://trpc.io/docs/client/links/httpLink
 */
declare function httpLink<TRouter extends AnyRouter = AnyRouter>(opts: HTTPLinkOptions<TRouter['_def']['_config']['$types']>): TRPCLink<TRouter>;
//# sourceMappingURL=httpLink.d.ts.map

//#endregion
export { HTTPLinkOptions, httpLink };
//# sourceMappingURL=httpLink.d-CYzMvM3c.d.cts.map