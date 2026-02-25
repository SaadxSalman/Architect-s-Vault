const require_getQueryKey = require('./getQueryKey-PyKLS56S.cjs');
const require_shared = require('./shared-Dt4RsQVp.cjs');
const __trpc_server_unstable_core_do_not_import = require_getQueryKey.__toESM(require("@trpc/server/unstable-core-do-not-import"));
const react = require_getQueryKey.__toESM(require("react"));

//#region src/createTRPCReact.tsx
/**
* @internal
*/
function createHooksInternal(trpc) {
	const proxy = require_shared.createReactDecoration(trpc);
	return (0, __trpc_server_unstable_core_do_not_import.createFlatProxy)((key) => {
		if (key === "useContext" || key === "useUtils") return () => {
			const context = trpc.useUtils();
			return react.useMemo(() => {
				return require_shared.createReactQueryUtils(context);
			}, [context]);
		};
		if (trpc.hasOwnProperty(key)) return trpc[key];
		return proxy[key];
	});
}
function createTRPCReact(opts) {
	const hooks = require_shared.createRootHooks(opts);
	const proxy = createHooksInternal(hooks);
	return proxy;
}

//#endregion
//#region src/createTRPCQueryUtils.tsx
function createTRPCQueryUtils(opts) {
	const utils = require_shared.createUtilityFunctions(opts);
	return require_shared.createQueryUtilsProxy(utils);
}

//#endregion
exports.createTRPCQueryUtils = createTRPCQueryUtils;
exports.createTRPCReact = createTRPCReact;
exports.getMutationKey = require_getQueryKey.getMutationKey;
exports.getQueryKey = require_getQueryKey.getQueryKey;
var __trpc_client = require("@trpc/client");
Object.keys(__trpc_client).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return __trpc_client[k]; }
  });
});
