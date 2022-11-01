import axios from "axios";
import {ENVIRONMENT} from "../environment";
import {Movie, PaginatedResponse} from "../models/moviedb.models";

const http = axios.create({
    baseURL: ENVIRONMENT.TheMovieDbBaseUrl,
    headers: {
        Authorization: `Bearer ${ENVIRONMENT.TheMovieDbV4}`
    },
    responseType: 'json'
})
export default function useMovieDbService() {
    return {
        getUpcoming: () => http.get<PaginatedResponse<Movie>>('/movie/upcoming'),
        search: (term: string) => http.get<PaginatedResponse<Movie>>('/search/movie', {
            params: {
                query: term,
            }
        })
    }
}
