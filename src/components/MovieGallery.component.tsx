import "./MovieGallery.component.css"
import useMovieDbService from "../services/moviedb.service";
import useOnInit from "../utilities/onInit";
import usePromise from "../utilities/usePromise";
import {ENVIRONMENT} from "../environment";

export default function MovieGallery(props: { searchTerm?: string }) {
  const movieDbService = useMovieDbService();
  const [allMovies, getAllMovies, allMoviesRequestOptions] = usePromise(() =>
    movieDbService.getUpcoming()
  );

  useOnInit(() => {
    getAllMovies();
  });

  return (
    <div className="flex items-center justify-center w-full">
      {allMoviesRequestOptions.loaderElement ?? (
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-8 items-center">
            {allMovies?.data.results.map((item, index) => <div key={item.id} className="ui-panel w-full h-full cursor-pointer py-8 rounded-xl p-0 flex flex-col items-center">
                <div className=" overflow-hidden rounded-lg">
                    <img className="cover" src={ENVIRONMENT.TheMovieDbImagesBaseUrl(300) + item.poster_path} alt={item.title} width="300"/>
                </div>
                <span className="text-2xl font-bold mt-4 flex flex-col items-center gap-2 px-8 text-center">{item.title} <span className="opacity-30 tracking-wider font-medium text-lg">{item.release_date}</span></span>
                <span className="movie-desc opacity-70">{item.overview}</span>
            </div>)}
        </div>
      )}
    </div>
  );
}
