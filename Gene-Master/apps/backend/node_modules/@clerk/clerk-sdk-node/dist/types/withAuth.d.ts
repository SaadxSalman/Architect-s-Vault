import type { Request, Response } from 'express';
import type { ClerkMiddlewareOptions, WithAuthProp } from './types';
type ApiHandlerWithAuth<TRequest, TResponse> = (req: WithAuthProp<TRequest>, res: TResponse) => void | Promise<void>;
export declare function withAuth<TRequest extends Request = Request, TResponse extends Response = Response>(handler: ApiHandlerWithAuth<TRequest, TResponse>, options?: ClerkMiddlewareOptions): any;
export {};
//# sourceMappingURL=withAuth.d.ts.map