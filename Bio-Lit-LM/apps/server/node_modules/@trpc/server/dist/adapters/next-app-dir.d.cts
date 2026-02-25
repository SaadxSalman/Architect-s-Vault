import "../index.d-BiUz7kM_.cjs";
import { CallerOverride, CreateContextCallback, ErrorHandlerOptions, MaybePromise, Simplify, TRPCError } from "../unstable-core-do-not-import.d-BJCeJk5P.cjs";
import "../index.d-CvZXeEyR.cjs";
import { RedirectType, notFound as notFound$1 } from "next/navigation";

//#region src/adapters/next-app-dir/nextAppDirCaller.d.ts

/**
 * Create a caller that works with Next.js React Server Components & Server Actions
 */
declare function nextAppDirCaller<TContext, TMeta>(config: Simplify<{
  /**
   * Extract the path from the procedure metadata
   */
  pathExtractor?: (opts: {
    meta: TMeta;
  }) => string;
  /**
   * Transform form data to a `Record` before passing it to the procedure
   * @default true
   */
  normalizeFormData?: boolean;
  /**
   * Called when an error occurs in the handler
   */
  onError?: (opts: ErrorHandlerOptions<TContext>) => void;
} & CreateContextCallback<TContext, () => MaybePromise<TContext>>>): CallerOverride<TContext>;
//# sourceMappingURL=nextAppDirCaller.d.ts.map
//#endregion
//#region src/adapters/next-app-dir/redirect.d.ts
/**
 * Like `next/navigation`'s `redirect()` but throws a `TRPCError` that later will be handled by Next.js
 * This provides better typesafety than the `next/navigation`'s `redirect()` since the action continues
 * to execute on the frontend even if Next's `redirect()` has a return type of `never`.
 * @public
 * @remark You should only use this if you're also using `nextAppDirCaller`.
 */
declare const redirect: (url: URL | string, redirectType?: RedirectType) => undefined;
//# sourceMappingURL=redirect.d.ts.map
//#endregion
//#region src/adapters/next-app-dir/notFound.d.ts
/**
 * Like `next/navigation`'s `notFound()` but throws a `TRPCError` that later will be handled by Next.js
 * @public
 */
declare const notFound: typeof notFound$1;
//# sourceMappingURL=notFound.d.ts.map
//#endregion
//#region src/adapters/next-app-dir/rethrowNextErrors.d.ts
/**
 * Rethrow errors that should be handled by Next.js
 */
declare const rethrowNextErrors: (error: TRPCError) => void;
//# sourceMappingURL=rethrowNextErrors.d.ts.map

//#endregion
export { nextAppDirCaller as experimental_nextAppDirCaller, notFound as experimental_notFound, redirect as experimental_redirect, rethrowNextErrors };
//# sourceMappingURL=next-app-dir.d.cts.map