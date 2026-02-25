const require_getErrorShape = require('../../getErrorShape-MR4DZeb7.cjs');
require('../../codes-BfZsPdy-.cjs');
require('../../tracked-D4WGA_Z-.cjs');
require('../../parseTRPCMessage-7Ltmq-Fb.cjs');
const require_resolveResponse = require('../../resolveResponse-ByfQ6olt.cjs');
require('../../contentTypeParsers-iAFF_pJG.cjs');
require('../../unstable-core-do-not-import-fsjhEhgh.cjs');
require('../../observable-B1Nk6r1H.cjs');
require('../../initTRPC--HrEu8sH.cjs');
require('../../http-DXy3XyhL.cjs');
const require_node_http = require('../../node-http-D0T_XJ9C.cjs');
require('../../observable-BVzLuBs6.cjs');
const require_ws = require('../../ws-B16sko8C.cjs');

//#region src/adapters/fastify/fastifyRequestHandler.ts
var import_objectSpread2$1 = require_getErrorShape.__toESM(require_getErrorShape.require_objectSpread2(), 1);
async function fastifyRequestHandler(opts) {
	const createContext = async (innerOpts) => {
		var _opts$createContext;
		return await ((_opts$createContext = opts.createContext) === null || _opts$createContext === void 0 ? void 0 : _opts$createContext.call(opts, (0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, opts), innerOpts)));
	};
	const incomingMessage = opts.req.raw;
	if ("body" in opts.req) incomingMessage.body = opts.req.body;
	const req = require_node_http.incomingMessageToRequest(incomingMessage, opts.res.raw, { maxBodySize: null });
	const res = await require_resolveResponse.resolveResponse((0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, opts), {}, {
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
var import_objectSpread2 = require_getErrorShape.__toESM(require_getErrorShape.require_objectSpread2(), 1);
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
		const onConnection = require_ws.getWSConnectionHandler((0, import_objectSpread2.default)({}, trpcOptions));
		fastify.get((_prefix = prefix) !== null && _prefix !== void 0 ? _prefix : "/", { websocket: true }, (socket, req) => {
			var _trpcOptions$keepAliv;
			onConnection(socket, req.raw);
			if (trpcOptions === null || trpcOptions === void 0 || (_trpcOptions$keepAliv = trpcOptions.keepAlive) === null || _trpcOptions$keepAliv === void 0 ? void 0 : _trpcOptions$keepAliv.enabled) {
				const { pingMs, pongWaitMs } = trpcOptions.keepAlive;
				require_ws.handleKeepAlive(socket, pingMs, pongWaitMs);
			}
		});
	}
	done();
}

//#endregion
exports.fastifyRequestHandler = fastifyRequestHandler;
exports.fastifyTRPCPlugin = fastifyTRPCPlugin;