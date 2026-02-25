import type { RequestState } from '@clerk/backend';
import type { ServerResponse } from 'http';
import type { AuthenticateRequestParams, ClerkClient } from './types';
export declare function loadInterstitial({ clerkClient, requestState, }: {
    clerkClient: ClerkClient;
    requestState: RequestState;
}): Promise<string>;
export declare const authenticateRequest: (opts: AuthenticateRequestParams) => Promise<RequestState>;
export declare const handleUnknownCase: (res: ServerResponse, requestState: RequestState) => void;
export declare const handleInterstitialCase: (res: ServerResponse, requestState: RequestState, interstitial: string) => void;
export declare const decorateResponseWithObservabilityHeaders: (res: ServerResponse, requestState: RequestState) => void;
//# sourceMappingURL=authenticateRequest.d.ts.map