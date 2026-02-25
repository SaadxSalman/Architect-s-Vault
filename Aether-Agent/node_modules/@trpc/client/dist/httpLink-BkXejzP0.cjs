const require_chunk = require('./chunk-DWy1uDak.cjs');
const require_objectSpread2$1 = require('./objectSpread2-Bsvh_OqM.cjs');
const require_TRPCClientError = require('./TRPCClientError-Dey88Uiy.cjs');
const require_httpUtils = require('./httpUtils-CjSUiDDG.cjs');
const __trpc_server_observable = require_chunk.__toESM(require("@trpc/server/observable"));
const __trpc_server_unstable_core_do_not_import = require_chunk.__toESM(require("@trpc/server/unstable-core-do-not-import"));

//#region src/links/internals/contentTypes.ts
function isOctetType(input) {
	return input instanceof Uint8Array || input instanceof Blob;
}
function isFormData(input) {
	return input instanceof FormData;
}
function isNonJsonSerializable(input) {
	return isOctetType(input) || isFormData(input);
}

//#endregion
//#region src/links/httpLink.ts
var import_objectSpread2 = require_chunk.__toESM(require_objectSpread2$1.require_objectSpread2(), 1);
const universalRequester = (opts) => {
	if ("input" in opts) {
		const { input } = opts;
		if (isFormData(input)) {
			if (opts.type !== "mutation" && opts.methodOverride !== "POST") throw new Error("FormData is only supported for mutations");
			return require_httpUtils.httpRequest((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, opts), {}, {
				contentTypeHeader: void 0,
				getUrl: require_httpUtils.getUrl,
				getBody: () => input
			}));
		}
		if (isOctetType(input)) {
			if (opts.type !== "mutation" && opts.methodOverride !== "POST") throw new Error("Octet type input is only supported for mutations");
			return require_httpUtils.httpRequest((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, opts), {}, {
				contentTypeHeader: "application/octet-stream",
				getUrl: require_httpUtils.getUrl,
				getBody: () => input
			}));
		}
	}
	return require_httpUtils.jsonHttpRequester(opts);
};
/**
* @see https://trpc.io/docs/client/links/httpLink
*/
function httpLink(opts) {
	const resolvedOpts = require_httpUtils.resolveHTTPLinkOptions(opts);
	return () => {
		return (operationOpts) => {
			const { op } = operationOpts;
			return (0, __trpc_server_observable.observable)((observer) => {
				const { path, input, type } = op;
				/* istanbul ignore if -- @preserve */
				if (type === "subscription") throw new Error("Subscriptions are unsupported by `httpLink` - use `httpSubscriptionLink` or `wsLink`");
				const request = universalRequester((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, resolvedOpts), {}, {
					type,
					path,
					input,
					signal: op.signal,
					headers() {
						if (!opts.headers) return {};
						if (typeof opts.headers === "function") return opts.headers({ op });
						return opts.headers;
					}
				}));
				let meta = void 0;
				request.then((res) => {
					meta = res.meta;
					const transformed = (0, __trpc_server_unstable_core_do_not_import.transformResult)(res.json, resolvedOpts.transformer.output);
					if (!transformed.ok) {
						observer.error(require_TRPCClientError.TRPCClientError.from(transformed.error, { meta }));
						return;
					}
					observer.next({
						context: res.meta,
						result: transformed.result
					});
					observer.complete();
				}).catch((cause) => {
					observer.error(require_TRPCClientError.TRPCClientError.from(cause, { meta }));
				});
				return () => {};
			});
		};
	};
}

//#endregion
Object.defineProperty(exports, 'httpLink', {
  enumerable: true,
  get: function () {
    return httpLink;
  }
});
Object.defineProperty(exports, 'isFormData', {
  enumerable: true,
  get: function () {
    return isFormData;
  }
});
Object.defineProperty(exports, 'isNonJsonSerializable', {
  enumerable: true,
  get: function () {
    return isNonJsonSerializable;
  }
});
Object.defineProperty(exports, 'isOctetType', {
  enumerable: true,
  get: function () {
    return isOctetType;
  }
});