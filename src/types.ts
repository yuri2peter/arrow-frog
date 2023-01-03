export type Recipe<T> = (base: T) => void;
export type RefStore<T> = { current: T; handleStoreChanged: () => void };

export interface ContextValue<T> {
  store: T;
}
