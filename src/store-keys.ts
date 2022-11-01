import { StoreToken } from "./utilities/useStorage";
import {UIMovie} from "./models/moviedb.models";

export const AUTH_STORAGE_TOKEN = new StoreToken<{
    username: string;
}>("auth");

export const USER_STORAGE_TOKEN = new StoreToken<{
    collection?: {[p: number]: UIMovie}
}>("user");
