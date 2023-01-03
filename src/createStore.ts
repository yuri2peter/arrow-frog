import React from "react";
import {
  getFuncGetStore,
  getFuncChangeStore,
  getProvider,
  getHookUseStore,
  getHookUseSelector,
} from "./creators";
import { ContextValue, RefStore } from "./types";

/**
 * Create a store and return the corresponding provider component and hook functions.
 * @param defaultValue T extends {}
 */
export default function createStore<T>(defaultValue: T) {
  const Context = React.createContext({} as ContextValue<T>);
  const refStore: RefStore<T> = {
    current: defaultValue,
    handleStoreChanged: () => {},
  };
  return {
    getStore: getFuncGetStore(refStore),
    changeStore: getFuncChangeStore(refStore),
    StoreProvider: getProvider(refStore, Context),
    useStore: getHookUseStore(Context),
    useSelector: getHookUseSelector(Context),
  };
}
