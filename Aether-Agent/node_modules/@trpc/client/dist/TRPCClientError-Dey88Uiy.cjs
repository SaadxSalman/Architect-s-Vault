const require_chunk = require('./chunk-DWy1uDak.cjs');
const require_objectSpread2$1 = require('./objectSpread2-Bsvh_OqM.cjs');
const __trpc_server_unstable_core_do_not_import = require_chunk.__toESM(require("@trpc/server/unstable-core-do-not-import"));

//#region src/TRPCClientError.ts
var import_defineProperty = require_chunk.__toESM(require_objectSpread2$1.require_defineProperty(), 1);
var import_objectSpread2 = require_chunk.__toESM(require_objectSpread2$1.require_objectSpread2(), 1);
function isTRPCClientError(cause) {
	return cause instanceof TRPCClientError;
}
function isTRPCErrorResponse(obj) {
	return (0, __trpc_server_unstable_core_do_not_import.isObject)(obj) && (0, __trpc_server_unstable_core_do_not_import.isObject)(obj["error"]) && typeof obj["error"]["code"] === "number" && typeof obj["error"]["message"] === "string";
}
function getMessageFromUnknownError(err, fallback) {
	if (typeof err === "string") return err;
	if ((0, __trpc_server_unstable_core_do_not_import.isObject)(err) && typeof err["message"] === "string") return err["message"];
	return fallback;
}
var TRPCClientError = class TRPCClientError extends Error {
	constructor(message, opts) {
		var _opts$result, _opts$result2;
		const cause = opts === null || opts === void 0 ? void 0 : opts.cause;
		super(message, { cause });
		(0, import_defineProperty.default)(this, "cause", void 0);
		(0, import_defineProperty.default)(this, "shape", void 0);
		(0, import_defineProperty.default)(this, "data", void 0);
		(0, import_defineProperty.default)(this, "meta", void 0);
		this.meta = opts === null || opts === void 0 ? void 0 : opts.meta;
		this.cause = cause;
		this.shape = opts === null || opts === void 0 || (_opts$result = opts.result) === null || _opts$result === void 0 ? void 0 : _opts$result.error;
		this.data = opts === null || opts === void 0 || (_opts$result2 = opts.result) === null || _opts$result2 === void 0 ? void 0 : _opts$result2.error.data;
		this.name = "TRPCClientError";
		Object.setPrototypeOf(this, TRPCClientError.prototype);
	}
	static from(_cause, opts = {}) {
		const cause = _cause;
		if (isTRPCClientError(cause)) {
			if (opts.meta) cause.meta = (0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, cause.meta), opts.meta);
			return cause;
		}
		if (isTRPCErrorResponse(cause)) return new TRPCClientError(cause.error.message, (0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, opts), {}, { result: cause }));
		return new TRPCClientError(getMessageFromUnknownError(cause, "Unknown error"), (0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, opts), {}, { cause }));
	}
};

//#endregion
Object.defineProperty(exports, 'TRPCClientError', {
  enumerable: true,
  get: function () {
    return TRPCClientError;
  }
});
Object.defineProperty(exports, 'isTRPCClientError', {
  enumerable: true,
  get: function () {
    return isTRPCClientError;
  }
});