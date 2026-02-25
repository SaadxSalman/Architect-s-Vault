import { FetchEsque } from "./types.d-B2PuQAdV.cjs";
import { TransformerOptions } from "./unstable-internals.d-kWsZTlQq.cjs";
import { AnyClientTypes, CombinedDataTransformer, Maybe, ProcedureType } from "@trpc/server/unstable-core-do-not-import";

//#region src/links/internals/httpUtils.d.ts

/**
 * @internal
 */
type HTTPLinkBaseOptions<TRoot extends Pick<AnyClientTypes, 'transformer'>> = {
  url: string | URL;
  /**
   * Add ponyfill for fetch
   */
  fetch?: FetchEsque;
  /**
   * Send all requests `as POST`s requests regardless of the procedure type
   * The HTTP handler must separately allow overriding the method. See:
   * @see https://trpc.io/docs/rpc
   */
  methodOverride?: 'POST';
} & TransformerOptions<TRoot>;
//#endregion
export { HTTPLinkBaseOptions };
//# sourceMappingURL=httpUtils.d-e55oH-rp.d.cts.map