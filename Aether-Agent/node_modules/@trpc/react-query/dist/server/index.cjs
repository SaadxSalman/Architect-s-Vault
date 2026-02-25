const require_getQueryKey = require('../getQueryKey-PyKLS56S.cjs');
const require_shared = require('../shared-Dt4RsQVp.cjs');
const __trpc_client = require_getQueryKey.__toESM(require("@trpc/client"));
const __tanstack_react_query = require_getQueryKey.__toESM(require("@tanstack/react-query"));
const __trpc_server_unstable_core_do_not_import = require_getQueryKey.__toESM(require("@trpc/server/unstable-core-do-not-import"));
const __trpc_client_unstable_internals = require_getQueryKey.__toESM(require("@trpc/client/unstable-internals"));

//#region src/server/ssgProxy.ts
var import_objectSpread2 = require_getQueryKey.__toESM(require_getQueryKey.require_objectSpread2(), 1);
var import_objectWithoutProperties = require_getQueryKey.__toESM(require_getQueryKey.require_objectWithoutProperties(), 1);
const _excluded = ["promise"];
/**
* Create functions you can use for server-side rendering / static generation
* @see https://trpc.io/docs/v11/client/nextjs/server-side-helpers
*/
function createServerSideHelpers(opts) {
	const queryClient = require_shared.getQueryClient(opts);
	const transformer = (0, __trpc_client_unstable_internals.getTransformer)(opts.transformer);
	const resolvedOpts = (() => {
		if ("router" in opts) {
			const { ctx, router } = opts;
			return {
				serialize: (obj) => transformer.output.serialize(obj),
				query: (queryOpts) => {
					return (0, __trpc_server_unstable_core_do_not_import.callProcedure)({
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
		const untypedClient = client instanceof __trpc_client.TRPCUntypedClient ? client : (0, __trpc_client.getUntypedClient)(client);
		return {
			query: (queryOpts) => untypedClient.query(queryOpts.path, queryOpts.input),
			serialize: (obj) => transformer.output.serialize(obj)
		};
	})();
	function _dehydrate(opts$1 = { shouldDehydrateQuery(query) {
		if (query.state.status === "pending") return false;
		return true;
	} }) {
		const before = (0, __trpc_server_unstable_core_do_not_import.run)(() => {
			const dehydrated = (0, __tanstack_react_query.dehydrate)(queryClient, opts$1);
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
	const proxy = (0, __trpc_server_unstable_core_do_not_import.createRecursiveProxy)((opts$1) => {
		const args = opts$1.args;
		const input = args[0];
		const arrayPath = [...opts$1.path];
		const utilName = arrayPath.pop();
		const queryFn = () => resolvedOpts.query({
			path: arrayPath.join("."),
			input
		});
		const queryKey = require_getQueryKey.getQueryKeyInternal(arrayPath, input, require_shared.getQueryType(utilName));
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
	return (0, __trpc_server_unstable_core_do_not_import.createFlatProxy)((key) => {
		if (key === "queryClient") return queryClient;
		if (key === "dehydrate") return _dehydrate;
		return proxy[key];
	});
}

//#endregion
exports.createServerSideHelpers = createServerSideHelpers;