import { __toESM, require_objectSpread2 } from "../getErrorShape-BH60iMC2.mjs";
import "../tracked-DBSMdVzR.mjs";
import { run } from "../utils-CLZnJdb_.mjs";
import "../parseTRPCMessage-BlZeZ60t.mjs";
import "../resolveResponse-D7zvnoIM.mjs";
import "../contentTypeParsers-SN4WL9ze.mjs";
import "../unstable-core-do-not-import-DQoYSXto.mjs";
import "../observable-UMO3vUa_.mjs";
import "../initTRPC-DGaJyg8t.mjs";
import { internal_exceptionHandler, nodeHTTPRequestHandler } from "../node-http-Cd7-CwtL.mjs";

//#region src/adapters/express.ts
var import_objectSpread2 = __toESM(require_objectSpread2(), 1);
function createExpressMiddleware(opts) {
	return (req, res) => {
		let path = "";
		run(async () => {
			path = req.path.slice(req.path.lastIndexOf("/") + 1);
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

//#endregion
export { createExpressMiddleware };
//# sourceMappingURL=express.mjs.map