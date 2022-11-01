import "./MovieGallery.component.css";
import useMovieDbService from "../services/moviedb.service";
import useOnInit from "../utilities/onInit";
import usePromise from "../utilities/usePromise";
import { ENVIRONMENT } from "../environment";
import { useEffect, useState } from "react";
import useUserService from "../services/user.service";
import {IMovie, UIMovie} from "../models/moviedb.models";
import useDebounce from "../utilities/useDebounce";
import Button from "./Button.component";

export default function MovieGallery(props: { searchTerm?: string }) {
  const userService = useUserService();
  const movieDbService = useMovieDbService();

  const [movies, setMovies] = useState<UIMovie[] | undefined>(undefined);
  const debouncedSearchTerm = useDebounce<
    string | undefined
  >(props.searchTerm ?? undefined, 300);

  const [allMovies, getAllMovies, allMoviesRequestState] = usePromise(
    () => movieDbService.getUpcoming(),
    (result) => {
      updateMovies(result.data.results);
    }
  );
  const [searchedMovies, doSearch, searchRequestState] = usePromise(
    () => movieDbService.search(props.searchTerm!),
    (result) => {
      updateMovies(result.data.results);
    }
  );

  useOnInit(() => {
    getAllMovies();
  });

  useEffect(() => {
    if (debouncedSearchTerm === "") {
      updateMovies(allMovies?.data.results ?? undefined);
    }
    if ((debouncedSearchTerm ?? "").length >= 3) {
      doSearch();
    } else {
      // setMovies(undefined);
    }
  }, [debouncedSearchTerm]);

  function updateMovies(movies: IMovie[] | undefined) {
    if (movies === undefined) {
      setMovies(undefined);
      return;
    }
    const userCollectionIds = Object.keys(userService.state?.collection ?? {});
    setMovies(movies.map(x => ({
      ...x,
      favorite: userService.collectionIds.includes(x.id),
    })))
  }

  function toggleMovieFavorite(item: UIMovie) {
    userService.toggleFavorite(item);
    item.favorite = !item.favorite;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {searchRequestState.loaderElement ??
      allMoviesRequestState.loaderElement ??
      searchRequestState.errorElement ??
      allMoviesRequestState.errorElement ??
      ((debouncedSearchTerm &&
        debouncedSearchTerm.length > 0 &&
        debouncedSearchTerm.length < 3) ? (
        <p>Search term should be at least 3 characters or more...</p>
      ) : movies && movies.length > 0 ? (
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-8 items-center">
          {movies!.map((item, index) => (
            <div
              key={item.id}
              className="ui-panel relative w-full h-full py-8 rounded-xl p-0 flex flex-col items-center"
            >
              <Button className={`${item.favorite ? 'bg-error text-white border-white' : 'text-primary-bright opacity-70'} transition-all absolute left-2 top-2 text-xs p-1`} onClick={() => toggleMovieFavorite(item)}>Favorite</Button>
              <div
                className="overflow-hidden rounded-lg bg-primary-darkest"
                style={{ width: 300, height: 450 }}
              >
                <img
                  className="cover"
                  src={
                    ENVIRONMENT.TheMovieDbImagesBaseUrl(300) + item.poster_path
                  }
                  alt="no cover"
                />
              </div>
              <span className="text-2xl font-bold mt-4 flex flex-col items-center gap-2 px-8 text-center">
                {item.title}
                <span className="opacity-30 tracking-wider font-medium text-lg">
                  {item.release_date}
                </span>
              </span>
              <span className="movie-desc opacity-70">{item.overview}</span>
            </div>
          ))}
        </div>
      ) : movies ? (
        <p>No result...</p>
      ) : <></>)}
    </div>
  );
}
