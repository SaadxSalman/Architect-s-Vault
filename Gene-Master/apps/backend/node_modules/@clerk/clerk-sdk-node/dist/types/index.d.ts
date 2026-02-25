import { Clerk, clerkClient, ClerkExpressRequireAuth, ClerkExpressWithAuth, createClerkClient, setClerkApiKey, setClerkApiVersion, setClerkHttpOptions, setClerkServerApiUrl } from './clerkClient';
import { createClerkExpressRequireAuth } from './clerkExpressRequireAuth';
import { createClerkExpressWithAuth } from './clerkExpressWithAuth';
import type { ClerkMiddleware, ClerkMiddlewareOptions, LooseAuthProp, RequireAuthProp, StrictAuthProp, WithAuthProp } from './types';
export * from '@clerk/backend';
/**
 * The order of these exports is important, as we want Clerk from clerk/sdk-node
 * to shadow the Clerk export from clerk/backend, because it needs to support
 * 2 additional apis: clerk.expressWithAuth, clerk.expressRequireAuth
 */
export { createClerkClient, clerkClient, setClerkApiKey, setClerkApiVersion, setClerkHttpOptions, setClerkServerApiUrl, Clerk, ClerkExpressRequireAuth, ClerkExpressWithAuth, };
declare const users: import("@clerk/backend/dist/types/api/endpoints").UserAPI, smsMessages: import("@clerk/backend/dist/types/api/endpoints").SMSMessageAPI, sessions: import("@clerk/backend/dist/types/api/endpoints").SessionAPI, emailAddresses: import("@clerk/backend/dist/types/api/endpoints").EmailAddressAPI, phoneNumbers: import("@clerk/backend/dist/types/api/endpoints").PhoneNumberAPI, emails: import("@clerk/backend/dist/types/api/endpoints").EmailAPI, invitations: import("@clerk/backend/dist/types/api/endpoints").InvitationAPI, organizations: import("@clerk/backend/dist/types/api/endpoints").OrganizationAPI, clients: import("@clerk/backend/dist/types/api/endpoints").ClientAPI, allowlistIdentifiers: import("@clerk/backend/dist/types/api/endpoints").AllowlistIdentifierAPI, domains: import("@clerk/backend/dist/types/api/endpoints").DomainAPI;
export { users, smsMessages, sessions, emailAddresses, phoneNumbers, emails, invitations, organizations, clients, allowlistIdentifiers, domains, };
export default clerkClient;
export type { LooseAuthProp, StrictAuthProp, WithAuthProp, RequireAuthProp, ClerkMiddleware, ClerkMiddlewareOptions };
export { createClerkExpressRequireAuth };
export { createClerkExpressWithAuth };
export { withAuth } from './withAuth';
export { requireAuth } from './requireAuth';
//# sourceMappingURL=index.d.ts.map