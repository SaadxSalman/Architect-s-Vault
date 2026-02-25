import type { Clerk } from '@clerk/backend';
import type { ClerkMiddlewareOptions, MiddlewareRequireAuthProp } from './types';
export type CreateClerkExpressMiddlewareOptions = {
    clerkClient: ReturnType<typeof Clerk>;
    /**
     * @deprecated Use `secretKey` instead.
     */
    apiKey?: string;
    secretKey?: string;
    /**
     * @deprecated Use `publishableKey` instead.
     */
    frontendApi?: string;
    publishableKey?: string;
    apiUrl?: string;
};
export declare const createClerkExpressRequireAuth: (createOpts: CreateClerkExpressMiddlewareOptions) => (options?: ClerkMiddlewareOptions) => MiddlewareRequireAuthProp;
//# sourceMappingURL=clerkExpressRequireAuth.d.ts.map