import "../index.d-BiUz7kM_.cjs";
import { AnyRouter, BaseHandlerOptions, CreateContextCallback, MaybePromise, inferRouterContext } from "../unstable-core-do-not-import.d-BJCeJk5P.cjs";
import "../index.d-CvZXeEyR.cjs";
import { NodeHTTPCreateContextFnOptions } from "../index.d-VIbIrmxd.cjs";
import { IncomingMessage } from "http";
import ws from "ws";

//#region src/adapters/ws.d.ts

/**
 * @public
 */
type CreateWSSContextFnOptions = NodeHTTPCreateContextFnOptions<IncomingMessage, ws.WebSocket>;
/**
 * @public
 */
type CreateWSSContextFn<TRouter extends AnyRouter> = (opts: CreateWSSContextFnOptions) => MaybePromise<inferRouterContext<TRouter>>;
type WSConnectionHandlerOptions<TRouter extends AnyRouter> = BaseHandlerOptions<TRouter, IncomingMessage> & CreateContextCallback<inferRouterContext<TRouter>, CreateWSSContextFn<TRouter>>;
/**
 * Web socket server handler
 */
type WSSHandlerOptions<TRouter extends AnyRouter> = WSConnectionHandlerOptions<TRouter> & {
  wss: ws.WebSocketServer;
  prefix?: string;
  keepAlive?: {
    /**
     * Enable heartbeat messages
     * @default false
     */
    enabled: boolean;
    /**
     * Heartbeat interval in milliseconds
     * @default 30_000
     */
    pingMs?: number;
    /**
     * Terminate the WebSocket if no pong is received after this many milliseconds
     * @default 5_000
     */
    pongWaitMs?: number;
  };
  /**
   * Disable responding to ping messages from the client
   * **Not recommended** - this is mainly used for testing
   * @default false
   */
  dangerouslyDisablePong?: boolean;
};
declare function getWSConnectionHandler<TRouter extends AnyRouter>(opts: WSSHandlerOptions<TRouter>): (client: ws.WebSocket, req: IncomingMessage) => void;
/**
 * Handle WebSocket keep-alive messages
 */
declare function handleKeepAlive(client: ws.WebSocket, pingMs?: number, pongWaitMs?: number): void;
declare function applyWSSHandler<TRouter extends AnyRouter>(opts: WSSHandlerOptions<TRouter>): {
  broadcastReconnectNotification: () => void;
};
//# sourceMappingURL=ws.d.ts.map

//#endregion
export { CreateWSSContextFn, CreateWSSContextFnOptions, WSConnectionHandlerOptions, WSSHandlerOptions, applyWSSHandler, getWSConnectionHandler, handleKeepAlive };
//# sourceMappingURL=ws.d.cts.map