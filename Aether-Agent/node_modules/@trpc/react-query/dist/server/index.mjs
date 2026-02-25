import { __toESM, getQueryKeyInternal, require_objectSpread2, require_objectWithoutProperties } from "../getQueryKey-BY58RNzP.mjs";
import { getQueryClient, getQueryType } from "../shared-JtnEvJvB.mjs";
import { TRPCUntypedClient, getUntypedClient } from "@trpc/client";
import { dehydrate } from "@tanstack/react-query";
import { callProcedure, createFlatProxy, createRecursiveProxy, run } from "@trpc/server/unstable-core-do-not-import";
import { getTransformer } from "@trpc/client/unstable-internals";

//#region src/server/ssgProxy.ts
var import_objectSpread2 = __toESM(require_objectSpread2(), 1);
var import_objectWithoutProperties = __toESM(require_objectWithoutProperties(), 1);
const _excluded = ["promise"];
/**
* Create functions you can use for server-side rendering / static generation
* @see https://trpc.io/docs/v11/client/nextjs/server-side-helpers
*/
function createServerSideHelpers(opts) {
	const queryClient = getQueryClient(opts);
	const transformer = getTransformer(opts.transformer);
	const resolvedOpts = (() => {
		if ("router" in opts) {
			const { ctx, router } = opts;
			return {
				serialize: (obj) => transformer.output.serialize(obj),
				query: (queryOpts) => {
					return callProcedure({
						router,
						path: queryOpts.path,
						getRawInput: async () => queryOpts.input,
						ctx,
						type: "query",
						signal: void 0
					});
				}
			};
		}
		const { client } = opts;
		const untypedClient = client instanceof TRPCUntypedClient ? client : getUntypedClient(client);
		return {
			query: (queryOpts) => untypedClient.query(queryOpts.path, queryOpts.input),
			serialize: (obj) => transformer.output.serialize(obj)
		};
	})();
	function _dehydrate(opts$1 = { shouldDehydrateQuery(query) {
		if (query.state.status === "pending") return false;
		return true;
	} }) {
		const before = run(() => {
			const dehydrated = dehydrate(queryClient, opts$1);
			return (0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, dehydrated), {}, { queries: dehydrated.queries.map((query) => {
				if (query.promise) {
					const { promise: _ } = query, rest = (0, import_objectWithoutProperties.default)(query, _excluded);
					return rest;
				}
				return query;
			}) });
		});
		const after = resolvedOpts.serialize(before);
		return after;
	}
	const proxy = createRecursiveProxy((opts$1) => {
		const args = opts$1.args;
		const input = args[0];
		const arrayPath = [...opts$1.path];
		const utilName = arrayPath.pop();
		const queryFn = () => resolvedOpts.query({
			path: arrayPath.join("."),
			input
		});
		const queryKey = getQueryKeyInternal(arrayPath, input, getQueryType(utilName));
		const helperMap = {
			queryOptions: () => {
				const args1 = args[1];
				return (0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, args1), {}, {
					queryKey,
					queryFn
				});
			},
			infiniteQueryOptions: () => {
				const args1 = args[1];
				return (0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, args1), {}, {
					queryKey,
					queryFn
				});
			},
			fetch: () => {
				const args1 = args[1];
				return queryClient.fetchQuery((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, args1), {}, {
					queryKey,
					queryFn
				}));
			},
			fetchInfinite: () => {
				var _args1$initialCursor;
				const args1 = args[1];
				return queryClient.fetchInfiniteQuery((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, args1), {}, {
					queryKey,
					queryFn,
					initialPageParam: (_args1$initialCursor = args1 === null || args1 === void 0 ? void 0 : args1.initialCursor) !== null && _args1$initialCursor !== void 0 ? _args1$initialCursor : null
				}));
			},
			prefetch: () => {
				const args1 = args[1];
				return queryClient.prefetchQuery((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, args1), {}, {
					queryKey,
					queryFn
				}));
			},
			prefetchInfinite: () => {
				var _args1$initialCursor2;
				const args1 = args[1];
				return queryClient.prefetchInfiniteQuery((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, args1), {}, {
					queryKey,
					queryFn,
					initialPageParam: (_args1$initialCursor2 = args1 === null || args1 === void 0 ? void 0 : args1.initialCursor) !== null && _args1$initialCursor2 !== void 0 ? _args1$initialCursor2 : null
				}));
			}
		};
		return helperMap[utilName]();
	});
	return createFlatProxy((key) => {
		if (key === "queryClient") return queryClient;
		if (key === "dehydrate") return _dehydrate;
		return proxy[key];
	});
}

//#endregion
export { createServerSideHelpers };
//# sourceMappingURL=index.mjs.map