import { Observable, inferObservableValue } from "./index.d-D4qZxQJh.mjs";

//#region src/unstable-core-do-not-import/types.d.ts

/**
 * ================================
 * Useful utility types that doesn't have anything to do with tRPC in particular
 * ================================
 */
/**
 * @public
 */
type Maybe<TType> = TType | null | undefined;
/**
 * @internal
 * @see https://github.com/ianstormtaylor/superstruct/blob/7973400cd04d8ad92bbdc2b6f35acbfb3c934079/src/utils.ts#L323-L325
 */
type Simplify<TType> = TType extends any[] | Date ? TType : { [K in keyof TType]: TType[K] };
/**
 * @public
 */
type Dict<TType> = Record<string, TType | undefined>;
/**
 * @public
 */
type MaybePromise<TType> = Promise<TType> | TType;
type FilterKeys<TObj extends object, TFilter> = { [TKey in keyof TObj]: TObj[TKey] extends TFilter ? TKey : never }[keyof TObj];
/**
 * @internal
 */
type Result$1<TType, TErr = unknown> = {
  ok: true;
  value: TType;
} | {
  ok: false;
  error: TErr;
};
/**
 * @internal
 */
type Filter<TObj extends object, TFilter> = Pick<TObj, FilterKeys<TObj, TFilter>>;
/**
 * Unwrap return type if the type is a function (sync or async), else use the type as is
 * @internal
 */
type Unwrap<TType> = TType extends ((...args: any[]) => infer R) ? Awaited<R> : TType;
/**
 * Makes the object recursively optional
 * @internal
 */
type DeepPartial<TObject> = TObject extends object ? { [P in keyof TObject]?: DeepPartial<TObject[P]> } : TObject;
/**
 * Omits the key without removing a potential union
 * @internal
 */
type DistributiveOmit<TObj, TKey extends keyof any> = TObj extends any ? Omit<TObj, TKey> : never;
/**
 * See https://github.com/microsoft/TypeScript/issues/41966#issuecomment-758187996
 * Fixes issues with iterating over keys of objects with index signatures.
 * Without this, iterations over keys of objects with index signatures will lose
 * type information about the keys and only the index signature will remain.
 * @internal
 */
type WithoutIndexSignature<TObj> = { [K in keyof TObj as string extends K ? never : number extends K ? never : K]: TObj[K] };
/**
 * @internal
 * Overwrite properties in `TType` with properties in `TWith`
 * Only overwrites properties when the type to be overwritten
 * is an object. Otherwise it will just use the type from `TWith`.
 */
type Overwrite<TType, TWith> = TWith extends any ? TType extends object ? { [K in keyof WithoutIndexSignature<TType> | keyof WithoutIndexSignature<TWith>]: K extends keyof TWith ? TWith[K] : K extends keyof TType ? TType[K] : never } & (string extends keyof TWith ? {
  [key: string]: TWith[string];
} : number extends keyof TWith ? {
  [key: number]: TWith[number];
} : {}) : TWith : never;
/**
 * @internal
 */
type ValidateShape<TActualShape, TExpectedShape> = TActualShape extends TExpectedShape ? Exclude<keyof TActualShape, keyof TExpectedShape> extends never ? TActualShape : TExpectedShape : never;
/**
 * @internal
 */
type PickFirstDefined<TType, TPick> = undefined extends TType ? undefined extends TPick ? never : TPick : TType;
type KeyFromValue<TValue, TType extends Record<PropertyKey, PropertyKey>> = { [K in keyof TType]: TValue extends TType[K] ? K : never }[keyof TType];
type InvertKeyValue<TType extends Record<PropertyKey, PropertyKey>> = { [TValue in TType[keyof TType]]: KeyFromValue<TValue, TType> };
/**
 * ================================
 * tRPC specific types
 * ================================
 */
/**
 * @internal
 */
type IntersectionError<TKey extends string> = `The property '${TKey}' in your router collides with a built-in method, rename this router or procedure on your backend.`;
/**
 * @internal
 */
type ProtectedIntersection<TType, TWith> = keyof TType & keyof TWith extends never ? TType & TWith : IntersectionError<string & keyof TType & keyof TWith>;
/**
 * @internal
 * Returns the raw input type of a procedure
 */
type GetRawInputFn = () => Promise<unknown>;
declare const _errorSymbol: unique symbol;
type ErrorSymbol = typeof _errorSymbol;
type TypeError<TMessage extends string> = TMessage & {
  _: typeof _errorSymbol;
};
type ValueOf<TObj> = TObj[keyof TObj];
type coerceAsyncIterableToArray<TValue> = TValue extends AsyncIterable<infer $Inferred> ? $Inferred[] : TValue;
/**
 * @internal
 * Infers the type of the value yielded by an async iterable
 */
type inferAsyncIterableYield<T> = T extends AsyncIterable<infer U> ? U : T;
//#endregion
//#region src/unstable-core-do-not-import/rpc/codes.d.ts
/**
 * JSON-RPC 2.0 Error codes
 *
 * `-32000` to `-32099` are reserved for implementation-defined server-errors.
 * For tRPC we're copying the last digits of HTTP 4XX errors.
 */
declare const TRPC_ERROR_CODES_BY_KEY: {
  /**
   * Invalid JSON was received by the server.
   * An error occurred on the server while parsing the JSON text.
   */
  readonly PARSE_ERROR: -32700;
  /**
   * The JSON sent is not a valid Request object.
   */
  readonly BAD_REQUEST: -32600;
  readonly INTERNAL_SERVER_ERROR: -32603;
  readonly NOT_IMPLEMENTED: -32603;
  readonly BAD_GATEWAY: -32603;
  readonly SERVICE_UNAVAILABLE: -32603;
  readonly GATEWAY_TIMEOUT: -32603;
  readonly UNAUTHORIZED: -32001;
  readonly PAYMENT_REQUIRED: -32002;
  readonly FORBIDDEN: -32003;
  readonly NOT_FOUND: -32004;
  readonly METHOD_NOT_SUPPORTED: -32005;
  readonly TIMEOUT: -32008;
  readonly CONFLICT: -32009;
  readonly PRECONDITION_FAILED: -32012;
  readonly PAYLOAD_TOO_LARGE: -32013;
  readonly UNSUPPORTED_MEDIA_TYPE: -32015;
  readonly UNPROCESSABLE_CONTENT: -32022;
  readonly PRECONDITION_REQUIRED: -32028;
  readonly TOO_MANY_REQUESTS: -32029;
  readonly CLIENT_CLOSED_REQUEST: -32099;
};
declare const TRPC_ERROR_CODES_BY_NUMBER: InvertKeyValue<typeof TRPC_ERROR_CODES_BY_KEY>;
type TRPC_ERROR_CODE_NUMBER = ValueOf<typeof TRPC_ERROR_CODES_BY_KEY>;
type TRPC_ERROR_CODE_KEY = keyof typeof TRPC_ERROR_CODES_BY_KEY;
/**
 * tRPC error codes that are considered retryable
 * With out of the box SSE, the client will reconnect when these errors are encountered
 */
declare const retryableRpcCodes: TRPC_ERROR_CODE_NUMBER[];
//# sourceMappingURL=codes.d.ts.map
//#endregion
//#region src/unstable-core-do-not-import/error/TRPCError.d.ts
declare function getCauseFromUnknown(cause: unknown): Error | undefined;
declare function getTRPCErrorFromUnknown(cause: unknown): TRPCError;
declare class TRPCError extends Error {
  readonly cause?: Error;
  readonly code: "PARSE_ERROR" | "BAD_REQUEST" | "INTERNAL_SERVER_ERROR" | "NOT_IMPLEMENTED" | "BAD_GATEWAY" | "SERVICE_UNAVAILABLE" | "GATEWAY_TIMEOUT" | "UNAUTHORIZED" | "PAYMENT_REQUIRED" | "FORBIDDEN" | "NOT_FOUND" | "METHOD_NOT_SUPPORTED" | "TIMEOUT" | "CONFLICT" | "PRECONDITION_FAILED" | "PAYLOAD_TOO_LARGE" | "UNSUPPORTED_MEDIA_TYPE" | "UNPROCESSABLE_CONTENT" | "PRECONDITION_REQUIRED" | "TOO_MANY_REQUESTS" | "CLIENT_CLOSED_REQUEST";
  constructor(opts: {
    message?: string;
    code: TRPC_ERROR_CODE_KEY;
    cause?: unknown;
  });
}
//# sourceMappingURL=TRPCError.d.ts.map
//#endregion
//#region src/vendor/standard-schema-v1/spec.d.ts
/**
 *
 * @see https://github.com/standard-schema/standard-schema/blob/main/packages/spec/src/index.ts
 */
/** The Standard Schema interface. */
interface StandardSchemaV1<Input = unknown, Output = Input> {
  /** The Standard Schema properties. */
  readonly '~standard': StandardSchemaV1.Props<Input, Output>;
}
declare namespace StandardSchemaV1 {
  /** The Standard Schema properties interface. */
  interface Props<Input = unknown, Output = Input> {
    /** The version number of the standard. */
    readonly version: 1;
    /** The vendor name of the schema library. */
    readonly vendor: string;
    /** Validates unknown input values. */
    readonly validate: (value: unknown) => Result<Output> | Promise<Result<Output>>;
    /** Inferred types associated with the schema. */
    readonly types?: Types<Input, Output> | undefined;
  }
  /** The result interface of the validate function. */
  type Result<Output> = SuccessResult<Output> | FailureResult;
  /** The result interface if validation succeeds. */
  interface SuccessResult<Output> {
    /** The typed output value. */
    readonly value: Output;
    /** The non-existent issues. */
    readonly issues?: undefined;
  }
  /** The result interface if validation fails. */
  interface FailureResult {
    /** The issues of failed validation. */
    readonly issues: ReadonlyArray<Issue>;
  }
  /** The issue interface of the failure output. */
  interface Issue {
    /** The error message of the issue. */
    readonly message: string;
    /** The path of the issue, if any. */
    readonly path?: ReadonlyArray<PropertyKey | PathSegment> | undefined;
  }
  /** The path segment interface of the issue. */
  interface PathSegment {
    /** The key representing a path segment. */
    readonly key: PropertyKey;
  }
  /** The Standard Schema types interface. */
  interface Types<Input = unknown, Output = Input> {
    /** The input type of the schema. */
    readonly input: Input;
    /** The output type of the schema. */
    readonly output: Output;
  }
  /** Infers the input type of a Standard Schema. */
  type InferInput<Schema extends StandardSchemaV1> = NonNullable<Schema['~standard']['types']>['input'];
  /** Infers the output type of a Standard Schema. */
  type InferOutput<Schema extends StandardSchemaV1> = NonNullable<Schema['~standard']['types']>['output'];
}
//# sourceMappingURL=spec.d.ts.map
//#endregion
//#region src/unstable-core-do-not-import/parser.d.ts
type ParserZodEsque<TInput, TParsedInput> = {
  _input: TInput;
  _output: TParsedInput;
};
type ParserValibotEsque<TInput, TParsedInput> = {
  schema: {
    _types?: {
      input: TInput;
      output: TParsedInput;
    };
  };
};
type ParserArkTypeEsque<TInput, TParsedInput> = {
  inferIn: TInput;
  infer: TParsedInput;
};
type ParserStandardSchemaEsque<TInput, TParsedInput> = StandardSchemaV1<TInput, TParsedInput>;
type ParserMyZodEsque<TInput> = {
  parse: (input: any) => TInput;
};
type ParserSuperstructEsque<TInput> = {
  create: (input: unknown) => TInput;
};
type ParserCustomValidatorEsque<TInput> = (input: unknown) => Promise<TInput> | TInput;
type ParserYupEsque<TInput> = {
  validateSync: (input: unknown) => TInput;
};
type ParserScaleEsque<TInput> = {
  assert(value: unknown): asserts value is TInput;
};
type ParserWithoutInput<TInput> = ParserCustomValidatorEsque<TInput> | ParserMyZodEsque<TInput> | ParserScaleEsque<TInput> | ParserSuperstructEsque<TInput> | ParserYupEsque<TInput>;
type ParserWithInputOutput<TInput, TParsedInput> = ParserZodEsque<TInput, TParsedInput> | ParserValibotEsque<TInput, TParsedInput> | ParserArkTypeEsque<TInput, TParsedInput> | ParserStandardSchemaEsque<TInput, TParsedInput>;
type Parser = ParserWithInputOutput<any, any> | ParserWithoutInput<any>;
type inferParser<TParser extends Parser> = TParser extends ParserStandardSchemaEsque<infer $TIn, infer $TOut> ? {
  in: $TIn;
  out: $TOut;
} : TParser extends ParserWithInputOutput<infer $TIn, infer $TOut> ? {
  in: $TIn;
  out: $TOut;
} : TParser extends ParserWithoutInput<infer $InOut> ? {
  in: $InOut;
  out: $InOut;
} : never;
type ParseFn<TType> = (value: unknown) => Promise<TType> | TType;
declare function getParseFn<TType>(procedureParser: Parser): ParseFn<TType>;
//# sourceMappingURL=parser.d.ts.map
//#endregion
//#region src/unstable-core-do-not-import/middleware.d.ts
/** @internal */
declare const middlewareMarker: "middlewareMarker" & {
  __brand: "middlewareMarker";
};
type MiddlewareMarker = typeof middlewareMarker;
interface MiddlewareResultBase {
  /**
   * All middlewares should pass through their `next()`'s output.
   * Requiring this marker makes sure that can't be forgotten at compile-time.
   */
  readonly marker: MiddlewareMarker;
}
interface MiddlewareOKResult<_TContextOverride> extends MiddlewareResultBase {
  ok: true;
  data: unknown;
}
interface MiddlewareErrorResult<_TContextOverride> extends MiddlewareResultBase {
  ok: false;
  error: TRPCError;
}
/**
 * @internal
 */
type MiddlewareResult<_TContextOverride> = MiddlewareErrorResult<_TContextOverride> | MiddlewareOKResult<_TContextOverride>;
/**
 * @internal
 */
interface MiddlewareBuilder<TContext, TMeta, TContextOverrides, TInputOut> {
  /**
   * Create a new builder based on the current middleware builder
   */
  unstable_pipe<$ContextOverridesOut>(fn: MiddlewareFunction<TContext, TMeta, TContextOverrides, $ContextOverridesOut, TInputOut> | MiddlewareBuilder<Overwrite<TContext, TContextOverrides>, TMeta, $ContextOverridesOut, TInputOut>): MiddlewareBuilder<TContext, TMeta, Overwrite<TContextOverrides, $ContextOverridesOut>, TInputOut>;
  /**
   * List of middlewares within this middleware builder
   */
  _middlewares: MiddlewareFunction<TContext, TMeta, TContextOverrides, object, TInputOut>[];
}
/**
 * @internal
 */
type MiddlewareFunction<TContext, TMeta, TContextOverridesIn, $ContextOverridesOut, TInputOut> = {
  (opts: {
    ctx: Simplify<Overwrite<TContext, TContextOverridesIn>>;
    type: ProcedureType;
    path: string;
    input: TInputOut;
    getRawInput: GetRawInputFn;
    meta: TMeta | undefined;
    signal: AbortSignal | undefined;
    next: {
      (): Promise<MiddlewareResult<TContextOverridesIn>>;
      <$ContextOverride>(opts: {
        ctx?: $ContextOverride;
        input?: unknown;
      }): Promise<MiddlewareResult<$ContextOverride>>;
      (opts: {
        getRawInput: GetRawInputFn;
      }): Promise<MiddlewareResult<TContextOverridesIn>>;
    };
  }): Promise<MiddlewareResult<$ContextOverridesOut>>;
  _type?: string | undefined;
};
type AnyMiddlewareFunction = MiddlewareFunction<any, any, any, any, any>;
type AnyMiddlewareBuilder = MiddlewareBuilder<any, any, any, any>;
/**
 * @internal
 */
declare function createMiddlewareFactory<TContext, TMeta, TInputOut = unknown>(): <$ContextOverrides>(fn: MiddlewareFunction<TContext, TMeta, object, $ContextOverrides, TInputOut>) => MiddlewareBuilder<TContext, TMeta, $ContextOverrides, TInputOut>;
/**
 * Create a standalone middleware
 * @see https://trpc.io/docs/v11/server/middlewares#experimental-standalone-middlewares
 * @deprecated use `.concat()` instead
 */
declare const experimental_standaloneMiddleware: <TCtx extends {
  ctx?: object;
  meta?: object;
  input?: unknown;
}>() => {
  create: <$ContextOverrides>(fn: MiddlewareFunction<TCtx extends {
    ctx: infer T extends object;
  } ? T : any, TCtx extends {
    meta: infer T_1 extends object;
  } ? T_1 : object, object, $ContextOverrides, TCtx extends {
    input: infer T_2;
  } ? T_2 : unknown>) => MiddlewareBuilder<TCtx extends {
    ctx: infer T extends object;
  } ? T : any, TCtx extends {
    meta: infer T_1 extends object;
  } ? T_1 : object, $ContextOverrides, TCtx extends {
    input: infer T_2;
  } ? T_2 : unknown>;
};
/**
 * @internal
 * Please note, `trpc-openapi` uses this function.
 */
declare function createInputMiddleware<TInput>(parse: ParseFn<TInput>): AnyMiddlewareFunction;
/**
 * @internal
 */
declare function createOutputMiddleware<TOutput>(parse: ParseFn<TOutput>): AnyMiddlewareFunction;
//#endregion
//#region src/unstable-core-do-not-import/stream/tracked.d.ts
declare const trackedSymbol: unique symbol;
type TrackedId = string & {
  __brand: 'TrackedId';
};
type TrackedEnvelope<TData> = [TrackedId, TData, typeof trackedSymbol];
interface TrackedData<TData> {
  /**
   * The id of the message to keep track of in case the connection gets lost
   */
  id: string;
  /**
   * The data field of the message
   */
  data: TData;
}
/**
 * Produce a typed server-sent event message
 * @deprecated use `tracked(id, data)` instead
 */
declare function sse<TData>(event: {
  id: string;
  data: TData;
}): TrackedEnvelope<TData>;
declare function isTrackedEnvelope<TData>(value: unknown): value is TrackedEnvelope<TData>;
/**
 * Automatically track an event so that it can be resumed from a given id if the connection is lost
 */
declare function tracked<TData>(id: string, data: TData): TrackedEnvelope<TData>;
type inferTrackedOutput<TData> = TData extends TrackedEnvelope<infer $Data> ? TrackedData<$Data> : TData;
//#endregion
//#region src/unstable-core-do-not-import/utils.d.ts
/** @internal */
type UnsetMarker = 'unsetMarker' & {
  __brand: 'unsetMarker';
};
/**
 * Ensures there are no duplicate keys when building a procedure.
 * @internal
 */
declare function mergeWithoutOverrides<TType extends Record<string, unknown>>(obj1: TType, ...objs: Partial<TType>[]): TType;
/**
 * Check that value is object
 * @internal
 */
declare function isObject(value: unknown): value is Record<string, unknown>;
type AnyFn = ((...args: any[]) => unknown) & Record<keyof any, unknown>;
declare function isFunction(fn: unknown): fn is AnyFn;
/**
 * Create an object without inheriting anything from `Object.prototype`
 * @internal
 */
declare function emptyObject<TObj extends Record<string, unknown>>(): TObj;
declare function isAsyncIterable<TValue>(value: unknown): value is AsyncIterable<TValue>;
/**
 * Run an IIFE
 */
declare const run: <TValue>(fn: () => TValue) => TValue;
declare function noop(): void;
declare function identity<T>(it: T): T;
/**
 * Generic runtime assertion function. Throws, if the condition is not `true`.
 *
 * Can be used as a slightly less dangerous variant of type assertions. Code
 * mistakes would be revealed at runtime then (hopefully during testing).
 */
declare function assert(condition: boolean, msg?: string): asserts condition;
declare function sleep(ms?: number): Promise<void>;
/**
 * Ponyfill for
 * [`AbortSignal.any`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/any_static).
 */
declare function abortSignalsAnyPonyfill(signals: AbortSignal[]): AbortSignal;
//#endregion
//#region src/unstable-core-do-not-import/procedureBuilder.d.ts
type IntersectIfDefined<TType, TWith> = TType extends UnsetMarker ? TWith : TWith extends UnsetMarker ? TType : Simplify<TType & TWith>;
type DefaultValue<TValue, TFallback> = TValue extends UnsetMarker ? TFallback : TValue;
type inferAsyncIterable<TOutput> = TOutput extends AsyncIterable<infer $Yield, infer $Return, infer $Next> ? {
  yield: $Yield;
  return: $Return;
  next: $Next;
} : never;
type inferSubscriptionOutput<TOutput> = TOutput extends AsyncIterable<any> ? AsyncIterable<inferTrackedOutput<inferAsyncIterable<TOutput>['yield']>, inferAsyncIterable<TOutput>['return'], inferAsyncIterable<TOutput>['next']> : TypeError<'Subscription output could not be inferred'>;
type CallerOverride<TContext> = (opts: {
  args: unknown[];
  invoke: (opts: ProcedureCallOptions<TContext>) => Promise<unknown>;
  _def: AnyProcedure['_def'];
}) => Promise<unknown>;
type ProcedureBuilderDef<TMeta> = {
  procedure: true;
  inputs: Parser[];
  output?: Parser;
  meta?: TMeta;
  resolver?: ProcedureBuilderResolver;
  middlewares: AnyMiddlewareFunction[];
  /**
   * @deprecated use `type` instead
   */
  mutation?: boolean;
  /**
   * @deprecated use `type` instead
   */
  query?: boolean;
  /**
   * @deprecated use `type` instead
   */
  subscription?: boolean;
  type?: ProcedureType;
  caller?: CallerOverride<unknown>;
};
type AnyProcedureBuilderDef = ProcedureBuilderDef<any>;
/**
 * Procedure resolver options (what the `.query()`, `.mutation()`, and `.subscription()` functions receive)
 * @internal
 */
interface ProcedureResolverOptions<TContext, _TMeta, TContextOverridesIn, TInputOut> {
  ctx: Simplify<Overwrite<TContext, TContextOverridesIn>>;
  input: TInputOut extends UnsetMarker ? undefined : TInputOut;
  /**
   * The AbortSignal of the request
   */
  signal: AbortSignal | undefined;
  /**
   * The path of the procedure
   */
  path: string;
}
/**
 * A procedure resolver
 */
type ProcedureResolver<TContext, TMeta, TContextOverrides, TInputOut, TOutputParserIn, $Output> = (opts: ProcedureResolverOptions<TContext, TMeta, TContextOverrides, TInputOut>) => MaybePromise<DefaultValue<TOutputParserIn, $Output>>;
type AnyProcedureBuilder = ProcedureBuilder<any, any, any, any, any, any, any, any>;
/**
 * Infer the context type from a procedure builder
 * Useful to create common helper functions for different procedures
 */
type inferProcedureBuilderResolverOptions<TProcedureBuilder extends AnyProcedureBuilder> = TProcedureBuilder extends ProcedureBuilder<infer TContext, infer TMeta, infer TContextOverrides, infer _TInputIn, infer TInputOut, infer _TOutputIn, infer _TOutputOut, infer _TCaller> ? ProcedureResolverOptions<TContext, TMeta, TContextOverrides, TInputOut extends UnsetMarker ? unknown : TInputOut extends object ? Simplify<TInputOut & {
  /**
   * Extra input params might have been added by a `.input()` further down the chain
   */
  [keyAddedByInputCallFurtherDown: string]: unknown;
}> : TInputOut> : never;
interface ProcedureBuilder<TContext, TMeta, TContextOverrides, TInputIn, TInputOut, TOutputIn, TOutputOut, TCaller extends boolean> {
  /**
   * Add an input parser to the procedure.
   * @see https://trpc.io/docs/v11/server/validators
   */
  input<$Parser extends Parser>(schema: TInputOut extends UnsetMarker ? $Parser : inferParser<$Parser>['out'] extends Record<string, unknown> | undefined ? TInputOut extends Record<string, unknown> | undefined ? undefined extends inferParser<$Parser>['out'] ? undefined extends TInputOut ? $Parser : TypeError<'Cannot chain an optional parser to a required parser'> : $Parser : TypeError<'All input parsers did not resolve to an object'> : TypeError<'All input parsers did not resolve to an object'>): ProcedureBuilder<TContext, TMeta, TContextOverrides, IntersectIfDefined<TInputIn, inferParser<$Parser>['in']>, IntersectIfDefined<TInputOut, inferParser<$Parser>['out']>, TOutputIn, TOutputOut, TCaller>;
  /**
   * Add an output parser to the procedure.
   * @see https://trpc.io/docs/v11/server/validators
   */
  output<$Parser extends Parser>(schema: $Parser): ProcedureBuilder<TContext, TMeta, TContextOverrides, TInputIn, TInputOut, IntersectIfDefined<TOutputIn, inferParser<$Parser>['in']>, IntersectIfDefined<TOutputOut, inferParser<$Parser>['out']>, TCaller>;
  /**
   * Add a meta data to the procedure.
   * @see https://trpc.io/docs/v11/server/metadata
   */
  meta(meta: TMeta): ProcedureBuilder<TContext, TMeta, TContextOverrides, TInputIn, TInputOut, TOutputIn, TOutputOut, TCaller>;
  /**
   * Add a middleware to the procedure.
   * @see https://trpc.io/docs/v11/server/middlewares
   */
  use<$ContextOverridesOut>(fn: MiddlewareBuilder<Overwrite<TContext, TContextOverrides>, TMeta, $ContextOverridesOut, TInputOut> | MiddlewareFunction<TContext, TMeta, TContextOverrides, $ContextOverridesOut, TInputOut>): ProcedureBuilder<TContext, TMeta, Overwrite<TContextOverrides, $ContextOverridesOut>, TInputIn, TInputOut, TOutputIn, TOutputOut, TCaller>;
  /**
   * @deprecated use {@link concat} instead
   */
  unstable_concat<$Context, $Meta, $ContextOverrides, $InputIn, $InputOut, $OutputIn, $OutputOut>(builder: Overwrite<TContext, TContextOverrides> extends $Context ? TMeta extends $Meta ? ProcedureBuilder<$Context, $Meta, $ContextOverrides, $InputIn, $InputOut, $OutputIn, $OutputOut, TCaller> : TypeError<'Meta mismatch'> : TypeError<'Context mismatch'>): ProcedureBuilder<TContext, TMeta, Overwrite<TContextOverrides, $ContextOverrides>, IntersectIfDefined<TInputIn, $InputIn>, IntersectIfDefined<TInputOut, $InputOut>, IntersectIfDefined<TOutputIn, $OutputIn>, IntersectIfDefined<TOutputOut, $OutputOut>, TCaller>;
  /**
   * Combine two procedure builders
   */
  concat<$Context, $Meta, $ContextOverrides, $InputIn, $InputOut, $OutputIn, $OutputOut>(builder: Overwrite<TContext, TContextOverrides> extends $Context ? TMeta extends $Meta ? ProcedureBuilder<$Context, $Meta, $ContextOverrides, $InputIn, $InputOut, $OutputIn, $OutputOut, TCaller> : TypeError<'Meta mismatch'> : TypeError<'Context mismatch'>): ProcedureBuilder<TContext, TMeta, Overwrite<TContextOverrides, $ContextOverrides>, IntersectIfDefined<TInputIn, $InputIn>, IntersectIfDefined<TInputOut, $InputOut>, IntersectIfDefined<TOutputIn, $OutputIn>, IntersectIfDefined<TOutputOut, $OutputOut>, TCaller>;
  /**
   * Query procedure
   * @see https://trpc.io/docs/v11/concepts#vocabulary
   */
  query<$Output>(resolver: ProcedureResolver<TContext, TMeta, TContextOverrides, TInputOut, TOutputIn, $Output>): TCaller extends true ? (input: DefaultValue<TInputIn, void>) => Promise<DefaultValue<TOutputOut, $Output>> : QueryProcedure<{
    input: DefaultValue<TInputIn, void>;
    output: DefaultValue<TOutputOut, $Output>;
    meta: TMeta;
  }>;
  /**
   * Mutation procedure
   * @see https://trpc.io/docs/v11/concepts#vocabulary
   */
  mutation<$Output>(resolver: ProcedureResolver<TContext, TMeta, TContextOverrides, TInputOut, TOutputIn, $Output>): TCaller extends true ? (input: DefaultValue<TInputIn, void>) => Promise<DefaultValue<TOutputOut, $Output>> : MutationProcedure<{
    input: DefaultValue<TInputIn, void>;
    output: DefaultValue<TOutputOut, $Output>;
    meta: TMeta;
  }>;
  /**
   * Subscription procedure
   * @see https://trpc.io/docs/v11/server/subscriptions
   */
  subscription<$Output extends AsyncIterable<any, void, any>>(resolver: ProcedureResolver<TContext, TMeta, TContextOverrides, TInputOut, TOutputIn, $Output>): TCaller extends true ? TypeError<'Not implemented'> : SubscriptionProcedure<{
    input: DefaultValue<TInputIn, void>;
    output: inferSubscriptionOutput<DefaultValue<TOutputOut, $Output>>;
    meta: TMeta;
  }>;
  /**
   * @deprecated Using subscriptions with an observable is deprecated. Use an async generator instead.
   * This feature will be removed in v12 of tRPC.
   * @see https://trpc.io/docs/v11/server/subscriptions
   */
  subscription<$Output extends Observable<any, any>>(resolver: ProcedureResolver<TContext, TMeta, TContextOverrides, TInputOut, TOutputIn, $Output>): TCaller extends true ? TypeError<'Not implemented'> : LegacyObservableSubscriptionProcedure<{
    input: DefaultValue<TInputIn, void>;
    output: inferObservableValue<DefaultValue<TOutputOut, $Output>>;
    meta: TMeta;
  }>;
  /**
   * Overrides the way a procedure is invoked
   * Do not use this unless you know what you're doing - this is an experimental API
   */
  experimental_caller(caller: CallerOverride<TContext>): ProcedureBuilder<TContext, TMeta, TContextOverrides, TInputIn, TInputOut, TOutputIn, TOutputOut, true>;
  /**
   * @internal
   */
  _def: ProcedureBuilderDef<TMeta>;
}
type ProcedureBuilderResolver = (opts: ProcedureResolverOptions<any, any, any, any>) => Promise<unknown>;
declare function createBuilder<TContext, TMeta>(initDef?: Partial<AnyProcedureBuilderDef>): ProcedureBuilder<TContext, TMeta, object, UnsetMarker, UnsetMarker, UnsetMarker, UnsetMarker, false>;
/**
 * @internal
 */
interface ProcedureCallOptions<TContext> {
  ctx: TContext;
  getRawInput: GetRawInputFn;
  input?: unknown;
  path: string;
  type: ProcedureType;
  signal: AbortSignal | undefined;
}
//#endregion
//#region src/unstable-core-do-not-import/procedure.d.ts
declare const procedureTypes: readonly ["query", "mutation", "subscription"];
/**
 * @public
 */
type ProcedureType = (typeof procedureTypes)[number];
interface BuiltProcedureDef {
  meta: unknown;
  input: unknown;
  output: unknown;
}
/**
 *
 * @internal
 */
interface Procedure<TType extends ProcedureType, TDef extends BuiltProcedureDef> {
  _def: {
    /**
     * These are just types, they can't be used at runtime
     * @internal
     */
    $types: {
      input: TDef['input'];
      output: TDef['output'];
    };
    procedure: true;
    type: TType;
    /**
     * @internal
     * Meta is not inferrable on individual procedures, only on the router
     */
    meta: unknown;
    experimental_caller: boolean;
    /**
     * The input parsers for the procedure
     */
    inputs: Parser[];
  };
  meta: TDef['meta'];
  /**
   * @internal
   */
  (opts: ProcedureCallOptions<unknown>): Promise<TDef['output']>;
}
interface QueryProcedure<TDef extends BuiltProcedureDef> extends Procedure<'query', TDef> {}
interface MutationProcedure<TDef extends BuiltProcedureDef> extends Procedure<'mutation', TDef> {}
interface SubscriptionProcedure<TDef extends BuiltProcedureDef> extends Procedure<'subscription', TDef> {}
/**
 * @deprecated
 */
interface LegacyObservableSubscriptionProcedure<TDef extends BuiltProcedureDef> extends SubscriptionProcedure<TDef> {
  _observable: true;
}
type AnyQueryProcedure = QueryProcedure<any>;
type AnyMutationProcedure = MutationProcedure<any>;
type AnySubscriptionProcedure = SubscriptionProcedure<any> | LegacyObservableSubscriptionProcedure<any>;
type AnyProcedure = AnyQueryProcedure | AnyMutationProcedure | AnySubscriptionProcedure;
type inferProcedureInput<TProcedure extends AnyProcedure> = undefined extends inferProcedureParams<TProcedure>['$types']['input'] ? void | inferProcedureParams<TProcedure>['$types']['input'] : inferProcedureParams<TProcedure>['$types']['input'];
type inferProcedureParams<TProcedure> = TProcedure extends AnyProcedure ? TProcedure['_def'] : never;
type inferProcedureOutput<TProcedure> = inferProcedureParams<TProcedure>['$types']['output'];
/**
 * @internal
 */
interface ErrorHandlerOptions<TContext> {
  error: TRPCError;
  type: ProcedureType | 'unknown';
  path: string | undefined;
  input: unknown;
  ctx: TContext | undefined;
}
//#endregion
//#region src/unstable-core-do-not-import/http/types.d.ts
/**
 * @deprecated use `Headers` instead, this will be removed in v12
 */
type HTTPHeaders = Dict<string[] | string>;
interface ResponseMeta {
  status?: number;
  headers?: Headers | HTTPHeaders;
}
/**
 * @internal
 */
type ResponseMetaFn<TRouter extends AnyRouter> = (opts: {
  data: TRPCResponse<unknown, inferRouterError<TRouter>>[];
  ctx?: inferRouterContext<TRouter>;
  /**
   * The different tRPC paths requested
   * @deprecated use `info` instead, this will be removed in v12
   **/
  paths: readonly string[] | undefined;
  info: TRPCRequestInfo | undefined;
  type: ProcedureType | 'unknown';
  errors: TRPCError[];
  /**
   * `true` if the `ResponseMeta` is being generated without knowing the response data (e.g. for streamed requests).
   */
  eagerGeneration: boolean;
}) => ResponseMeta;
/**
 * Base interface for anything using HTTP
 */
interface HTTPBaseHandlerOptions<TRouter extends AnyRouter, TRequest> extends BaseHandlerOptions<TRouter, TRequest> {
  /**
   * Add handler to be called before response is sent to the user
   * Useful for setting cache headers
   * @see https://trpc.io/docs/v11/caching
   */
  responseMeta?: ResponseMetaFn<TRouter>;
}
type TRPCAcceptHeader = 'application/jsonl';
interface TRPCRequestInfoProcedureCall {
  path: string;
  /**
   * Read the raw input (deduped and memoized)
   */
  getRawInput: () => Promise<unknown>;
  /**
   * Get already parsed inputs - won't trigger reading the body or parsing the inputs
   */
  result: () => unknown;
  /**
   * The procedure being called, `null` if not found
   * @internal
   */
  procedure: AnyProcedure | null;
}
/**
 * Information about the incoming request
 * @public
 */
interface TRPCRequestInfo {
  /**
   * The `trpc-accept` header
   */
  accept: TRPCAcceptHeader | null;
  /**
   * The type of the request
   */
  type: ProcedureType | 'unknown';
  /**
   * If the content type handler has detected that this is a batch call
   */
  isBatchCall: boolean;
  /**
   * The calls being made
   */
  calls: TRPCRequestInfoProcedureCall[];
  /**
   * Connection params when using `httpSubscriptionLink` or `createWSClient`
   */
  connectionParams: Dict<string> | null;
  /**
   * Signal when the request is aborted
   * Can be used to abort async operations during the request, e.g. `fetch()`-requests
   */
  signal: AbortSignal;
  /**
   * The URL of the request if available
   */
  url: URL | null;
}
/**
 * Inner createContext function for `resolveResponse` used to forward `TRPCRequestInfo` to `createContext`
 * @internal
 */
type ResolveHTTPRequestOptionsContextFn<TRouter extends AnyRouter> = (opts: {
  info: TRPCRequestInfo;
}) => Promise<inferRouterContext<TRouter>>;
interface HTTPErrorHandlerOptions<TRouter extends AnyRouter, TRequest> extends ErrorHandlerOptions<inferRouterContext<TRouter>> {
  req: TRequest;
}
/**
 * @internal
 */
type HTTPErrorHandler<TRouter extends AnyRouter, TRequest> = (opts: HTTPErrorHandlerOptions<TRouter, TRequest>) => void;
/**
 * Base interface for any response handler
 * @internal
 */
interface BaseHandlerOptions<TRouter extends AnyRouter, TRequest> {
  onError?: HTTPErrorHandler<TRouter, TRequest>;
  /**
   * @deprecated use `allowBatching` instead, this will be removed in v12
   */
  batching?: {
    /**
     * @default true
     */
    enabled: boolean;
  };
  router: TRouter;
  /**
   * Allow method override - will skip the method check
   * @default false
   */
  allowMethodOverride?: boolean;
  /**
   * Allow request batching
   * @default true
   */
  allowBatching?: boolean;
}
//#endregion
//#region src/unstable-core-do-not-import/rpc/envelopes.d.ts
/**
 * Error response
 */
interface TRPCErrorShape<TData extends object = object> {
  code: TRPC_ERROR_CODE_NUMBER;
  message: string;
  data: TData;
}
/**
 * JSON-RPC 2.0 Specification
 */
declare namespace JSONRPC2 {
  type RequestId = number | string | null;
  /**
   * All requests/responses extends this shape
   */
  interface BaseEnvelope {
    id?: RequestId;
    jsonrpc?: '2.0';
  }
  interface BaseRequest<TMethod extends string = string> extends BaseEnvelope {
    method: TMethod;
  }
  interface Request<TMethod extends string = string, TParams = unknown> extends BaseRequest<TMethod> {
    params: TParams;
  }
  interface ResultResponse<TResult = unknown> extends BaseEnvelope {
    result: TResult;
  }
  interface ErrorResponse<TError extends TRPCErrorShape = TRPCErrorShape> extends BaseEnvelope {
    error: TError;
  }
}
interface TRPCRequest extends JSONRPC2.Request<ProcedureType, {
  path: string;
  input: unknown;
  /**
   * The last event id that the client received
   */
  lastEventId?: string;
}> {}
interface TRPCResult<TData = unknown> {
  data: TData;
  type?: 'data';
  /**
   * The id of the message to keep track of in case of a reconnect
   */
  id?: string;
}
interface TRPCSuccessResponse<TData> extends JSONRPC2.ResultResponse<TRPCResult<TData>> {}
interface TRPCErrorResponse<TError extends TRPCErrorShape = TRPCErrorShape> extends JSONRPC2.ErrorResponse<TError> {}
type TRPCResponse<TData = unknown, TError extends TRPCErrorShape = TRPCErrorShape> = TRPCErrorResponse<TError> | TRPCSuccessResponse<TData>;
type TRPCRequestMessage = TRPCRequest & {
  id: JSONRPC2.RequestId;
};
/**
 * The client asked the server to unsubscribe
 */
interface TRPCSubscriptionStopNotification extends JSONRPC2.BaseRequest<'subscription.stop'> {
  id: null;
}
/**
 * The client's outgoing request types
 */
type TRPCClientOutgoingRequest = TRPCSubscriptionStopNotification;
/**
 * The client's sent messages shape
 */
type TRPCClientOutgoingMessage = TRPCRequestMessage | (JSONRPC2.BaseRequest<'subscription.stop'> & {
  id: JSONRPC2.RequestId;
});
interface TRPCResultMessage<TData> extends JSONRPC2.ResultResponse<{
  type: 'started';
  data?: never;
} | {
  type: 'stopped';
  data?: never;
} | TRPCResult<TData>> {}
type TRPCResponseMessage<TData = unknown, TError extends TRPCErrorShape = TRPCErrorShape> = {
  id: JSONRPC2.RequestId;
} & (TRPCErrorResponse<TError> | TRPCResultMessage<TData>);
/**
 * The server asked the client to reconnect - useful when restarting/redeploying service
 */
interface TRPCReconnectNotification extends JSONRPC2.BaseRequest<'reconnect'> {
  id: JSONRPC2.RequestId;
}
/**
 * The client's incoming request types
 */
type TRPCClientIncomingRequest = TRPCReconnectNotification;
/**
 * The client's received messages shape
 */
type TRPCClientIncomingMessage<TResult = unknown, TError extends TRPCErrorShape = TRPCErrorShape> = TRPCClientIncomingRequest | TRPCResponseMessage<TResult, TError>;
/**
 * The client sends connection params - always sent as the first message
 */
interface TRPCConnectionParamsMessage extends JSONRPC2.BaseRequest<'connectionParams'> {
  data: TRPCRequestInfo['connectionParams'];
}
//# sourceMappingURL=envelopes.d.ts.map
//#endregion
//#region src/unstable-core-do-not-import/transformer.d.ts
/**
 * @public
 */
interface DataTransformer {
  serialize(object: any): any;
  deserialize(object: any): any;
}
interface InputDataTransformer extends DataTransformer {
  /**
   * This function runs **on the client** before sending the data to the server.
   */
  serialize(object: any): any;
  /**
   * This function runs **on the server** to transform the data before it is passed to the resolver
   */
  deserialize(object: any): any;
}
interface OutputDataTransformer extends DataTransformer {
  /**
   * This function runs **on the server** before sending the data to the client.
   */
  serialize(object: any): any;
  /**
   * This function runs **only on the client** to transform the data sent from the server.
   */
  deserialize(object: any): any;
}
/**
 * @public
 */
interface CombinedDataTransformer {
  /**
   * Specify how the data sent from the client to the server should be transformed.
   */
  input: InputDataTransformer;
  /**
   * Specify how the data sent from the server to the client should be transformed.
   */
  output: OutputDataTransformer;
}
/**
 * @public
 */
type CombinedDataTransformerClient = {
  input: Pick<CombinedDataTransformer['input'], 'serialize'>;
  output: Pick<CombinedDataTransformer['output'], 'deserialize'>;
};
/**
 * @public
 */
type DataTransformerOptions = CombinedDataTransformer | DataTransformer;
/**
 * @internal
 */
declare function getDataTransformer(transformer: DataTransformerOptions): CombinedDataTransformer;
/**
 * @internal
 */
declare const defaultTransformer: CombinedDataTransformer;
/**
 * Takes a unserialized `TRPCResponse` and serializes it with the router's transformers
 **/
declare function transformTRPCResponse<TResponse extends TRPCResponse | TRPCResponse[] | TRPCResponseMessage | TRPCResponseMessage[]>(config: RootConfig<AnyRootTypes>, itemOrItems: TResponse): TRPCSuccessResponse<unknown> | TRPCErrorResponse<TRPCErrorShape<object>> | ({
  id: JSONRPC2.RequestId;
} & TRPCResultMessage<unknown>) | (TRPCResponse | TRPCResponseMessage)[];
/** @internal */
declare function transformResultInner<TRouter extends AnyRouter, TOutput>(response: TRPCResponse<TOutput, inferRouterError<TRouter>> | TRPCResponseMessage<TOutput, inferRouterError<TRouter>>, transformer: DataTransformer): {
  readonly ok: false;
  readonly error: {
    readonly error: inferRouterError<TRouter>;
    readonly id?: JSONRPC2.RequestId;
    readonly jsonrpc?: "2.0";
  } | {
    readonly error: inferRouterError<TRouter>;
    readonly id: string | number | null;
    readonly jsonrpc?: "2.0";
  };
  readonly result?: undefined;
} | {
  readonly ok: true;
  readonly result: {
    type: "started";
    data?: never;
  } | {
    type: "stopped";
    data?: never;
  } | TRPCResult<TOutput>;
  readonly error?: undefined;
};
/**
 * Transforms and validates that the result is a valid TRPCResponse
 * @internal
 */
declare function transformResult<TRouter extends AnyRouter, TOutput>(response: TRPCResponse<TOutput, inferRouterError<TRouter>> | TRPCResponseMessage<TOutput, inferRouterError<TRouter>>, transformer: DataTransformer): ReturnType<typeof transformResultInner>;
//#endregion
//#region src/unstable-core-do-not-import/rpc/parseTRPCMessage.d.ts
/** @public */
declare function parseTRPCMessage(obj: unknown, transformer: CombinedDataTransformer): TRPCClientOutgoingMessage;
//# sourceMappingURL=parseTRPCMessage.d.ts.map

//#endregion
//#region src/unstable-core-do-not-import/error/formatter.d.ts
/**
 * @internal
 */
type ErrorFormatter<TContext, TShape extends TRPCErrorShape> = (opts: {
  error: TRPCError;
  type: ProcedureType | 'unknown';
  path: string | undefined;
  input: unknown;
  ctx: TContext | undefined;
  shape: DefaultErrorShape;
}) => TShape;
/**
 * @internal
 */
type DefaultErrorData = {
  code: TRPC_ERROR_CODE_KEY;
  httpStatus: number;
  /**
   * Path to the procedure that threw the error
   */
  path?: string;
  /**
   * Stack trace of the error (only in development)
   */
  stack?: string;
};
/**
 * @internal
 */
interface DefaultErrorShape extends TRPCErrorShape<DefaultErrorData> {
  message: string;
  code: TRPC_ERROR_CODE_NUMBER;
}
declare const defaultFormatter: ErrorFormatter<any, any>;
//# sourceMappingURL=formatter.d.ts.map
//#endregion
//#region src/unstable-core-do-not-import/stream/jsonl.d.ts
/**
 * A subset of the standard ReadableStream properties needed by tRPC internally.
 * @see ReadableStream from lib.dom.d.ts
 */
type WebReadableStreamEsque = {
  getReader: () => ReadableStreamDefaultReader<Uint8Array>;
};
type NodeJSReadableStreamEsque = {
  on(eventName: string | symbol, listener: (...args: any[]) => void): NodeJSReadableStreamEsque;
};
declare function isPromise(value: unknown): value is Promise<unknown>;
type Serialize$2 = (value: any) => any;
type Deserialize$1 = (value: any) => any;
type PathArray = readonly (string | number)[];
type ProducerOnError = (opts: {
  error: unknown;
  path: PathArray;
}) => void;
interface JSONLProducerOptions {
  serialize?: Serialize$2;
  data: Record<string, unknown> | unknown[];
  onError?: ProducerOnError;
  formatError?: (opts: {
    error: unknown;
    path: PathArray;
  }) => unknown;
  maxDepth?: number;
  /**
   * Interval in milliseconds to send a ping to the client to keep the connection alive
   * This will be sent as a whitespace character
   * @default undefined
   */
  pingMs?: number;
}
/**
 * JSON Lines stream producer
 * @see https://jsonlines.org/
 */
declare function jsonlStreamProducer(opts: JSONLProducerOptions): ReadableStream<Uint8Array<ArrayBuffer>>;
type ConsumerOnError = (opts: {
  error: unknown;
}) => void;
/**
 * JSON Lines stream consumer
 * @see https://jsonlines.org/
 */
declare function jsonlStreamConsumer<THead>(opts: {
  from: NodeJSReadableStreamEsque | WebReadableStreamEsque;
  deserialize?: Deserialize$1;
  onError?: ConsumerOnError;
  formatError?: (opts: {
    error: unknown;
  }) => Error;
  /**
   * This `AbortController` will be triggered when there are no more listeners to the stream.
   */
  abortController: AbortController;
}): Promise<readonly [Awaited<THead>]>;
//#endregion
//#region src/unstable-core-do-not-import/stream/sse.types.d.ts
/**
 * @internal
 */
declare namespace EventSourceLike {
  export interface InitDict {
    withCredentials?: boolean;
  }
  export interface MessageEvent extends Event {
    data: any;
    lastEventId?: string;
  }
  export interface Event {}
  type EventSourceListenerLike = (event: Event) => void;
  export type AnyConstructorLike<TInit extends InitDict> = new (url: string, eventSourceInitDict?: TInit) => Instance;
  export interface Instance {
    readonly CLOSED: number;
    readonly CONNECTING: number;
    readonly OPEN: number;
    addEventListener(type: string, listener: EventSourceListenerLike): void;
    removeEventListener(type: string, listener: EventSourceListenerLike): void;
    close: () => void;
    readyState: number;
  }
  export type AnyConstructor = AnyConstructorLike<any>;
  export type ListenerOf<T extends AnyConstructor> = Parameters<InstanceType<T>['addEventListener']>[1];
  export type EventOf<T extends AnyConstructor> = Parameters<ListenerOf<T>>[0];
  export type InitDictOf<T extends AnyConstructor> = ConstructorParameters<T>[1];
  export {};
}
//# sourceMappingURL=sse.types.d.ts.map
//#endregion
//#region src/unstable-core-do-not-import/stream/sse.d.ts
type Serialize$1 = (value: any) => any;
type Deserialize = (value: any) => any;
/**
 * @internal
 */
interface SSEPingOptions {
  /**
   * Enable ping comments sent from the server
   * @default false
   */
  enabled: boolean;
  /**
   * Interval in milliseconds
   * @default 1000
   */
  intervalMs?: number;
}
interface SSEClientOptions {
  /**
   * Timeout and reconnect after inactivity in milliseconds
   * @default undefined
   */
  reconnectAfterInactivityMs?: number;
}
interface SSEStreamProducerOptions<TValue = unknown> {
  serialize?: Serialize$1;
  data: AsyncIterable<TValue>;
  maxDepth?: number;
  ping?: SSEPingOptions;
  /**
   * Maximum duration in milliseconds for the request before ending the stream
   * @default undefined
   */
  maxDurationMs?: number;
  /**
   * End the request immediately after data is sent
   * Only useful for serverless runtimes that do not support streaming responses
   * @default false
   */
  emitAndEndImmediately?: boolean;
  formatError?: (opts: {
    error: unknown;
  }) => unknown;
  /**
   * Client-specific options - these will be sent to the client as part of the first message
   * @default {}
   */
  client?: SSEClientOptions;
}
/**
 *
 * @see https://html.spec.whatwg.org/multipage/server-sent-events.html
 */
declare function sseStreamProducer<TValue = unknown>(opts: SSEStreamProducerOptions<TValue>): ReadableStream<Uint8Array<ArrayBuffer>>;
interface ConsumerStreamResultBase<TConfig extends ConsumerConfig> {
  eventSource: InstanceType<TConfig['EventSource']> | null;
}
interface ConsumerStreamResultData<TConfig extends ConsumerConfig> extends ConsumerStreamResultBase<TConfig> {
  type: 'data';
  data: inferTrackedOutput<TConfig['data']>;
}
interface ConsumerStreamResultError<TConfig extends ConsumerConfig> extends ConsumerStreamResultBase<TConfig> {
  type: 'serialized-error';
  error: TConfig['error'];
}
interface ConsumerStreamResultConnecting<TConfig extends ConsumerConfig> extends ConsumerStreamResultBase<TConfig> {
  type: 'connecting';
  event: EventSourceLike.EventOf<TConfig['EventSource']> | null;
}
interface ConsumerStreamResultTimeout<TConfig extends ConsumerConfig> extends ConsumerStreamResultBase<TConfig> {
  type: 'timeout';
  ms: number;
}
interface ConsumerStreamResultPing<TConfig extends ConsumerConfig> extends ConsumerStreamResultBase<TConfig> {
  type: 'ping';
}
interface ConsumerStreamResultConnected<TConfig extends ConsumerConfig> extends ConsumerStreamResultBase<TConfig> {
  type: 'connected';
  options: SSEClientOptions;
}
type ConsumerStreamResult<TConfig extends ConsumerConfig> = ConsumerStreamResultData<TConfig> | ConsumerStreamResultError<TConfig> | ConsumerStreamResultConnecting<TConfig> | ConsumerStreamResultTimeout<TConfig> | ConsumerStreamResultPing<TConfig> | ConsumerStreamResultConnected<TConfig>;
interface SSEStreamConsumerOptions<TConfig extends ConsumerConfig> {
  url: () => MaybePromise<string>;
  init: () => MaybePromise<EventSourceLike.InitDictOf<TConfig['EventSource']>> | undefined;
  signal: AbortSignal;
  deserialize?: Deserialize;
  EventSource: TConfig['EventSource'];
}
interface ConsumerConfig {
  data: unknown;
  error: unknown;
  EventSource: EventSourceLike.AnyConstructor;
}
/**
 * @see https://html.spec.whatwg.org/multipage/server-sent-events.html
 */
declare function sseStreamConsumer<TConfig extends ConsumerConfig>(opts: SSEStreamConsumerOptions<TConfig>): AsyncIterable<ConsumerStreamResult<TConfig>>;
declare const sseHeaders: {
  readonly 'Content-Type': "text/event-stream";
  readonly 'Cache-Control': "no-cache, no-transform";
  readonly 'X-Accel-Buffering': "no";
  readonly Connection: "keep-alive";
};
//#endregion
//#region src/unstable-core-do-not-import/rootConfig.d.ts
/**
 * The initial generics that are used in the init function
 * @internal
 */
interface RootTypes {
  ctx: object;
  meta: object;
  errorShape: DefaultErrorShape;
  transformer: boolean;
}
/**
 * The default check to see if we're in a server
 */
declare const isServerDefault: boolean;
/**
 * The tRPC root config
 * @internal
 */
interface RootConfig<TTypes extends RootTypes> {
  /**
   * The types that are used in the config
   * @internal
   */
  $types: TTypes;
  /**
   * Use a data transformer
   * @see https://trpc.io/docs/v11/data-transformers
   */
  transformer: CombinedDataTransformer;
  /**
   * Use custom error formatting
   * @see https://trpc.io/docs/v11/error-formatting
   */
  errorFormatter: ErrorFormatter<TTypes['ctx'], TTypes['errorShape']>;
  /**
   * Allow `@trpc/server` to run in non-server environments
   * @warning **Use with caution**, this should likely mainly be used within testing.
   * @default false
   */
  allowOutsideOfServer: boolean;
  /**
   * Is this a server environment?
   * @warning **Use with caution**, this should likely mainly be used within testing.
   * @default typeof window === 'undefined' || 'Deno' in window || process.env.NODE_ENV === 'test'
   */
  isServer: boolean;
  /**
   * Is this development?
   * Will be used to decide if the API should return stack traces
   * @default process.env.NODE_ENV !== 'production'
   */
  isDev: boolean;
  defaultMeta?: TTypes['meta'] extends object ? TTypes['meta'] : never;
  /**
   * Options for server-sent events (SSE) subscriptions
   * @see https://trpc.io/docs/client/links/httpSubscriptionLink
   */
  sse?: {
    /**
     * Enable server-sent events (SSE) subscriptions
     * @default true
     */
    enabled?: boolean;
  } & Pick<SSEStreamProducerOptions, 'ping' | 'emitAndEndImmediately' | 'maxDurationMs' | 'client'>;
  /**
   * Options for batch stream
   * @see https://trpc.io/docs/client/links/httpBatchStreamLink
   */
  jsonl?: Pick<JSONLProducerOptions, 'pingMs'>;
  experimental?: {};
}
/**
 * @internal
 */
type CreateRootTypes<TGenerics extends RootTypes> = TGenerics;
type AnyRootTypes = CreateRootTypes<{
  ctx: any;
  meta: any;
  errorShape: any;
  transformer: any;
}>;
type PartialIf<TCondition extends boolean, TType> = TCondition extends true ? Partial<TType> : TType;
/**
 * Adds a `createContext` option with a given callback function
 * If context is the default value, then the `createContext` option is optional
 */
type CreateContextCallback<TContext, TFunction extends (...args: any[]) => any> = PartialIf<object extends TContext ? true : false, {
  /**
   * @see https://trpc.io/docs/v11/context
   **/
  createContext: TFunction;
}>;
//#endregion
//#region src/unstable-core-do-not-import/router.d.ts
interface RouterRecord {
  [key: string]: AnyProcedure | RouterRecord;
}
type DecorateProcedure<TProcedure extends AnyProcedure> = (input: inferProcedureInput<TProcedure>) => Promise<TProcedure['_def']['type'] extends 'subscription' ? TProcedure extends LegacyObservableSubscriptionProcedure<any> ? Observable<inferProcedureOutput<TProcedure>, TRPCError> : inferProcedureOutput<TProcedure> : inferProcedureOutput<TProcedure>>;
/**
 * @internal
 */
type DecorateRouterRecord<TRecord extends RouterRecord> = { [TKey in keyof TRecord]: TRecord[TKey] extends infer $Value ? $Value extends AnyProcedure ? DecorateProcedure<$Value> : $Value extends RouterRecord ? DecorateRouterRecord<$Value> : never : never };
/**
 * @internal
 */
type RouterCallerErrorHandler<TContext> = (opts: ErrorHandlerOptions<TContext>) => void;
/**
 * @internal
 */
type RouterCaller<TRoot extends AnyRootTypes, TRecord extends RouterRecord> = (
/**
 * @note
 * If passing a function, we recommend it's a cached function
 * e.g. wrapped in `React.cache` to avoid unnecessary computations
 */
ctx: TRoot['ctx'] | (() => MaybePromise<TRoot['ctx']>), options?: {
  onError?: RouterCallerErrorHandler<TRoot['ctx']>;
  signal?: AbortSignal;
}) => DecorateRouterRecord<TRecord>;
type Lazy<TAny> = (() => Promise<TAny>) & {};
type LazyLoader<TAny> = {
  load: () => Promise<void>;
  ref: Lazy<TAny>;
};
/**
 * Lazy load a router
 * @see https://trpc.io/docs/server/merging-routers#lazy-load
 */
declare function lazy<TRouter extends AnyRouter>(importRouter: () => Promise<TRouter | {
  [key: string]: TRouter;
}>): Lazy<NoInfer<TRouter>>;
/**
 * @internal
 */
interface RouterDef<TRoot extends AnyRootTypes, TRecord extends RouterRecord> {
  _config: RootConfig<TRoot>;
  router: true;
  procedure?: never;
  procedures: TRecord;
  record: TRecord;
  lazy: Record<string, LazyLoader<AnyRouter>>;
}
interface Router<TRoot extends AnyRootTypes, TRecord extends RouterRecord> {
  _def: RouterDef<TRoot, TRecord>;
  /**
   * @see https://trpc.io/docs/v11/server/server-side-calls
   */
  createCaller: RouterCaller<TRoot, TRecord>;
}
type BuiltRouter<TRoot extends AnyRootTypes, TRecord extends RouterRecord> = Router<TRoot, TRecord> & TRecord;
interface RouterBuilder<TRoot extends AnyRootTypes> {
  <TIn extends CreateRouterOptions>(_: TIn): BuiltRouter<TRoot, DecorateCreateRouterOptions<TIn>>;
}
type AnyRouter = Router<any, any>;
type inferRouterRootTypes<TRouter extends AnyRouter> = TRouter['_def']['_config']['$types'];
type inferRouterContext<TRouter extends AnyRouter> = inferRouterRootTypes<TRouter>['ctx'];
type inferRouterError<TRouter extends AnyRouter> = inferRouterRootTypes<TRouter>['errorShape'];
type inferRouterMeta<TRouter extends AnyRouter> = inferRouterRootTypes<TRouter>['meta'];
/** @internal */
type CreateRouterOptions = {
  [key: string]: AnyProcedure | AnyRouter | CreateRouterOptions | Lazy<AnyRouter>;
};
/** @internal */
type DecorateCreateRouterOptions<TRouterOptions extends CreateRouterOptions> = { [K in keyof TRouterOptions]: TRouterOptions[K] extends infer $Value ? $Value extends AnyProcedure ? $Value : $Value extends Router<any, infer TRecord> ? TRecord : $Value extends Lazy<Router<any, infer TRecord>> ? TRecord : $Value extends CreateRouterOptions ? DecorateCreateRouterOptions<$Value> : never : never };
/**
 * @internal
 */
declare function createRouterFactory<TRoot extends AnyRootTypes>(config: RootConfig<TRoot>): <TInput extends CreateRouterOptions>(input: TInput) => BuiltRouter<TRoot, DecorateCreateRouterOptions<TInput>>;
/**
 * @internal
 */
declare function getProcedureAtPath(router: Pick<Router<any, any>, '_def'>, path: string): Promise<AnyProcedure | null>;
/**
 * @internal
 */
declare function callProcedure(opts: ProcedureCallOptions<unknown> & {
  router: AnyRouter;
  allowMethodOverride?: boolean;
}): Promise<any>;
interface RouterCallerFactory<TRoot extends AnyRootTypes> {
  <TRecord extends RouterRecord>(router: Pick<Router<TRoot, TRecord>, '_def'>): RouterCaller<TRoot, TRecord>;
}
declare function createCallerFactory<TRoot extends AnyRootTypes>(): RouterCallerFactory<TRoot>;
/** @internal */
type MergeRouters<TRouters extends AnyRouter[], TRoot extends AnyRootTypes = TRouters[0]['_def']['_config']['$types'], TRecord extends RouterRecord = {}> = TRouters extends [infer Head extends AnyRouter, ...infer Tail extends AnyRouter[]] ? MergeRouters<Tail, TRoot, Head['_def']['record'] & TRecord> : BuiltRouter<TRoot, TRecord>;
declare function mergeRouters<TRouters extends AnyRouter[]>(...routerList: [...TRouters]): MergeRouters<TRouters>;
//#endregion
//#region src/unstable-core-do-not-import/clientish/inferrable.d.ts
type AnyClientTypes = Pick<AnyRootTypes, 'errorShape' | 'transformer'>;
/**
 * Result of `initTRPC.create()`
 */
type InitLike = {
  _config: {
    $types: AnyClientTypes;
  };
};
/**
 * Result of `initTRPC.create().router()`
 */
type RouterLike = {
  _def: InitLike;
};
/**
 * Result of `initTRPC.create()._config`
 */
type RootConfigLike = {
  $types: AnyClientTypes;
};
/**
 * Anything that can be inferred to the root config types needed for a TRPC client
 */
type InferrableClientTypes = RouterLike | InitLike | RootConfigLike | AnyClientTypes;
type PickTypes<T extends AnyClientTypes> = {
  transformer: T['transformer'];
  errorShape: T['errorShape'];
};
/**
 * Infer the root types from a InferrableClientTypes
 */
type inferClientTypes<TInferrable extends InferrableClientTypes> = TInferrable extends AnyClientTypes ? PickTypes<TInferrable> : TInferrable extends RootConfigLike ? PickTypes<TInferrable['$types']> : TInferrable extends InitLike ? PickTypes<TInferrable['_config']['$types']> : TInferrable extends RouterLike ? PickTypes<TInferrable['_def']['_config']['$types']> : never;
//#endregion
//#region src/unstable-core-do-not-import/clientish/serialize.d.ts
/**
 * @see https://github.com/remix-run/remix/blob/2248669ed59fd716e267ea41df5d665d4781f4a9/packages/remix-server-runtime/serialize.ts
 */
type JsonPrimitive = boolean | number | string | null;
type JsonArray = JsonValue[] | readonly JsonValue[];
type JsonObject = {
  readonly [key: string | number]: JsonValue;
  [key: symbol]: never;
};
type JsonValue = JsonPrimitive | JsonObject | JsonArray;
type IsJson<T> = T extends JsonValue ? true : false;
type NonJsonPrimitive = Function | symbol | undefined;
type IsAny<T> = 0 extends T & 1 ? true : false;
type JsonReturnable = JsonPrimitive | undefined;
type IsRecord<T extends object> = keyof WithoutIndexSignature<T> extends never ? true : false;
type Serialize<T> = IsAny<T> extends true ? any : unknown extends T ? unknown : IsJson<T> extends true ? T : T extends AsyncIterable<infer $T, infer $Return, infer $Next> ? AsyncIterable<Serialize<$T>, Serialize<$Return>, Serialize<$Next>> : T extends PromiseLike<infer $T> ? Promise<Serialize<$T>> : T extends JsonReturnable ? T : T extends Map<any, any> | Set<any> ? object : T extends NonJsonPrimitive ? never : T extends {
  toJSON(): infer U;
} ? U : T extends [] ? [] : T extends [unknown, ...unknown[]] ? SerializeTuple<T> : T extends readonly (infer U)[] ? (U extends NonJsonPrimitive ? null : Serialize<U>)[] : T extends object ? IsRecord<T> extends true ? Record<keyof T, Serialize<T[keyof T]>> : Simplify<SerializeObject<UndefinedToOptional<T>>> : never;
/** JSON serialize [tuples](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types) */
type SerializeTuple<T extends [unknown, ...unknown[]]> = { [K in keyof T]: T[K] extends NonJsonPrimitive ? null : Serialize<T[K]> };
type SerializeObjectKey<T extends Record<any, any>, K> = K extends symbol ? never : IsAny<T[K]> extends true ? K : unknown extends T[K] ? K : T[K] extends NonJsonPrimitive ? never : K;
/**
 * JSON serialize objects (not including arrays) and classes
 * @internal
 **/
type SerializeObject<T extends object> = { [K in keyof T as SerializeObjectKey<T, K>]: Serialize<T[K]> };
/**
 * Extract keys from T where the value dosen't extend undefined
 * Note: Can't parse IndexSignature or Record types
 */
type FilterDefinedKeys<T extends object> = Exclude<{ [K in keyof T]: undefined extends T[K] ? never : K }[keyof T], undefined>;
/**
 * Get value of exactOptionalPropertyTypes config
 */
type ExactOptionalPropertyTypes = {
  a?: 0 | undefined;
} extends {
  a?: 0;
} ? false : true;
/**
 * Check if T has an index signature
 */
type HasIndexSignature<T extends object> = string extends keyof T ? true : false;
/**
 * { [key: string]: number | undefined } --> { [key: string]: number }
 */
type HandleIndexSignature<T extends object> = { [K in keyof Omit<T, keyof WithoutIndexSignature<T>>]: Exclude<T[K], undefined> };
/**
 * { a: number | undefined } --> { a?: number }
 * Note: Can't parse IndexSignature or Record types
 */
type HandleUndefined<T extends object> = { [K in keyof Omit<T, FilterDefinedKeys<T>>]?: Exclude<T[K], undefined> };
/**
 * Handle undefined, index signature and records
 */
type UndefinedToOptional<T extends object> = Pick<WithoutIndexSignature<T>, FilterDefinedKeys<WithoutIndexSignature<T>>> & (ExactOptionalPropertyTypes extends true ? HandleIndexSignature<T> & HandleUndefined<WithoutIndexSignature<T>> : HasIndexSignature<T> extends true ? HandleIndexSignature<T> : HandleUndefined<T>);
//#endregion
//#region src/unstable-core-do-not-import/clientish/inference.d.ts
/**
 * @internal
 */
type inferTransformedProcedureOutput<TInferrable extends InferrableClientTypes, TProcedure extends AnyProcedure> = inferClientTypes<TInferrable>['transformer'] extends false ? Serialize<inferProcedureOutput<TProcedure>> : inferProcedureOutput<TProcedure>;
/** @internal */
type inferTransformedSubscriptionOutput<TInferrable extends InferrableClientTypes, TProcedure extends AnyProcedure> = inferClientTypes<TInferrable>['transformer'] extends false ? Serialize<inferObservableValue<inferProcedureOutput<TProcedure>>> : inferObservableValue<inferProcedureOutput<TProcedure>>;
type GetInferenceHelpers<TType extends 'input' | 'output', TRoot extends AnyClientTypes, TRecord extends RouterRecord> = { [TKey in keyof TRecord]: TRecord[TKey] extends infer $Value ? $Value extends AnyProcedure ? TType extends 'input' ? inferProcedureInput<$Value> : inferTransformedProcedureOutput<TRoot, $Value> : $Value extends RouterRecord ? GetInferenceHelpers<TType, TRoot, $Value> : never : never };
type inferRouterInputs<TRouter extends AnyRouter> = GetInferenceHelpers<'input', TRouter['_def']['_config']['$types'], TRouter['_def']['record']>;
type inferRouterOutputs<TRouter extends AnyRouter> = GetInferenceHelpers<'output', TRouter['_def']['_config']['$types'], TRouter['_def']['record']>;
//# sourceMappingURL=inference.d.ts.map
//#endregion
//#region src/unstable-core-do-not-import/createProxy.d.ts
interface ProxyCallbackOptions {
  path: readonly string[];
  args: readonly unknown[];
}
type ProxyCallback = (opts: ProxyCallbackOptions) => unknown;
/**
 * Creates a proxy that calls the callback with the path and arguments
 *
 * @internal
 */
declare const createRecursiveProxy: <TFaux = unknown>(callback: ProxyCallback) => TFaux;
/**
 * Used in place of `new Proxy` where each handler will map 1 level deep to another value.
 *
 * @internal
 */
declare const createFlatProxy: <TFaux>(callback: (path: keyof TFaux) => any) => TFaux;
//#endregion
//#region src/unstable-core-do-not-import/error/getErrorShape.d.ts
/**
 * @internal
 */
declare function getErrorShape<TRoot extends AnyRootTypes>(opts: {
  config: RootConfig<TRoot>;
  error: TRPCError;
  type: ProcedureType | 'unknown';
  path: string | undefined;
  input: unknown;
  ctx: TRoot['ctx'] | undefined;
}): TRoot['errorShape'];
//# sourceMappingURL=getErrorShape.d.ts.map
//#endregion
//#region src/unstable-core-do-not-import/http/contentType.d.ts
type GetRequestInfoOptions = {
  path: string;
  req: Request;
  url: URL | null;
  searchParams: URLSearchParams;
  headers: Headers;
  router: AnyRouter;
};
declare function getRequestInfo(opts: GetRequestInfoOptions): Promise<TRPCRequestInfo>;
//#endregion
//#region src/unstable-core-do-not-import/http/contentTypeParsers.d.ts
/**
 * @internal
 */
type UtilityParser<TInput, TOutput> = ParserZodEsque<TInput, TOutput> & {
  parse: (input: unknown) => TOutput;
};
/**
 * @internal
 *
 * File is only available from Node19+ but it always extends Blob so we can use that as a type until we eventually drop Node18
 */
interface FileLike extends Blob {
  readonly name: string;
}
/**
 * @internal
 */
type OctetInput = Blob | Uint8Array | FileLike;
declare const octetInputParser: UtilityParser<OctetInput, ReadableStream>;
//# sourceMappingURL=contentTypeParsers.d.ts.map
//#endregion
//#region src/unstable-core-do-not-import/http/formDataToObject.d.ts
declare function formDataToObject(formData: FormData): Record<string, unknown>;
//# sourceMappingURL=formDataToObject.d.ts.map

//#endregion
//#region src/unstable-core-do-not-import/http/getHTTPStatusCode.d.ts
declare const JSONRPC2_TO_HTTP_CODE: Record<keyof typeof TRPC_ERROR_CODES_BY_KEY, number>;
declare const HTTP_CODE_TO_JSONRPC2: InvertKeyValue<typeof JSONRPC2_TO_HTTP_CODE>;
declare function getStatusCodeFromKey(code: keyof typeof TRPC_ERROR_CODES_BY_KEY): number;
declare function getStatusKeyFromCode(code: keyof typeof HTTP_CODE_TO_JSONRPC2): ValueOf<typeof HTTP_CODE_TO_JSONRPC2>;
declare function getHTTPStatusCode(json: TRPCResponse | TRPCResponse[]): number;
declare function getHTTPStatusCodeFromError(error: TRPCError): number;
//# sourceMappingURL=getHTTPStatusCode.d.ts.map
//#endregion
//#region src/unstable-core-do-not-import/http/abortError.d.ts
declare function isAbortError(error: unknown): error is DOMException | Error | {
  name: 'AbortError';
};
declare function throwAbortError(message?: string): never;
//# sourceMappingURL=abortError.d.ts.map
//#endregion
//#region src/unstable-core-do-not-import/http/parseConnectionParams.d.ts
declare function parseConnectionParamsFromUnknown(parsed: unknown): TRPCRequestInfo['connectionParams'];
declare function parseConnectionParamsFromString(str: string): TRPCRequestInfo['connectionParams'];
//# sourceMappingURL=parseConnectionParams.d.ts.map
//#endregion
//#region src/unstable-core-do-not-import/http/resolveResponse.d.ts
interface ResolveHTTPRequestOptions<TRouter extends AnyRouter> extends HTTPBaseHandlerOptions<TRouter, Request> {
  createContext: ResolveHTTPRequestOptionsContextFn<TRouter>;
  req: Request;
  path: string;
  /**
   * If the request had an issue before reaching the handler
   */
  error: TRPCError | null;
}
declare function resolveResponse<TRouter extends AnyRouter>(opts: ResolveHTTPRequestOptions<TRouter>): Promise<Response>;
//#endregion
//#region src/unstable-core-do-not-import/initTRPC.d.ts
type inferErrorFormatterShape<TType> = TType extends ErrorFormatter<any, infer TShape> ? TShape : DefaultErrorShape;
/** @internal */
interface RuntimeConfigOptions<TContext extends object, TMeta extends object> extends Partial<Omit<RootConfig<{
  ctx: TContext;
  meta: TMeta;
  errorShape: any;
  transformer: any;
}>, '$types' | 'transformer'>> {
  /**
   * Use a data transformer
   * @see https://trpc.io/docs/v11/data-transformers
   */
  transformer?: DataTransformerOptions;
}
type ContextCallback = (...args: any[]) => object | Promise<object>;
interface TRPCRootObject<TContext extends object, TMeta extends object, TOptions extends RuntimeConfigOptions<TContext, TMeta>, $Root extends AnyRootTypes = {
  ctx: TContext;
  meta: TMeta;
  errorShape: undefined extends TOptions['errorFormatter'] ? DefaultErrorShape : inferErrorFormatterShape<TOptions['errorFormatter']>;
  transformer: undefined extends TOptions['transformer'] ? false : true;
}> {
  /**
   * Your router config
   * @internal
   */
  _config: RootConfig<$Root>;
  /**
   * Builder object for creating procedures
   * @see https://trpc.io/docs/v11/server/procedures
   */
  procedure: ProcedureBuilder<TContext, TMeta, object, UnsetMarker, UnsetMarker, UnsetMarker, UnsetMarker, false>;
  /**
   * Create reusable middlewares
   * @see https://trpc.io/docs/v11/server/middlewares
   */
  middleware: <$ContextOverrides>(fn: MiddlewareFunction<TContext, TMeta, object, $ContextOverrides, unknown>) => MiddlewareBuilder<TContext, TMeta, $ContextOverrides, unknown>;
  /**
   * Create a router
   * @see https://trpc.io/docs/v11/server/routers
   */
  router: RouterBuilder<$Root>;
  /**
   * Merge Routers
   * @see https://trpc.io/docs/v11/server/merging-routers
   */
  mergeRouters: <TRouters extends AnyRouter[]>(...routerList: [...TRouters]) => MergeRouters<TRouters>;
  /**
   * Create a server-side caller for a router
   * @see https://trpc.io/docs/v11/server/server-side-calls
   */
  createCallerFactory: RouterCallerFactory<$Root>;
}
declare class TRPCBuilder<TContext extends object, TMeta extends object> {
  /**
   * Add a context shape as a generic to the root object
   * @see https://trpc.io/docs/v11/server/context
   */
  context<TNewContext extends object | ContextCallback>(): TRPCBuilder<TNewContext extends ContextCallback ? Unwrap<TNewContext> : TNewContext, TMeta>;
  /**
   * Add a meta shape as a generic to the root object
   * @see https://trpc.io/docs/v11/quickstart
   */
  meta<TNewMeta extends object>(): TRPCBuilder<TContext, TNewMeta>;
  /**
   * Create the root object
   * @see https://trpc.io/docs/v11/server/routers#initialize-trpc
   */
  create<TOptions extends RuntimeConfigOptions<TContext, TMeta>>(opts?: ValidateShape<TOptions, RuntimeConfigOptions<TContext, TMeta>>): TRPCRootObject<TContext, TMeta, TOptions>;
}
/**
 * Builder to initialize the tRPC root object - use this exactly once per backend
 * @see https://trpc.io/docs/v11/quickstart
 */
declare const initTRPC: TRPCBuilder<object, object>;
//#endregion
//#region src/unstable-core-do-not-import/stream/utils/createDeferred.d.ts
declare function createDeferred<TValue = void>(): {
  promise: Promise<TValue>;
  resolve: (value: TValue) => void;
  reject: (error: unknown) => void;
};
type Deferred<TValue> = ReturnType<typeof createDeferred<TValue>>;
//# sourceMappingURL=createDeferred.d.ts.map
//#endregion
//#region src/unstable-core-do-not-import/stream/utils/disposable.d.ts
/**
 * Takes a value and a dispose function and returns a new object that implements the Disposable interface.
 * The returned object is the original value augmented with a Symbol.dispose method.
 * @param thing The value to make disposable
 * @param dispose Function to call when disposing the resource
 * @returns The original value with Symbol.dispose method added
 */
declare function makeResource<T>(thing: T, dispose: () => void): T & Disposable;
/**
 * Takes a value and an async dispose function and returns a new object that implements the AsyncDisposable interface.
 * The returned object is the original value augmented with a Symbol.asyncDispose method.
 * @param thing The value to make async disposable
 * @param dispose Async function to call when disposing the resource
 * @returns The original value with Symbol.asyncDispose method added
 */
declare function makeAsyncResource<T>(thing: T, dispose: () => Promise<void>): T & AsyncDisposable;
//# sourceMappingURL=disposable.d.ts.map
//#endregion
//#region src/unstable-core-do-not-import/stream/utils/asyncIterable.d.ts
declare function iteratorResource<TYield, TReturn, TNext>(iterable: AsyncIterable<TYield, TReturn, TNext>): AsyncIterator<TYield, TReturn, TNext> & AsyncDisposable;
/**
 * Derives a new {@link AsyncGenerator} based of {@link iterable}, that yields its first
 * {@link count} values. Then, a grace period of {@link gracePeriodMs} is started in which further
 * values may still come through. After this period, the generator aborts.
 */
declare function takeWithGrace<T>(iterable: AsyncIterable<T>, opts: {
  count: number;
  gracePeriodMs: number;
}): AsyncGenerator<T>;
//# sourceMappingURL=asyncIterable.d.ts.map
//#endregion
//#region src/vendor/standard-schema-v1/error.d.ts
/** A schema error with useful information. */
declare class StandardSchemaV1Error extends Error {
  /** The schema issues. */
  readonly issues: ReadonlyArray<StandardSchemaV1.Issue>;
  /**
   * Creates a schema error with useful information.
   *
   * @param issues The schema issues.
   */
  constructor(issues: ReadonlyArray<StandardSchemaV1.Issue>);
}
//# sourceMappingURL=error.d.ts.map
//#endregion
//#region src/vendor/unpromise/types.d.ts
/** TYPES */
/** A promise that exploits a single, memory-safe upstream subscription
 * to a single re-used Unpromise that persists for the VM lifetime of a
 * Promise.
 *
 * Calling unsubscribe() removes the subscription, eliminating
 * all references to the SubscribedPromise. */
interface SubscribedPromise<T> extends Promise<T> {
  unsubscribe: () => void;
}
/** Duplicate of Promise interface, except each call returns SubscribedPromise */
interface ProxyPromise<T> extends Promise<T> {
  subscribe: () => SubscribedPromise<T>;
  then: <TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null) => SubscribedPromise<TResult1 | TResult2>;
  catch: <TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null) => SubscribedPromise<T | TResult>;
  finally: (onfinally?: (() => void) | null) => SubscribedPromise<T>;
}
type PromiseExecutor<T> = (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void;
/** A standard pattern for a resolvable, rejectable Promise, based
 * on the emerging ES2023 standard. Type ported from
 * https://github.com/microsoft/TypeScript/pull/56593 */
interface PromiseWithResolvers<T> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}
/** Given an array, this is the union of its members' types. */
//# sourceMappingURL=types.d.ts.map

//#endregion
//#region src/vendor/unpromise/unpromise.d.ts
/**
 * Every `Promise<T>` can be shadowed by a single `ProxyPromise<T>`. It is
 * created once, cached and reused throughout the lifetime of the Promise. Get a
 * Promise's ProxyPromise using `Unpromise.proxy(promise)`.
 *
 * The `ProxyPromise<T>` attaches handlers to the original `Promise<T>`
 * `.then()` and `.catch()` just once. Promises derived from it use a
 * subscription- (and unsubscription-) based mechanism that monitors these
 * handlers.
 *
 * Every time you call `.subscribe()`, `.then()` `.catch()` or `.finally()` on a
 * `ProxyPromise<T>` it returns a `SubscribedPromise<T>` having an additional
 * `unsubscribe()` method. Calling `unsubscribe()` detaches reference chains
 * from the original, potentially long-lived Promise, eliminating memory leaks.
 *
 * This approach can eliminate the memory leaks that otherwise come about from
 * repeated `race()` or `any()` calls invoking `.then()` and `.catch()` multiple
 * times on the same long-lived native Promise (subscriptions which can never be
 * cleaned up).
 *
 * `Unpromise.race(promises)` is a reference implementation of `Promise.race`
 * avoiding memory leaks when using long-lived unsettled Promises.
 *
 * `Unpromise.any(promises)` is a reference implementation of `Promise.any`
 * avoiding memory leaks when using long-lived unsettled Promises.
 *
 * `Unpromise.resolve(promise)` returns an ephemeral `SubscribedPromise<T>` for
 * any given `Promise<T>` facilitating arbitrary async/await patterns. Behind
 * the scenes, `resolve` is implemented simply as
 * `Unpromise.proxy(promise).subscribe()`. Don't forget to call `.unsubscribe()`
 * to tidy up!
 *
 */
declare class Unpromise<T> implements ProxyPromise<T> {
  /** INSTANCE IMPLEMENTATION */
  /** The promise shadowed by this Unpromise<T>  */
  protected readonly promise: Promise<T> | PromiseLike<T>;
  /** Promises expecting eventual settlement (unless unsubscribed first). This list is deleted
   * after the original promise settles - no further notifications will be issued. */
  protected subscribers: ReadonlyArray<PromiseWithResolvers<T>> | null;
  /** The Promise's settlement (recorded when it fulfils or rejects). This is consulted when
   * calling .subscribe() .then() .catch() .finally() to see if an immediately-resolving Promise
   * can be returned, and therefore subscription can be bypassed. */
  protected settlement: PromiseSettledResult<T> | null;
  /** Constructor accepts a normal Promise executor function like `new
   * Unpromise((resolve, reject) => {...})` or accepts a pre-existing Promise
   * like `new Unpromise(existingPromise)`. Adds `.then()` and `.catch()`
   * handlers to the Promise. These handlers pass fulfilment and rejection
   * notifications to downstream subscribers and maintains records of value
   * or error if the Promise ever settles. */
  protected constructor(promise: Promise<T>);
  protected constructor(promise: PromiseLike<T>);
  protected constructor(executor: PromiseExecutor<T>);
  /** Create a promise that mitigates uncontrolled subscription to a long-lived
   * Promise via .then() and .catch() - otherwise a source of memory leaks.
   *
   * The returned promise has an `unsubscribe()` method which can be called when
   * the Promise is no longer being tracked by application logic, and which
   * ensures that there is no reference chain from the original promise to the
   * new one, and therefore no memory leak.
   *
   * If original promise has not yet settled, this adds a new unique promise
   * that listens to then/catch events, along with an `unsubscribe()` method to
   * detach it.
   *
   * If original promise has settled, then creates a new Promise.resolve() or
   * Promise.reject() and provided unsubscribe is a noop.
   *
   * If you call `unsubscribe()` before the returned Promise has settled, it
   * will never settle.
   */
  subscribe(): SubscribedPromise<T>;
  /** STANDARD PROMISE METHODS (but returning a SubscribedPromise) */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null): SubscribedPromise<TResult1 | TResult2>;
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null): SubscribedPromise<T | TResult>;
  finally(onfinally?: (() => void) | null): SubscribedPromise<T>;
  /** TOSTRING SUPPORT */
  readonly [Symbol.toStringTag] = "Unpromise";
  /** Unpromise STATIC METHODS */
  /** Create or Retrieve the proxy Unpromise (a re-used Unpromise for the VM lifetime
   * of the provided Promise reference) */
  static proxy<T>(promise: PromiseLike<T>): ProxyPromise<T>;
  /** Create and store an Unpromise keyed by an original Promise. */
  protected static createSubscribablePromise<T>(promise: PromiseLike<T>): Unpromise<T>;
  /** Retrieve a previously-created Unpromise keyed by an original Promise. */
  protected static getSubscribablePromise<T>(promise: PromiseLike<T>): ProxyPromise<T> | undefined;
  /** Promise STATIC METHODS */
  /** Lookup the Unpromise for this promise, and derive a SubscribedPromise from
   * it (that can be later unsubscribed to eliminate Memory leaks) */
  static resolve<T>(value: T | PromiseLike<T>): SubscribedPromise<Awaited<T>>;
  /** Perform Promise.any() via SubscribedPromises, then unsubscribe them.
   * Equivalent to Promise.any but eliminates memory leaks from long-lived
   * promises accumulating .then() and .catch() subscribers. */
  static any<T extends readonly unknown[] | []>(values: T): Promise<Awaited<T[number]>>;
  /** Perform Promise.race via SubscribedPromises, then unsubscribe them.
   * Equivalent to Promise.race but eliminates memory leaks from long-lived
   * promises accumulating .then() and .catch() subscribers. */
  static race<T extends readonly unknown[] | []>(values: T): Promise<Awaited<T[number]>>;
  /** Create a race of SubscribedPromises that will fulfil to a single winning
   * Promise (in a 1-Tuple). Eliminates memory leaks from long-lived promises
   * accumulating .then() and .catch() subscribers. Allows simple logic to
   * consume the result, like...
   * ```ts
   * const [ winner ] = await Unpromise.race([ promiseA, promiseB ]);
   * if(winner === promiseB){
   *   const result = await promiseB;
   *   // do the thing
   * }
   * ```
   * */
  static raceReferences<TPromise extends Promise<unknown>>(promises: readonly TPromise[]): Promise<readonly [TPromise]>;
}
/** Promises a 1-tuple containing the original promise when it resolves. Allows
 * awaiting the eventual Promise ***reference*** (easy to destructure and
 * exactly compare with ===). Avoids resolving to the Promise ***value*** (which
 * may be ambiguous and therefore hard to identify as the winner of a race).
 * You can call unsubscribe on the Promise to mitigate memory leaks.
 * */

//#endregion
export { AnyClientTypes, AnyMiddlewareBuilder, AnyMiddlewareFunction, AnyMutationProcedure, AnyProcedure, AnyProcedureBuilder, AnyQueryProcedure, AnyRootTypes, AnyRouter, AnySubscriptionProcedure, BaseHandlerOptions, BuiltRouter, CallerOverride, CombinedDataTransformer, CombinedDataTransformerClient, ConsumerOnError, CreateContextCallback, CreateRootTypes, CreateRouterOptions, DataTransformer, DataTransformerOptions, DecorateCreateRouterOptions, DecorateRouterRecord, DeepPartial, DefaultErrorData, DefaultErrorShape, Deferred, Dict, DistributiveOmit, ErrorFormatter, ErrorHandlerOptions, ErrorSymbol, EventSourceLike, FileLike, Filter, FilterKeys, GetInferenceHelpers, GetRawInputFn, HTTPBaseHandlerOptions, HTTPErrorHandler, HTTP_CODE_TO_JSONRPC2, InferrableClientTypes, IntersectionError, InvertKeyValue, JSONLProducerOptions, JSONRPC2, JSONRPC2_TO_HTTP_CODE, KeyFromValue, Lazy, LegacyObservableSubscriptionProcedure, Maybe, MaybePromise, MergeRouters, MiddlewareBuilder, MiddlewareFunction, MiddlewareResult, MutationProcedure, NodeJSReadableStreamEsque, OctetInput, Overwrite, ParseFn, Parser, ParserArkTypeEsque, ParserCustomValidatorEsque, ParserMyZodEsque, ParserScaleEsque, ParserStandardSchemaEsque, ParserSuperstructEsque, ParserValibotEsque, ParserWithInputOutput, ParserWithoutInput, ParserYupEsque, ParserZodEsque, PickFirstDefined, Procedure, ProcedureBuilder, ProcedureCallOptions, ProcedureResolverOptions, ProcedureType, ProducerOnError, PromiseExecutor, PromiseWithResolvers, ProtectedIntersection, ProxyPromise, QueryProcedure, ResolveHTTPRequestOptionsContextFn, ResponseMeta, ResponseMetaFn, Result$1 as Result, RootConfig, RootTypes, Router, RouterBuilder, RouterCaller, RouterCallerErrorHandler, RouterCallerFactory, RouterDef, RouterRecord, RuntimeConfigOptions, SSEClientOptions, SSEPingOptions, SSEStreamConsumerOptions, SSEStreamProducerOptions, Serialize, SerializeObject, Simplify, StandardSchemaV1, StandardSchemaV1Error, SubscribedPromise, SubscriptionProcedure, TRPCAcceptHeader, TRPCBuilder, TRPCClientIncomingMessage, TRPCClientIncomingRequest, TRPCClientOutgoingMessage, TRPCClientOutgoingRequest, TRPCConnectionParamsMessage, TRPCError, TRPCErrorResponse, TRPCErrorShape, TRPCReconnectNotification, TRPCRequest, TRPCRequestInfo, TRPCRequestInfoProcedureCall, TRPCRequestMessage, TRPCResponse, TRPCResponseMessage, TRPCResult, TRPCResultMessage, TRPCRootObject, TRPCSubscriptionStopNotification, TRPCSuccessResponse, TRPC_ERROR_CODES_BY_KEY, TRPC_ERROR_CODES_BY_NUMBER, TRPC_ERROR_CODE_KEY, TRPC_ERROR_CODE_NUMBER, TrackedData, TrackedEnvelope, TypeError, Unpromise, UnsetMarker, Unwrap, UtilityParser, ValidateShape, ValueOf, WebReadableStreamEsque, WithoutIndexSignature, abortSignalsAnyPonyfill, assert, callProcedure, coerceAsyncIterableToArray, createBuilder, createCallerFactory, createDeferred, createFlatProxy, createInputMiddleware, createMiddlewareFactory, createOutputMiddleware, createRecursiveProxy, createRouterFactory, defaultFormatter, defaultTransformer, emptyObject, experimental_standaloneMiddleware, formDataToObject, getCauseFromUnknown, getDataTransformer, getErrorShape, getHTTPStatusCode, getHTTPStatusCodeFromError, getParseFn, getProcedureAtPath, getRequestInfo, getStatusCodeFromKey, getStatusKeyFromCode, getTRPCErrorFromUnknown, identity, inferAsyncIterableYield, inferClientTypes, inferParser, inferProcedureBuilderResolverOptions, inferProcedureInput, inferProcedureOutput, inferProcedureParams, inferRouterContext, inferRouterError, inferRouterInputs, inferRouterMeta, inferRouterOutputs, inferRouterRootTypes, inferTrackedOutput, inferTransformedProcedureOutput, inferTransformedSubscriptionOutput, initTRPC, isAbortError, isAsyncIterable, isFunction, isObject, isPromise, isServerDefault, isTrackedEnvelope, iteratorResource, jsonlStreamConsumer, jsonlStreamProducer, lazy, makeAsyncResource, makeResource, mergeRouters, mergeWithoutOverrides, middlewareMarker, noop, octetInputParser, parseConnectionParamsFromString, parseConnectionParamsFromUnknown, parseTRPCMessage, procedureTypes, resolveResponse, retryableRpcCodes, run, sleep, sse, sseHeaders, sseStreamConsumer, sseStreamProducer, takeWithGrace, throwAbortError, tracked, transformResult, transformTRPCResponse };
//# sourceMappingURL=unstable-core-do-not-import.d-CjQPvBRI.d.mts.map