import { Operation, OperationResultEnvelope, TRPCClientError, TRPCLink } from "./types.d-B2PuQAdV.cjs";
import { AnyRouter, InferrableClientTypes } from "@trpc/server/unstable-core-do-not-import";

//#region src/links/loggerLink.d.ts
type ConsoleEsque = {
  log: (...args: any[]) => void;
  error: (...args: any[]) => void;
};
type EnableFnOptions<TRouter extends InferrableClientTypes> = {
  direction: 'down';
  result: OperationResultEnvelope<unknown, TRPCClientError<TRouter>> | TRPCClientError<TRouter>;
} | (Operation & {
  direction: 'up';
});
type EnabledFn<TRouter extends AnyRouter> = (opts: EnableFnOptions<TRouter>) => boolean;
type LoggerLinkFnOptions<TRouter extends AnyRouter> = Operation & ({
  /**
   * Request result
   */
  direction: 'down';
  result: OperationResultEnvelope<unknown, TRPCClientError<TRouter>> | TRPCClientError<TRouter>;
  elapsedMs: number;
} | {
  /**
   * Request was just initialized
   */
  direction: 'up';
});
type LoggerLinkFn<TRouter extends AnyRouter> = (opts: LoggerLinkFnOptions<TRouter>) => void;
type ColorMode = 'ansi' | 'css' | 'none';
interface LoggerLinkOptions<TRouter extends AnyRouter> {
  logger?: LoggerLinkFn<TRouter>;
  enabled?: EnabledFn<TRouter>;
  /**
   * Used in the built-in defaultLogger
   */
  console?: ConsoleEsque;
  /**
   * Color mode
   * @default typeof window === 'undefined' ? 'ansi' : 'css'
   */
  colorMode?: ColorMode;
  /**
   * Include context in the log - defaults to false unless `colorMode` is 'css'
   */
  withContext?: boolean;
}
/**
 * @see https://trpc.io/docs/v11/client/links/loggerLink
 */
declare function loggerLink<TRouter extends AnyRouter = AnyRouter>(opts?: LoggerLinkOptions<TRouter>): TRPCLink<TRouter>;
//#endregion
export { LoggerLinkOptions, loggerLink };
//# sourceMappingURL=loggerLink.d-3BnyPZWQ.d.cts.map