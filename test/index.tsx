import React from "react";
import { createStore } from "../src/index";

interface Store {
  a: number;
  b: string;
}

const defaultStore: Store = {
  a: 1,
  b: "hello",
};

const selectB = (s: Store) => s.b;

// Init store with default value
const { getStore, changeStore, useStore, useSelector, StoreProvider } =
  createStore(defaultStore);

async function testChangeValue() {
  console.log(getStore()); // a: 1

  // Change value with immer syntax
  changeStore((s) => {
    s.a++;
  });
  console.log(getStore()); // a: 2
}

const MyApp = () => (
  <StoreProvider>
    <MyPage />
  </StoreProvider>
);

const MyPage = () => {
  const { a } = useStore();
  const b = useSelector(selectB);
  return (
    <div>
      {a} {b}
    </div>
  );
};

testChangeValue();
