const require_getQueryKey = require('./getQueryKey-PyKLS56S.cjs');
const __tanstack_react_query = require_getQueryKey.__toESM(require("@tanstack/react-query"));
const __trpc_server_unstable_core_do_not_import = require_getQueryKey.__toESM(require("@trpc/server/unstable-core-do-not-import"));
const react = require_getQueryKey.__toESM(require("react"));
const react_jsx_runtime = require_getQueryKey.__toESM(require("react/jsx-runtime"));

//#region src/rsc.tsx
var import_objectSpread2 = require_getQueryKey.__toESM(require_getQueryKey.require_objectSpread2());
const HELPERS = ["prefetch", "prefetchInfinite"];
/**
* @note This requires `@tanstack/react-query@^5.49.0`
* @note Make sure to have `dehydrate.serializeData` and `hydrate.deserializeData`
* set to your data transformer in your `QueryClient` factory.
* @example
* ```ts
* export const createQueryClient = () =>
*   new QueryClient({
*     defaultOptions: {
*       dehydrate: {
*         serializeData: transformer.serialize,
*       },
*       hydrate: {
*         deserializeData: transformer.deserialize,
*       },
*     },
*   });
* ```
*/
function createHydrationHelpers(caller, getQueryClient) {
	const wrappedProxy = (0, __trpc_server_unstable_core_do_not_import.createRecursiveProxy)(async (opts) => {
		const path = [...opts.path];
		const args = [...opts.args];
		const proc = path.reduce((acc, key) => HELPERS.includes(key) ? acc : acc[key], caller);
		const input = args[0];
		const promise = proc(input);
		const helper = path.pop();
		if (helper === "prefetch") {
			const args1 = args[1];
			return getQueryClient().prefetchQuery((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, args1), {}, {
				queryKey: require_getQueryKey.getQueryKeyInternal(path, input, "query"),
				queryFn: () => promise
			}));
		}
		if (helper === "prefetchInfinite") {
			var _args1$initialCursor;
			const args1 = args[1];
			return getQueryClient().prefetchInfiniteQuery((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, args1), {}, {
				queryKey: require_getQueryKey.getQueryKeyInternal(path, input, "infinite"),
				queryFn: () => promise,
				initialPageParam: (_args1$initialCursor = args1 === null || args1 === void 0 ? void 0 : args1.initialCursor) !== null && _args1$initialCursor !== void 0 ? _args1$initialCursor : null
			}));
		}
		return promise;
	});
	function HydrateClient(props) {
		const dehydratedState = (0, __tanstack_react_query.dehydrate)(getQueryClient());
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__tanstack_react_query.HydrationBoundary, {
			state: dehydratedState,
			children: props.children
		});
	}
	return {
		trpc: wrappedProxy,
		HydrateClient
	};
}

//#endregion
exports.createHydrationHelpers = createHydrationHelpers;