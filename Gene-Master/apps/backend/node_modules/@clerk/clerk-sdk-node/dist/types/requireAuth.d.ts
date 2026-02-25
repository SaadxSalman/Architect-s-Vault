import type { Request, Response } from 'express';
import type { ClerkMiddlewareOptions, RequireAuthProp } from './types';
type ExpressApiHandlerRequireAuth<T = any> = (req: RequireAuthProp<Request>, res: Response<T>) => void | Promise<void>;
export declare function requireAuth(handler: ExpressApiHandlerRequireAuth, options?: ClerkMiddlewareOptions): any;
export {};
//# sourceMappingURL=requireAuth.d.ts.map