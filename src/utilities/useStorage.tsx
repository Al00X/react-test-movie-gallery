/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

// Used this token to save your localStorage keys and use it with useStorage()
export class StoreToken<T> {
  constructor(public key: string) {}
}

// return => Array [ localStorageValue, setLocalStorageValue, patchLocalStorageValue]
export default function useStorage<T>(token: StoreToken<T> | string) {
  const [value, setValue] = useState(StorageAdapter.get(token));
  return [
    value,
    (newValue: T | null) => {
      setValue(newValue);
      StorageAdapter.set(token, newValue);
    },
    (newValue: Partial<T>) => {
      const patchedValue: T = {
        ...value ?? {},
        ...newValue
      } as any;
      setValue(patchedValue);
      StorageAdapter.set(token, patchedValue);
    }
  ] as [T | null, (value: T | null) => void, (value: Partial<T>) => void];
}

// Helper for localStorage api
export const StorageAdapter = {
  get: <T,>(token: StoreToken<T> | string) => {
    const value = localStorage.getItem(tokenToKey(token));
    if (!value) {
      return null;
    }
    return JSON.parse(value) as T;
  },
  set: <T,>(token: StoreToken<T> | string, value: T | null) => {
    if (!value) {
      localStorage.removeItem(tokenToKey(token));
      return;
    }
    const stringify = JSON.stringify(value);
    localStorage.setItem(tokenToKey(token), stringify);
  },
};

function tokenToKey(token: StoreToken<any> | string) {
  return typeof token === "string" ? token : token.key;
}
