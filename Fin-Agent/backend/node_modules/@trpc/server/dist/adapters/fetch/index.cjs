const require_getErrorShape = require('../../getErrorShape-MR4DZeb7.cjs');
require('../../codes-BfZsPdy-.cjs');
require('../../tracked-D4WGA_Z-.cjs');
const require_resolveResponse = require('../../resolveResponse-ByfQ6olt.cjs');
require('../../observable-B1Nk6r1H.cjs');

//#region src/adapters/fetch/fetchRequestHandler.ts
var import_objectSpread2 = require_getErrorShape.__toESM(require_getErrorShape.require_objectSpread2(), 1);
const trimSlashes = (path) => {
	path = path.startsWith("/") ? path.slice(1) : path;
	path = path.endsWith("/") ? path.slice(0, -1) : path;
	return path;
};
async function fetchRequestHandler(opts) {
	const resHeaders = new Headers();
	const createContext = async (innerOpts) => {
		var _opts$createContext;
		return (_opts$createContext = opts.createContext) === null || _opts$createContext === void 0 ? void 0 : _opts$createContext.call(opts, (0, import_objectSpread2.default)({
			req: opts.req,
			resHeaders
		}, innerOpts));
	};
	const url = new URL(opts.req.url);
	const pathname = trimSlashes(url.pathname);
	const endpoint = trimSlashes(opts.endpoint);
	const path = trimSlashes(pathname.slice(endpoint.length));
	return await require_resolveResponse.resolveResponse((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, opts), {}, {
		req: opts.req,
		createContext,
		path,
		error: null,
		onError(o) {
			var _opts$onError;
			opts === null || opts === void 0 || (_opts$onError = opts.onError) === null || _opts$onError === void 0 || _opts$onError.call(opts, (0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, o), {}, { req: opts.req }));
		},
		responseMeta(data) {
			var _opts$responseMeta;
			const meta = (_opts$responseMeta = opts.responseMeta) === null || _opts$responseMeta === void 0 ? void 0 : _opts$responseMeta.call(opts, data);
			if (meta === null || meta === void 0 ? void 0 : meta.headers) {
				if (meta.headers instanceof Headers) for (const [key, value] of meta.headers.entries()) resHeaders.append(key, value);
				else
 /**
				* @deprecated, delete in v12
				*/
				for (const [key, value] of Object.entries(meta.headers)) if (Array.isArray(value)) for (const v of value) resHeaders.append(key, v);
				else if (typeof value === "string") resHeaders.set(key, value);
			}
			return {
				headers: resHeaders,
				status: meta === null || meta === void 0 ? void 0 : meta.status
			};
		}
	}));
}

//#endregion
exports.fetchRequestHandler = fetchRequestHandler;