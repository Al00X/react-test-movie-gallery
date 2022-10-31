import { StoreToken } from "./utilities/useStorage";

export const AUTH_STORAGE_TOKEN = new StoreToken<{
    username: string;
}>("auth");
