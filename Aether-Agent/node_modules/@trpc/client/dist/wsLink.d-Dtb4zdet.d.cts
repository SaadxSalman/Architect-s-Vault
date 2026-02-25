import { TRPCConnectionState } from "./subscriptions.d-Ciljg_dH.cjs";
import { Operation, OperationResultEnvelope, TRPCClientError, TRPCLink } from "./types.d-B2PuQAdV.cjs";
import { TransformerOptions } from "./unstable-internals.d-kWsZTlQq.cjs";
import { AnyRouter, CombinedDataTransformer, inferClientTypes } from "@trpc/server/unstable-core-do-not-import";
import * as _trpc_server_observable0 from "@trpc/server/observable";
import { BehaviorSubject } from "@trpc/server/observable";
import { AnyTRPCRouter } from "@trpc/server";
import { TRPCRequestInfo } from "@trpc/server/http";

//#region src/links/internals/urlWithConnectionParams.d.ts
/**
 * A value that can be wrapped in callback
 */
type CallbackOrValue<T> = T | (() => T | Promise<T>);
interface UrlOptionsWithConnectionParams {
  /**
   * The URL to connect to (can be a function that returns a URL)
   */
  url: CallbackOrValue<string>;
  /**
   * Connection params that are available in `createContext()`
   * - For `wsLink`/`wsClient`, these are sent as the first message
   * - For `httpSubscriptionLink`, these are serialized as part of the URL under the `connectionParams` query
   */
  connectionParams?: CallbackOrValue<TRPCRequestInfo['connectionParams']>;
}
//# sourceMappingURL=urlWithConnectionParams.d.ts.map
//#endregion
//#region src/links/wsLink/wsClient/options.d.ts
interface WebSocketClientOptions extends UrlOptionsWithConnectionParams {
  /**
   * Ponyfill which WebSocket implementation to use
   */
  WebSocket?: typeof WebSocket;
  /**
   * The number of milliseconds before a reconnect is attempted.
   * @default {@link exponentialBackoff}
   */
  retryDelayMs?: (attemptIndex: number) => number;
  /**
   * Triggered when a WebSocket connection is established
   */
  onOpen?: () => void;
  /**
   * Triggered when a WebSocket connection encounters an error
   */
  onError?: (evt?: Event) => void;
  /**
   * Triggered when a WebSocket connection is closed
   */
  onClose?: (cause?: {
    code?: number;
  }) => void;
  /**
   * Lazy mode will close the WebSocket automatically after a period of inactivity (no messages sent or received and no pending requests)
   */
  lazy?: {
    /**
     * Enable lazy mode
     * @default false
     */
    enabled: boolean;
    /**
     * Close the WebSocket after this many milliseconds
     * @default 0
     */
    closeMs: number;
  };
  /**
   * Send ping messages to the server and kill the connection if no pong message is returned
   */
  keepAlive?: {
    /**
     * @default false
     */
    enabled: boolean;
    /**
     * Send a ping message every this many milliseconds
     * @default 5_000
     */
    intervalMs?: number;
    /**
     * Close the WebSocket after this many milliseconds if the server does not respond
     * @default 1_000
     */
    pongTimeoutMs?: number;
  };
}
/**
 * Default options for lazy WebSocket connections.
 * Determines whether the connection should be established lazily and defines the delay before closure.
 */
//#endregion
//#region src/links/wsLink/wsClient/wsClient.d.ts
/**
 * A WebSocket client for managing TRPC operations, supporting lazy initialization,
 * reconnection, keep-alive, and request management.
 */
declare class WsClient {
  /**
   * Observable tracking the current connection state, including errors.
   */
  readonly connectionState: BehaviorSubject<TRPCConnectionState<TRPCClientError<AnyTRPCRouter>>>;
  private allowReconnect;
  private requestManager;
  private readonly activeConnection;
  private readonly reconnectRetryDelay;
  private inactivityTimeout;
  private readonly callbacks;
  private readonly lazyMode;
  constructor(opts: WebSocketClientOptions);
  /**
   * Opens the WebSocket connection. Handles reconnection attempts and updates
   * the connection state accordingly.
   */
  private open;
  /**
   * Closes the WebSocket connection and stops managing requests.
   * Ensures all outgoing and pending requests are properly finalized.
   */
  close(): Promise<void>;
  /**
   * Method to request the server.
   * Handles data transformation, batching of requests, and subscription lifecycle.
   *
   * @param op - The operation details including id, type, path, input and signal
   * @param transformer - Data transformer for serializing requests and deserializing responses
   * @param lastEventId - Optional ID of the last received event for subscriptions
   *
   * @returns An observable that emits operation results and handles cleanup
   */
  request({
    op: {
      id,
      type,
      path,
      input,
      signal
    },
    transformer,
    lastEventId
  }: {
    op: Pick<Operation, 'id' | 'type' | 'path' | 'input' | 'signal'>;
    transformer: CombinedDataTransformer;
    lastEventId?: string;
  }): _trpc_server_observable0.Observable<OperationResultEnvelope<unknown, TRPCClientError<AnyTRPCRouter>>, TRPCClientError<AnyTRPCRouter>>;
  get connection(): {
    readonly id: number;
    readonly state: "open";
    readonly ws: WebSocket;
  } | {
    readonly id: number;
    readonly state: "closed";
    readonly ws: WebSocket;
  } | {
    readonly id: number;
    readonly state: "connecting";
    readonly ws: WebSocket;
  } | null;
  /**
   * Manages the reconnection process for the WebSocket using retry logic.
   * Ensures that only one reconnection attempt is active at a time by tracking the current
   * reconnection state in the `reconnecting` promise.
   */
  private reconnecting;
  private reconnect;
  private setupWebSocketListeners;
  private handleResponseMessage;
  private handleIncomingRequest;
  /**
   * Sends a message or batch of messages directly to the server.
   */
  private send;
  /**
   * Groups requests for batch sending.
   *
   * @returns A function to abort the batched request.
   */
  private batchSend;
}
//# sourceMappingURL=wsClient.d.ts.map
//#endregion
//#region src/links/wsLink/createWsClient.d.ts
declare function createWSClient(opts: WebSocketClientOptions): WsClient;
type TRPCWebSocketClient = ReturnType<typeof createWSClient>;
//#endregion
//#region src/links/wsLink/wsLink.d.ts
type WebSocketLinkOptions<TRouter extends AnyRouter> = {
  client: TRPCWebSocketClient;
} & TransformerOptions<inferClientTypes<TRouter>>;
declare function wsLink<TRouter extends AnyRouter>(opts: WebSocketLinkOptions<TRouter>): TRPCLink<TRouter>;
//#endregion
export { TRPCWebSocketClient, UrlOptionsWithConnectionParams, WebSocketClientOptions, WebSocketLinkOptions, createWSClient, wsLink };
//# sourceMappingURL=wsLink.d-Dtb4zdet.d.cts.map