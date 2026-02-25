const require_getErrorShape = require('../getErrorShape-MR4DZeb7.cjs');
const require_codes = require('../codes-BfZsPdy-.cjs');
const require_tracked = require('../tracked-D4WGA_Z-.cjs');
require('../parseTRPCMessage-7Ltmq-Fb.cjs');
require('../resolveResponse-ByfQ6olt.cjs');
require('../contentTypeParsers-iAFF_pJG.cjs');
require('../unstable-core-do-not-import-fsjhEhgh.cjs');
require('../observable-B1Nk6r1H.cjs');
require('../initTRPC--HrEu8sH.cjs');
const require_node_http = require('../node-http-D0T_XJ9C.cjs');

//#region src/adapters/next.ts
var import_objectSpread2 = require_getErrorShape.__toESM(require_getErrorShape.require_objectSpread2(), 1);
function createNextApiHandler(opts) {
	return async (req, res) => {
		let path = "";
		await require_codes.run(async () => {
			path = require_codes.run(() => {
				if (typeof req.query["trpc"] === "string") return req.query["trpc"];
				if (Array.isArray(req.query["trpc"])) return req.query["trpc"].join("/");
				throw new require_tracked.TRPCError({
					message: "Query \"trpc\" not found - is the file named `[trpc]`.ts or `[...trpc].ts`?",
					code: "INTERNAL_SERVER_ERROR"
				});
			});
			await require_node_http.nodeHTTPRequestHandler((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, opts), {}, {
				req,
				res,
				path
			}));
		}).catch(require_node_http.internal_exceptionHandler((0, import_objectSpread2.default)({
			req,
			res,
			path
		}, opts)));
	};
}

//#endregion
exports.createNextApiHandler = createNextApiHandler;