import { useState } from "react";

// Used this token to save your localStorage keys and use it with useStorage()
export class StoreToken {
  constructor(public key: string) {}
}

// return => Array [ localStorageValue, setLocalStorageValue]
export default function useStorage(token: StoreToken | string) {
  const [value, setValue] = useState(StorageAdapter.get(token));
  return [
    value,
    (newValue: string | null) => {
      setValue(newValue);
      StorageAdapter.set(token, newValue);
    },
  ] as [string | null, (value: string | null) => void];
}

export const StorageAdapter = {
  get: (token: StoreToken | string) =>
    localStorage.getItem(typeof token === "string" ? token : token.key) as
      | string
      | null,
  set: (token: StoreToken | string, value: string | null) =>
    value ? localStorage.setItem(
      typeof token === "string" ? token : token.key,
      value
    ) : localStorage.removeItem(typeof token === "string" ? token : token.key),
};
