import React from "react";
import { produce, Immutable } from "immer";
import { RefStore, Recipe, ContextValue } from "./types";

export function getFuncGetStore<T>(refStore: RefStore<T>) {
  return () => {
    return refStore.current;
  };
}

export function getFuncChangeStore<T>(refStore: RefStore<T>) {
  return (recipe: Recipe<T>) => {
    const newValue = produce(recipe)(refStore.current as Immutable<T>);
    refStore.current = newValue as T;
    refStore.handleStoreChanged();
  };
}

export function getProvider<T>(
  refStore: RefStore<T>,
  Context: React.Context<ContextValue<T>>
) {
  const StoreProvider = ({
    children = null,
  }: {
    children?: React.ReactNode;
  }) => {
    const [store, setStore] = React.useState(refStore.current);
    React.useLayoutEffect(() => {
      refStore.handleStoreChanged = () => {
        setStore(refStore.current);
      };
    }, []);
    return (
      <Context.Provider
        value={{
          store,
        }}
      >
        {children}
      </Context.Provider>
    );
  };
  return StoreProvider;
}

export function getHookUseStore<T>(Context: React.Context<ContextValue<T>>) {
  return () => {
    const { store } = React.useContext(Context);
    return store;
  };
}

export function getHookUseSelector<T>(Context: React.Context<ContextValue<T>>) {
  function useSelector<P>(selector: (d: T) => P) {
    const { store } = React.useContext(Context);
    const results = selector(store);
    return results;
  }
  return useSelector;
}
