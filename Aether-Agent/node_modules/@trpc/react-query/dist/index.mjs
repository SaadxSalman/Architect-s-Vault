import { getMutationKey, getQueryKey } from "./getQueryKey-BY58RNzP.mjs";
import { createQueryUtilsProxy, createReactDecoration, createReactQueryUtils, createRootHooks, createUtilityFunctions } from "./shared-JtnEvJvB.mjs";
import { createFlatProxy } from "@trpc/server/unstable-core-do-not-import";
import * as React from "react";

export * from "@trpc/client"

//#region src/createTRPCReact.tsx
/**
* @internal
*/
function createHooksInternal(trpc) {
	const proxy = createReactDecoration(trpc);
	return createFlatProxy((key) => {
		if (key === "useContext" || key === "useUtils") return () => {
			const context = trpc.useUtils();
			return React.useMemo(() => {
				return createReactQueryUtils(context);
			}, [context]);
		};
		if (trpc.hasOwnProperty(key)) return trpc[key];
		return proxy[key];
	});
}
function createTRPCReact(opts) {
	const hooks = createRootHooks(opts);
	const proxy = createHooksInternal(hooks);
	return proxy;
}

//#endregion
//#region src/createTRPCQueryUtils.tsx
function createTRPCQueryUtils(opts) {
	const utils = createUtilityFunctions(opts);
	return createQueryUtilsProxy(utils);
}

//#endregion
export { createTRPCQueryUtils, createTRPCReact, getMutationKey, getQueryKey };
//# sourceMappingURL=index.mjs.map