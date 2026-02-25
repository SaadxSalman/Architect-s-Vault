/// <reference types="node" />
import type { IncomingMessage, ServerResponse } from 'http';
export declare function runMiddleware(req: IncomingMessage, res: ServerResponse, fn: (...args: any) => any): Promise<unknown>;
export declare const loadClientEnv: () => {
    publishableKey: string;
    frontendApi: string;
    clerkJSUrl: string;
    clerkJSVersion: string;
};
export declare const loadApiEnv: () => {
    secretKey: string;
    apiKey: string;
    apiUrl: string;
    apiVersion: string;
    domain: string;
    proxyUrl: string;
    signInUrl: string;
    isSatellite: boolean;
    jwtKey: string;
};
//# sourceMappingURL=utils.d.ts.map