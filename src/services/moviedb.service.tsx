import axios from "axios";
import {ENVIRONMENT} from "../environment";
import {IMovie, PaginatedResponse} from "../models/moviedb.models";

const httpService = axios.create({
    baseURL: ENVIRONMENT.TheMovieDbBaseUrl,
    headers: {
        Authorization: `Bearer ${ENVIRONMENT.TheMovieDbV4}`
    },
    responseType: 'json'
})
export default function useMovieDbService() {
    return {
        getUpcoming: () => httpService.get<PaginatedResponse<IMovie>>('/movie/upcoming'),
        search: (term: string) => httpService.get<PaginatedResponse<IMovie>>('/search/movie', {
            params: {
                query: term,
            }
        })
    }
}
