const require_chunk = require('./chunk-DWy1uDak.cjs');
const require_objectSpread2$1 = require('./objectSpread2-Bsvh_OqM.cjs');
const __trpc_server_observable = require_chunk.__toESM(require("@trpc/server/observable"));

//#region src/links/loggerLink.ts
var import_objectSpread2 = require_chunk.__toESM(require_objectSpread2$1.require_objectSpread2(), 1);
function isFormData(value) {
	if (typeof FormData === "undefined") return false;
	return value instanceof FormData;
}
const palettes = {
	css: {
		query: ["72e3ff", "3fb0d8"],
		mutation: ["c5a3fc", "904dfc"],
		subscription: ["ff49e1", "d83fbe"]
	},
	ansi: {
		regular: {
			query: ["\x1B[30;46m", "\x1B[97;46m"],
			mutation: ["\x1B[30;45m", "\x1B[97;45m"],
			subscription: ["\x1B[30;42m", "\x1B[97;42m"]
		},
		bold: {
			query: ["\x1B[1;30;46m", "\x1B[1;97;46m"],
			mutation: ["\x1B[1;30;45m", "\x1B[1;97;45m"],
			subscription: ["\x1B[1;30;42m", "\x1B[1;97;42m"]
		}
	}
};
function constructPartsAndArgs(opts) {
	const { direction, type, withContext, path, id, input } = opts;
	const parts = [];
	const args = [];
	if (opts.colorMode === "none") parts.push(direction === "up" ? ">>" : "<<", type, `#${id}`, path);
	else if (opts.colorMode === "ansi") {
		const [lightRegular, darkRegular] = palettes.ansi.regular[type];
		const [lightBold, darkBold] = palettes.ansi.bold[type];
		const reset = "\x1B[0m";
		parts.push(direction === "up" ? lightRegular : darkRegular, direction === "up" ? ">>" : "<<", type, direction === "up" ? lightBold : darkBold, `#${id}`, path, reset);
	} else {
		const [light, dark] = palettes.css[type];
		const css = `
    background-color: #${direction === "up" ? light : dark};
    color: ${direction === "up" ? "black" : "white"};
    padding: 2px;
  `;
		parts.push("%c", direction === "up" ? ">>" : "<<", type, `#${id}`, `%c${path}%c`, "%O");
		args.push(css, `${css}; font-weight: bold;`, `${css}; font-weight: normal;`);
	}
	if (direction === "up") args.push(withContext ? {
		input,
		context: opts.context
	} : { input });
	else args.push((0, import_objectSpread2.default)({
		input,
		result: opts.result,
		elapsedMs: opts.elapsedMs
	}, withContext && { context: opts.context }));
	return {
		parts,
		args
	};
}
const defaultLogger = ({ c = console, colorMode = "css", withContext }) => (props) => {
	const rawInput = props.input;
	const input = isFormData(rawInput) ? Object.fromEntries(rawInput) : rawInput;
	const { parts, args } = constructPartsAndArgs((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, props), {}, {
		colorMode,
		input,
		withContext
	}));
	const fn = props.direction === "down" && props.result && (props.result instanceof Error || "error" in props.result.result && props.result.result.error) ? "error" : "log";
	c[fn].apply(null, [parts.join(" ")].concat(args));
};
/**
* @see https://trpc.io/docs/v11/client/links/loggerLink
*/
function loggerLink(opts = {}) {
	var _opts$colorMode, _opts$withContext;
	const { enabled = () => true } = opts;
	const colorMode = (_opts$colorMode = opts.colorMode) !== null && _opts$colorMode !== void 0 ? _opts$colorMode : typeof window === "undefined" ? "ansi" : "css";
	const withContext = (_opts$withContext = opts.withContext) !== null && _opts$withContext !== void 0 ? _opts$withContext : colorMode === "css";
	const { logger = defaultLogger({
		c: opts.console,
		colorMode,
		withContext
	}) } = opts;
	return () => {
		return ({ op, next }) => {
			return (0, __trpc_server_observable.observable)((observer) => {
				if (enabled((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, op), {}, { direction: "up" }))) logger((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, op), {}, { direction: "up" }));
				const requestStartTime = Date.now();
				function logResult(result) {
					const elapsedMs = Date.now() - requestStartTime;
					if (enabled((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, op), {}, {
						direction: "down",
						result
					}))) logger((0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, op), {}, {
						direction: "down",
						elapsedMs,
						result
					}));
				}
				return next(op).pipe((0, __trpc_server_observable.tap)({
					next(result) {
						logResult(result);
					},
					error(result) {
						logResult(result);
					}
				})).subscribe(observer);
			});
		};
	};
}

//#endregion
Object.defineProperty(exports, 'loggerLink', {
  enumerable: true,
  get: function () {
    return loggerLink;
  }
});