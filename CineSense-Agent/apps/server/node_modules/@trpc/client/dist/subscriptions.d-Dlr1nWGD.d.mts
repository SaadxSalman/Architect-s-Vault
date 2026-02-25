//#region src/links/internals/subscriptions.d.ts
interface ConnectionStateBase<TError> {
  type: 'state';
  data?: never;
  error: TError | null;
}
interface ConnectionIdleState extends ConnectionStateBase<null> {
  state: 'idle';
}
interface ConnectionConnectingState<TError> extends ConnectionStateBase<TError | null> {
  state: 'connecting';
}
interface ConnectionPendingState extends ConnectionStateBase<null> {
  state: 'pending';
}
type TRPCConnectionState<TError> = ConnectionIdleState | ConnectionConnectingState<TError> | ConnectionPendingState;
//#endregion
export { TRPCConnectionState };
//# sourceMappingURL=subscriptions.d-Dlr1nWGD.d.mts.map