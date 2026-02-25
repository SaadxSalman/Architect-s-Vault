import { __toESM, require_objectSpread2 } from "../getErrorShape-BH60iMC2.mjs";
import "../tracked-DBSMdVzR.mjs";
import { run } from "../utils-CLZnJdb_.mjs";
import "../parseTRPCMessage-BlZeZ60t.mjs";
import "../resolveResponse-D7zvnoIM.mjs";
import "../contentTypeParsers-SN4WL9ze.mjs";
import "../unstable-core-do-not-import-DQoYSXto.mjs";
import "../observable-UMO3vUa_.mjs";
import "../initTRPC-DGaJyg8t.mjs";
import { createURL, internal_exceptionHandler, nodeHTTPRequestHandler } from "../node-http-Cd7-CwtL.mjs";
import http from "http";

//#region src/adapters/standalone.ts
var import_objectSpread2 = __toESM(require_objectSpread2(), 1);
function createHandler(opts) {
	var _opts$basePath;
	const basePath = (_opts$basePath = opts.basePath) !== null && _opts$basePath !== void 0 ? _opts$basePath : "/";
	const sliceLength = basePath.length;
	return (req, res) => {
		let path = "";
		run(async () => {
			const url = createURL(req);
			path = url.pathname.slice(sliceLength);
			await nodeHTTPRequestHandler((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, opts), {}, {
				req,
				res,
				path
			}));
		}).catch(internal_exceptionHandler((0, import_objectSpread2.default)({
			req,
			res,
			path
		}, opts)));
	};
}
/**
* @internal
*/
function createHTTPHandler(opts) {
	return createHandler(opts);
}
function createHTTPServer(opts) {
	return http.createServer(createHTTPHandler(opts));
}
function createHTTP2Handler(opts) {
	return createHandler(opts);
}

//#endregion
export { createHTTP2Handler, createHTTPHandler, createHTTPServer };
//# sourceMappingURL=standalone.mjs.map