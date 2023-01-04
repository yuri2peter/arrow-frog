# @yuri2/arrow-frog

![Logo](./doc/logo.webp)

`@yuri2/arrow-frog` is a react state management with only 80 lines of core code.

## Features

- Small size
- No boilerplate code
- Unified global state
- Easy-to-use API
- Typescript supported

## Install

`npm i @yuri2/arrow-frog`

> `react(16.8+)` is needed in your project.

## Quick Start

```tsx
import React from "react";
import { createStore } from "@yuri2/arrow-frog";

// First create a store.
const { changeStore, useStore, StoreProvider } = createStore({
  a: 1,
  b: "hello",
});

// Then bind your components, and that's it!
const MyApp = () => (
  <StoreProvider>
    <MyPage />
  </StoreProvider>
);

const MyPage = () => {
  const { a } = useStore();
  React.useEffect(() => {
    setTimeout(() => {
      changeStore((s) => {
        s.a++;
      });
    }, 1000);
  }, []);
  return <div>{a}</div>;
};
```

> Make sure `changeStore` is the only way to change the value of your store. It uses [immerjs/immer](https://github.com/immerjs/immer) inside.

## Advanced Usage

### 1. Use Anywhere!

```ts
// store.ts
export const { getStore, changeStore, useStore, useSelector, StoreProvider } =
  createStore(defaultStore);
```

```ts
// amount.ts
import { getStore, changeStore } from "store.ts";

export function addAmount() {
  changeStore((s) => {
    s.amount++;
  });
}

export async function addAmountAsync() {
  changeStore((s) => {
    s.amount++;
  });
}

export function logAmount() {
  const { amount } = getStore();
  console.log(amount);
}
```

### 2.Assemble Your Store

```ts
// store/index.ts
import { createStore } from "@yuri2/arrow-frog";
import { todoSlice } from "./todo";
import { userSlice } from "./user";

export const { getStore, useSelector, changeStore, StoreProvider, useStore } =
  createStore({
    todo: todoSlice,
    user: userSlice,
  });

export type Store = ReturnType<typeof getStore>;
```

```ts
// store/todo.ts
import { changeStore } from "./index.ts";

interface TodoSlice {
  list: Todo[];
}

export const todoSlice: TodoSlice = { list: [] };
export function addTodo(todo: Todo) {
  changeStore((s) => s.list.push(todo));
}
```

```ts
// store/user.ts
import { changeStore, Store } from "./index.ts";

interface UserSlice {
  logged: boolean;
}

export const userSlice: UserSlice = { logged: false };
export const selectUserLogged = (s: Store) => s.logged;
export function login() {
  changeStore((s) => (s.logged = true));
}
```

### 3.Use Selectors

```ts
// components/List.tsx
import React from "react";
import { useSelector } from "../store";
import { selectUserLogged } from "../store/user";

const List: React.FC<{}> = () => {
  const logged = useSelector(selectUserLogged);
  return <div>{logged ? "true" : "false"}</div>;
};

export default List;
```

> [reselect](https://www.npmjs.com/package/reselect) is recommanded.

## Why Arrow Frog

These creatures are small but powerful.

> Aren't they cute?
