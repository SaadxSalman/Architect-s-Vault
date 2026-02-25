import type * as Dom from './types.dom.js';
import type { Variables } from './types.js';
/**
 * Returns Multipart Form if body contains files
 * (https://github.com/jaydenseric/graphql-multipart-request-spec)
 * Otherwise returns JSON
 */
declare const createRequestBody: (query: string | string[], variables?: Variables | Variables[], operationName?: string, jsonSerializer?: Dom.JsonSerializer) => string | Dom.FormData;
export default createRequestBody;
//# sourceMappingURL=createRequestBody.d.ts.map