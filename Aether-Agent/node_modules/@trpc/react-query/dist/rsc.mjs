import { __toESM, getQueryKeyInternal, require_objectSpread2 } from "./getQueryKey-BY58RNzP.mjs";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { createRecursiveProxy } from "@trpc/server/unstable-core-do-not-import";
import "react";
import { jsx } from "react/jsx-runtime";

//#region src/rsc.tsx
var import_objectSpread2 = __toESM(require_objectSpread2());
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
	const wrappedProxy = createRecursiveProxy(async (opts) => {
		const path = [...opts.path];
		const args = [...opts.args];
		const proc = path.reduce((acc, key) => HELPERS.includes(key) ? acc : acc[key], caller);
		const input = args[0];
		const promise = proc(input);
		const helper = path.pop();
		if (helper === "prefetch") {
			const args1 = args[1];
			return getQueryClient().prefetchQuery((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, args1), {}, {
				queryKey: getQueryKeyInternal(path, input, "query"),
				queryFn: () => promise
			}));
		}
		if (helper === "prefetchInfinite") {
			var _args1$initialCursor;
			const args1 = args[1];
			return getQueryClient().prefetchInfiniteQuery((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, args1), {}, {
				queryKey: getQueryKeyInternal(path, input, "infinite"),
				queryFn: () => promise,
				initialPageParam: (_args1$initialCursor = args1 === null || args1 === void 0 ? void 0 : args1.initialCursor) !== null && _args1$initialCursor !== void 0 ? _args1$initialCursor : null
			}));
		}
		return promise;
	});
	function HydrateClient(props) {
		const dehydratedState = dehydrate(getQueryClient());
		return /* @__PURE__ */ jsx(HydrationBoundary, {
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
export { createHydrationHelpers };
//# sourceMappingURL=rsc.mjs.map