import { __commonJS, __toESM, require_defineProperty, require_objectSpread2 } from "./getErrorShape-vC8mUXJD.mjs";
import { isObject, mergeWithoutOverrides } from "./codes-DagpWZLc.mjs";
import { TRPCError, createCallerFactory, createRouterFactory, defaultFormatter, defaultTransformer, getDataTransformer, getTRPCErrorFromUnknown, mergeRouters } from "./tracked-D4V22yc5.mjs";

//#region src/unstable-core-do-not-import/middleware.ts
var import_objectSpread2$2 = __toESM(require_objectSpread2(), 1);
/** @internal */
const middlewareMarker = "middlewareMarker";
/**
* @internal
*/
function createMiddlewareFactory() {
	function createMiddlewareInner(middlewares) {
		return {
			_middlewares: middlewares,
			unstable_pipe(middlewareBuilderOrFn) {
				const pipedMiddleware = "_middlewares" in middlewareBuilderOrFn ? middlewareBuilderOrFn._middlewares : [middlewareBuilderOrFn];
				return createMiddlewareInner([...middlewares, ...pipedMiddleware]);
			}
		};
	}
	function createMiddleware(fn) {
		return createMiddlewareInner([fn]);
	}
	return createMiddleware;
}
/**
* Create a standalone middleware
* @see https://trpc.io/docs/v11/server/middlewares#experimental-standalone-middlewares
* @deprecated use `.concat()` instead
*/
const experimental_standaloneMiddleware = () => ({ create: createMiddlewareFactory() });
/**
* @internal
* Please note, `trpc-openapi` uses this function.
*/
function createInputMiddleware(parse) {
	const inputMiddleware = async function inputValidatorMiddleware(opts) {
		let parsedInput;
		const rawInput = await opts.getRawInput();
		try {
			parsedInput = await parse(rawInput);
		} catch (cause) {
			throw new TRPCError({
				code: "BAD_REQUEST",
				cause
			});
		}
		const combinedInput = isObject(opts.input) && isObject(parsedInput) ? (0, import_objectSpread2$2.default)((0, import_objectSpread2$2.default)({}, opts.input), parsedInput) : parsedInput;
		return opts.next({ input: combinedInput });
	};
	inputMiddleware._type = "input";
	return inputMiddleware;
}
/**
* @internal
*/
function createOutputMiddleware(parse) {
	const outputMiddleware = async function outputValidatorMiddleware({ next }) {
		const result = await next();
		if (!result.ok) return result;
		try {
			const data = await parse(result.data);
			return (0, import_objectSpread2$2.default)((0, import_objectSpread2$2.default)({}, result), {}, { data });
		} catch (cause) {
			throw new TRPCError({
				message: "Output validation failed",
				code: "INTERNAL_SERVER_ERROR",
				cause
			});
		}
	};
	outputMiddleware._type = "output";
	return outputMiddleware;
}

//#endregion
//#region src/vendor/standard-schema-v1/error.ts
var import_defineProperty = __toESM(require_defineProperty(), 1);
/** A schema error with useful information. */
var StandardSchemaV1Error = class extends Error {
	/**
	* Creates a schema error with useful information.
	*
	* @param issues The schema issues.
	*/
	constructor(issues) {
		var _issues$;
		super((_issues$ = issues[0]) === null || _issues$ === void 0 ? void 0 : _issues$.message);
		(0, import_defineProperty.default)(this, "issues", void 0);
		this.name = "SchemaError";
		this.issues = issues;
	}
};

//#endregion
//#region src/unstable-core-do-not-import/parser.ts
function getParseFn(procedureParser) {
	const parser = procedureParser;
	const isStandardSchema = "~standard" in parser;
	if (typeof parser === "function" && typeof parser.assert === "function") return parser.assert.bind(parser);
	if (typeof parser === "function" && !isStandardSchema) return parser;
	if (typeof parser.parseAsync === "function") return parser.parseAsync.bind(parser);
	if (typeof parser.parse === "function") return parser.parse.bind(parser);
	if (typeof parser.validateSync === "function") return parser.validateSync.bind(parser);
	if (typeof parser.create === "function") return parser.create.bind(parser);
	if (typeof parser.assert === "function") return (value) => {
		parser.assert(value);
		return value;
	};
	if (isStandardSchema) return async (value) => {
		const result = await parser["~standard"].validate(value);
		if (result.issues) throw new StandardSchemaV1Error(result.issues);
		return result.value;
	};
	throw new Error("Could not find a validator fn");
}

//#endregion
//#region ../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectWithoutPropertiesLoose.js
var require_objectWithoutPropertiesLoose = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectWithoutPropertiesLoose.js"(exports, module) {
	function _objectWithoutPropertiesLoose(r, e) {
		if (null == r) return {};
		var t = {};
		for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
			if (e.includes(n)) continue;
			t[n] = r[n];
		}
		return t;
	}
	module.exports = _objectWithoutPropertiesLoose, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });

//#endregion
//#region ../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectWithoutProperties.js
var require_objectWithoutProperties = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectWithoutProperties.js"(exports, module) {
	var objectWithoutPropertiesLoose = require_objectWithoutPropertiesLoose();
	function _objectWithoutProperties$1(e, t) {
		if (null == e) return {};
		var o, r, i = objectWithoutPropertiesLoose(e, t);
		if (Object.getOwnPropertySymbols) {
			var s = Object.getOwnPropertySymbols(e);
			for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
		}
		return i;
	}
	module.exports = _objectWithoutProperties$1, module.exports.__esModule = true, module.exports["default"] = module.exports;
} });

//#endregion
//#region src/unstable-core-do-not-import/procedureBuilder.ts
var import_objectWithoutProperties = __toESM(require_objectWithoutProperties(), 1);
var import_objectSpread2$1 = __toESM(require_objectSpread2(), 1);
const _excluded = [
	"middlewares",
	"inputs",
	"meta"
];
function createNewBuilder(def1, def2) {
	const { middlewares = [], inputs, meta } = def2, rest = (0, import_objectWithoutProperties.default)(def2, _excluded);
	return createBuilder((0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, mergeWithoutOverrides(def1, rest)), {}, {
		inputs: [...def1.inputs, ...inputs !== null && inputs !== void 0 ? inputs : []],
		middlewares: [...def1.middlewares, ...middlewares],
		meta: def1.meta && meta ? (0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, def1.meta), meta) : meta !== null && meta !== void 0 ? meta : def1.meta
	}));
}
function createBuilder(initDef = {}) {
	const _def = (0, import_objectSpread2$1.default)({
		procedure: true,
		inputs: [],
		middlewares: []
	}, initDef);
	const builder = {
		_def,
		input(input) {
			const parser = getParseFn(input);
			return createNewBuilder(_def, {
				inputs: [input],
				middlewares: [createInputMiddleware(parser)]
			});
		},
		output(output) {
			const parser = getParseFn(output);
			return createNewBuilder(_def, {
				output,
				middlewares: [createOutputMiddleware(parser)]
			});
		},
		meta(meta) {
			return createNewBuilder(_def, { meta });
		},
		use(middlewareBuilderOrFn) {
			const middlewares = "_middlewares" in middlewareBuilderOrFn ? middlewareBuilderOrFn._middlewares : [middlewareBuilderOrFn];
			return createNewBuilder(_def, { middlewares });
		},
		unstable_concat(builder$1) {
			return createNewBuilder(_def, builder$1._def);
		},
		concat(builder$1) {
			return createNewBuilder(_def, builder$1._def);
		},
		query(resolver) {
			return createResolver((0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, _def), {}, { type: "query" }), resolver);
		},
		mutation(resolver) {
			return createResolver((0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, _def), {}, { type: "mutation" }), resolver);
		},
		subscription(resolver) {
			return createResolver((0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, _def), {}, { type: "subscription" }), resolver);
		},
		experimental_caller(caller) {
			return createNewBuilder(_def, { caller });
		}
	};
	return builder;
}
function createResolver(_defIn, resolver) {
	const finalBuilder = createNewBuilder(_defIn, {
		resolver,
		middlewares: [async function resolveMiddleware(opts) {
			const data = await resolver(opts);
			return {
				marker: middlewareMarker,
				ok: true,
				data,
				ctx: opts.ctx
			};
		}]
	});
	const _def = (0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, finalBuilder._def), {}, {
		type: _defIn.type,
		experimental_caller: Boolean(finalBuilder._def.caller),
		meta: finalBuilder._def.meta,
		$types: null
	});
	const invoke = createProcedureCaller(finalBuilder._def);
	const callerOverride = finalBuilder._def.caller;
	if (!callerOverride) return invoke;
	const callerWrapper = async (...args) => {
		return await callerOverride({
			args,
			invoke,
			_def
		});
	};
	callerWrapper._def = _def;
	return callerWrapper;
}
const codeblock = `
This is a client-only function.
If you want to call this function on the server, see https://trpc.io/docs/v11/server/server-side-calls
`.trim();
async function callRecursive(index, _def, opts) {
	try {
		const middleware = _def.middlewares[index];
		const result = await middleware((0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, opts), {}, {
			meta: _def.meta,
			input: opts.input,
			next(_nextOpts) {
				var _nextOpts$getRawInput;
				const nextOpts = _nextOpts;
				return callRecursive(index + 1, _def, (0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, opts), {}, {
					ctx: (nextOpts === null || nextOpts === void 0 ? void 0 : nextOpts.ctx) ? (0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, opts.ctx), nextOpts.ctx) : opts.ctx,
					input: nextOpts && "input" in nextOpts ? nextOpts.input : opts.input,
					getRawInput: (_nextOpts$getRawInput = nextOpts === null || nextOpts === void 0 ? void 0 : nextOpts.getRawInput) !== null && _nextOpts$getRawInput !== void 0 ? _nextOpts$getRawInput : opts.getRawInput
				}));
			}
		}));
		return result;
	} catch (cause) {
		return {
			ok: false,
			error: getTRPCErrorFromUnknown(cause),
			marker: middlewareMarker
		};
	}
}
function createProcedureCaller(_def) {
	async function procedure(opts) {
		if (!opts || !("getRawInput" in opts)) throw new Error(codeblock);
		const result = await callRecursive(0, _def, opts);
		if (!result) throw new TRPCError({
			code: "INTERNAL_SERVER_ERROR",
			message: "No result from middlewares - did you forget to `return next()`?"
		});
		if (!result.ok) throw result.error;
		return result.data;
	}
	procedure._def = _def;
	procedure.procedure = true;
	procedure.meta = _def.meta;
	return procedure;
}

//#endregion
//#region src/unstable-core-do-not-import/rootConfig.ts
var _globalThis$process, _globalThis$process2, _globalThis$process3;
/**
* The default check to see if we're in a server
*/
const isServerDefault = typeof window === "undefined" || "Deno" in window || ((_globalThis$process = globalThis.process) === null || _globalThis$process === void 0 || (_globalThis$process = _globalThis$process.env) === null || _globalThis$process === void 0 ? void 0 : _globalThis$process["NODE_ENV"]) === "test" || !!((_globalThis$process2 = globalThis.process) === null || _globalThis$process2 === void 0 || (_globalThis$process2 = _globalThis$process2.env) === null || _globalThis$process2 === void 0 ? void 0 : _globalThis$process2["JEST_WORKER_ID"]) || !!((_globalThis$process3 = globalThis.process) === null || _globalThis$process3 === void 0 || (_globalThis$process3 = _globalThis$process3.env) === null || _globalThis$process3 === void 0 ? void 0 : _globalThis$process3["VITEST_WORKER_ID"]);

//#endregion
//#region src/unstable-core-do-not-import/initTRPC.ts
var import_objectSpread2 = __toESM(require_objectSpread2(), 1);
var TRPCBuilder = class TRPCBuilder {
	/**
	* Add a context shape as a generic to the root object
	* @see https://trpc.io/docs/v11/server/context
	*/
	context() {
		return new TRPCBuilder();
	}
	/**
	* Add a meta shape as a generic to the root object
	* @see https://trpc.io/docs/v11/quickstart
	*/
	meta() {
		return new TRPCBuilder();
	}
	/**
	* Create the root object
	* @see https://trpc.io/docs/v11/server/routers#initialize-trpc
	*/
	create(opts) {
		var _opts$transformer, _opts$isDev, _globalThis$process$1, _opts$allowOutsideOfS, _opts$errorFormatter, _opts$isServer;
		const config = (0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, opts), {}, {
			transformer: getDataTransformer((_opts$transformer = opts === null || opts === void 0 ? void 0 : opts.transformer) !== null && _opts$transformer !== void 0 ? _opts$transformer : defaultTransformer),
			isDev: (_opts$isDev = opts === null || opts === void 0 ? void 0 : opts.isDev) !== null && _opts$isDev !== void 0 ? _opts$isDev : ((_globalThis$process$1 = globalThis.process) === null || _globalThis$process$1 === void 0 ? void 0 : _globalThis$process$1.env["NODE_ENV"]) !== "production",
			allowOutsideOfServer: (_opts$allowOutsideOfS = opts === null || opts === void 0 ? void 0 : opts.allowOutsideOfServer) !== null && _opts$allowOutsideOfS !== void 0 ? _opts$allowOutsideOfS : false,
			errorFormatter: (_opts$errorFormatter = opts === null || opts === void 0 ? void 0 : opts.errorFormatter) !== null && _opts$errorFormatter !== void 0 ? _opts$errorFormatter : defaultFormatter,
			isServer: (_opts$isServer = opts === null || opts === void 0 ? void 0 : opts.isServer) !== null && _opts$isServer !== void 0 ? _opts$isServer : isServerDefault,
			$types: null
		});
		{
			var _opts$isServer2;
			const isServer = (_opts$isServer2 = opts === null || opts === void 0 ? void 0 : opts.isServer) !== null && _opts$isServer2 !== void 0 ? _opts$isServer2 : isServerDefault;
			if (!isServer && (opts === null || opts === void 0 ? void 0 : opts.allowOutsideOfServer) !== true) throw new Error(`You're trying to use @trpc/server in a non-server environment. This is not supported by default.`);
		}
		return {
			_config: config,
			procedure: createBuilder({ meta: opts === null || opts === void 0 ? void 0 : opts.defaultMeta }),
			middleware: createMiddlewareFactory(),
			router: createRouterFactory(config),
			mergeRouters,
			createCallerFactory: createCallerFactory()
		};
	}
};
/**
* Builder to initialize the tRPC root object - use this exactly once per backend
* @see https://trpc.io/docs/v11/quickstart
*/
const initTRPC = new TRPCBuilder();

//#endregion
export { StandardSchemaV1Error, createBuilder, createInputMiddleware, createMiddlewareFactory, createOutputMiddleware, experimental_standaloneMiddleware, getParseFn, initTRPC, isServerDefault, middlewareMarker };
//# sourceMappingURL=initTRPC-T5bbc89W.mjs.map