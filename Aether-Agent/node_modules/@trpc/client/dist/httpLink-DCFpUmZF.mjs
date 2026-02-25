import { __toESM, require_objectSpread2 } from "./objectSpread2-BvkFp-_Y.mjs";
import { TRPCClientError } from "./TRPCClientError-CjKyS10w.mjs";
import { getUrl, httpRequest, jsonHttpRequester, resolveHTTPLinkOptions } from "./httpUtils-Dv57hbOd.mjs";
import { observable } from "@trpc/server/observable";
import { transformResult } from "@trpc/server/unstable-core-do-not-import";

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
var import_objectSpread2 = __toESM(require_objectSpread2(), 1);
const universalRequester = (opts) => {
	if ("input" in opts) {
		const { input } = opts;
		if (isFormData(input)) {
			if (opts.type !== "mutation" && opts.methodOverride !== "POST") throw new Error("FormData is only supported for mutations");
			return httpRequest((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, opts), {}, {
				contentTypeHeader: void 0,
				getUrl,
				getBody: () => input
			}));
		}
		if (isOctetType(input)) {
			if (opts.type !== "mutation" && opts.methodOverride !== "POST") throw new Error("Octet type input is only supported for mutations");
			return httpRequest((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, opts), {}, {
				contentTypeHeader: "application/octet-stream",
				getUrl,
				getBody: () => input
			}));
		}
	}
	return jsonHttpRequester(opts);
};
/**
* @see https://trpc.io/docs/client/links/httpLink
*/
function httpLink(opts) {
	const resolvedOpts = resolveHTTPLinkOptions(opts);
	return () => {
		return (operationOpts) => {
			const { op } = operationOpts;
			return observable((observer) => {
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
					const transformed = transformResult(res.json, resolvedOpts.transformer.output);
					if (!transformed.ok) {
						observer.error(TRPCClientError.from(transformed.error, { meta }));
						return;
					}
					observer.next({
						context: res.meta,
						result: transformed.result
					});
					observer.complete();
				}).catch((cause) => {
					observer.error(TRPCClientError.from(cause, { meta }));
				});
				return () => {};
			});
		};
	};
}

//#endregion
export { httpLink, isFormData, isNonJsonSerializable, isOctetType };
//# sourceMappingURL=httpLink-DCFpUmZF.mjs.map