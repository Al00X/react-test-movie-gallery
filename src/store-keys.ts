import { StoreToken } from "./utilities/useStorage";

export const AUTH_STORAGE_TOKEN = new StoreToken<{
    username: string;
}>("auth");

export const USER_STORAGE_TOKEN = new StoreToken<{
    favorites: number[];
    comments: {[p: number]: string};
}>("user");
