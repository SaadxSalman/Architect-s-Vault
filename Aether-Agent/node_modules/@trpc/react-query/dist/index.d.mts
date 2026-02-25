import { CreateQueryUtils, CreateTRPCReact, CreateTRPCReactBase, createTRPCReact, getMutationKey, getQueryKey, inferReactQueryProcedureOptions } from "./getQueryKey.d-CruH3ncI.mjs";
import { TRPCClient, TRPCUntypedClient } from "@trpc/client";
import { QueryClient } from "@tanstack/react-query";
import { AnyRouter } from "@trpc/server/unstable-core-do-not-import";
export * from "@trpc/client";

//#region src/utils/createUtilityFunctions.d.ts
interface CreateQueryUtilsOptions<TRouter extends AnyRouter> {
  /**
   * The `TRPCClient`
   */
  client: TRPCClient<TRouter> | TRPCUntypedClient<TRouter>;
  /**
   * The `QueryClient` from `react-query`
   */
  queryClient: QueryClient;
}
/**
 * Creates a set of utility functions that can be used to interact with `react-query`
 * @param opts the `TRPCClient` and `QueryClient` to use
 * @returns a set of utility functions that can be used to interact with `react-query`
 * @internal
 */
//#endregion
//#region src/createTRPCQueryUtils.d.ts
declare function createTRPCQueryUtils<TRouter extends AnyRouter>(opts: CreateQueryUtilsOptions<TRouter>): CreateQueryUtils<TRouter>;
//# sourceMappingURL=createTRPCQueryUtils.d.ts.map

//#endregion
export { CreateTRPCReact, CreateTRPCReactBase, createTRPCQueryUtils, createTRPCReact, getMutationKey, getQueryKey, inferReactQueryProcedureOptions };
//# sourceMappingURL=index.d.mts.map