import { isObject } from "./codes-DagpWZLc.mjs";

//#region src/unstable-core-do-not-import/procedure.ts
const procedureTypes = [
	"query",
	"mutation",
	"subscription"
];

//#endregion
//#region src/unstable-core-do-not-import/rpc/parseTRPCMessage.ts
/* istanbul ignore next -- @preserve */
function assertIsObject(obj) {
	if (!isObject(obj)) throw new Error("Not an object");
}
/* istanbul ignore next -- @preserve */
function assertIsProcedureType(obj) {
	if (!procedureTypes.includes(obj)) throw new Error("Invalid procedure type");
}
/* istanbul ignore next -- @preserve */
function assertIsRequestId(obj) {
	if (obj !== null && typeof obj === "number" && isNaN(obj) && typeof obj !== "string") throw new Error("Invalid request id");
}
/* istanbul ignore next -- @preserve */
function assertIsString(obj) {
	if (typeof obj !== "string") throw new Error("Invalid string");
}
/* istanbul ignore next -- @preserve */
function assertIsJSONRPC2OrUndefined(obj) {
	if (typeof obj !== "undefined" && obj !== "2.0") throw new Error("Must be JSONRPC 2.0");
}
/** @public */
function parseTRPCMessage(obj, transformer) {
	assertIsObject(obj);
	const { id, jsonrpc, method, params } = obj;
	assertIsRequestId(id);
	assertIsJSONRPC2OrUndefined(jsonrpc);
	if (method === "subscription.stop") return {
		id,
		jsonrpc,
		method
	};
	assertIsProcedureType(method);
	assertIsObject(params);
	const { input: rawInput, path, lastEventId } = params;
	assertIsString(path);
	if (lastEventId !== void 0) assertIsString(lastEventId);
	const input = transformer.input.deserialize(rawInput);
	return {
		id,
		jsonrpc,
		method,
		params: {
			input,
			path,
			lastEventId
		}
	};
}

//#endregion
export { parseTRPCMessage, procedureTypes };
//# sourceMappingURL=parseTRPCMessage-CTow-umk.mjs.map