import axios from "axios";
import {ENVIRONMENT} from "../environment";
import {IMovie, PaginatedResponse} from "../models/moviedb.models";

const http = axios.create({
    baseURL: ENVIRONMENT.TheMovieDbBaseUrl,
    headers: {
        Authorization: `Bearer ${ENVIRONMENT.TheMovieDbV4}`
    },
    responseType: 'json'
})
export default function useMovieDbService() {
    return {
        getUpcoming: () => http.get<PaginatedResponse<IMovie>>('/movie/upcoming'),
        search: (term: string) => http.get<PaginatedResponse<IMovie>>('/search/movie', {
            params: {
                query: term,
            }
        })
    }
}
