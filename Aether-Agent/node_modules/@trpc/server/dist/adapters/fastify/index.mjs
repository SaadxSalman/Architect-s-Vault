import { __toESM, require_objectSpread2 } from "../../getErrorShape-vC8mUXJD.mjs";
import "../../codes-DagpWZLc.mjs";
import "../../tracked-D4V22yc5.mjs";
import "../../parseTRPCMessage-CTow-umk.mjs";
import { resolveResponse } from "../../resolveResponse-C7AcnFLN.mjs";
import "../../contentTypeParsers-SN4WL9ze.mjs";
import "../../unstable-core-do-not-import-9NNw8uQM.mjs";
import "../../observable-UMO3vUa_.mjs";
import "../../initTRPC-T5bbc89W.mjs";
import "../../http-CWyjOa1l.mjs";
import { incomingMessageToRequest } from "../../node-http-pD5xpNfK.mjs";
import "../../observable-CUiPknO-.mjs";
import { getWSConnectionHandler, handleKeepAlive } from "../../ws-Dl6Y2YNA.mjs";

//#region src/adapters/fastify/fastifyRequestHandler.ts
var import_objectSpread2$1 = __toESM(require_objectSpread2(), 1);
async function fastifyRequestHandler(opts) {
	const createContext = async (innerOpts) => {
		var _opts$createContext;
		return await ((_opts$createContext = opts.createContext) === null || _opts$createContext === void 0 ? void 0 : _opts$createContext.call(opts, (0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, opts), innerOpts)));
	};
	const incomingMessage = opts.req.raw;
	if ("body" in opts.req) incomingMessage.body = opts.req.body;
	const req = incomingMessageToRequest(incomingMessage, opts.res.raw, { maxBodySize: null });
	const res = await resolveResponse((0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, opts), {}, {
		req,
		error: null,
		createContext,
		onError(o) {
			var _opts$onError;
			opts === null || opts === void 0 || (_opts$onError = opts.onError) === null || _opts$onError === void 0 || _opts$onError.call(opts, (0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, o), {}, { req: opts.req }));
		}
	}));
	await opts.res.send(res);
}

//#endregion
//#region src/adapters/fastify/fastifyTRPCPlugin.ts
var import_objectSpread2 = __toESM(require_objectSpread2(), 1);
function fastifyTRPCPlugin(fastify, opts, done) {
	var _opts$prefix;
	fastify.removeContentTypeParser("application/json");
	fastify.addContentTypeParser("application/json", { parseAs: "string" }, function(_, body, _done) {
		_done(null, body);
	});
	fastify.removeContentTypeParser("multipart/form-data");
	fastify.addContentTypeParser("multipart/form-data", {}, function(_, body, _done) {
		_done(null, body);
	});
	let prefix = (_opts$prefix = opts.prefix) !== null && _opts$prefix !== void 0 ? _opts$prefix : "";
	if (typeof fastifyTRPCPlugin.default !== "function") prefix = "";
	fastify.all(`${prefix}/:path`, async (req, res) => {
		const path = req.params.path;
		await fastifyRequestHandler((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, opts.trpcOptions), {}, {
			req,
			res,
			path
		}));
	});
	if (opts.useWSS) {
		var _prefix;
		const trpcOptions = opts.trpcOptions;
		const onConnection = getWSConnectionHandler((0, import_objectSpread2.default)({}, trpcOptions));
		fastify.get((_prefix = prefix) !== null && _prefix !== void 0 ? _prefix : "/", { websocket: true }, (socket, req) => {
			var _trpcOptions$keepAliv;
			onConnection(socket, req.raw);
			if (trpcOptions === null || trpcOptions === void 0 || (_trpcOptions$keepAliv = trpcOptions.keepAlive) === null || _trpcOptions$keepAliv === void 0 ? void 0 : _trpcOptions$keepAliv.enabled) {
				const { pingMs, pongWaitMs } = trpcOptions.keepAlive;
				handleKeepAlive(socket, pingMs, pongWaitMs);
			}
		});
	}
	done();
}

//#endregion
export { fastifyRequestHandler, fastifyTRPCPlugin };
//# sourceMappingURL=index.mjs.map