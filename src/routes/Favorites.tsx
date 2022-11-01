import useUserService from "../services/user.service";
import {useState} from "react";
import { UIMovie } from "../models/moviedb.models";
import useOnInit from "../utilities/onInit";
import Loader from "../components/Loader.component";
import {ENVIRONMENT} from "../environment";
import Button from "../components/Button.component";

export default function Favorites() {
  const userService = useUserService();

  const [collection, setCollection] = useState<UIMovie[] | undefined>(
    undefined
  );

  useOnInit(() => {
    setCollection(Object.values(userService.state?.collection ?? {}));
  });

  function setMovieComment(item: UIMovie, value: string) {
    userService.setComment(item.id, value);
    item.comment = value;
  }

  function removeFavorite(item: UIMovie, index: number) {
    userService.toggleFavorite(item);
    const newCollection = [...collection!];
    newCollection.splice(index, 1);
    setCollection(newCollection);
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {collection === undefined ? (
        <Loader />
      ) : collection.length === 0 ? (
        <p>No favorites :(</p>
      ) : collection.map((item, index) => <div key={item.id} className="ui-panel flex flex-row items-start justify-start gap-6 flex-1">
        <div
            className="overflow-hidden rounded-lg flex-none bg-primary-darkest"
            style={{ width: 100, height: 150 }}
        >
          <img src={ENVIRONMENT.TheMovieDbImagesBaseUrl(200) + item.poster_path} alt="no cover" width="100"/>
        </div>
          <div className="flex flex-col gap-4 w-64 h-full">
              <span className="text-2xl font-bold">{item.title}</span>
              <span className="text-sm">{item.release_date}</span>
            <Button className="bg-error transition-all w-fit opacity-70 hover:opacity-100 mt-auto" onClick={() => removeFavorite(item, index)}>Remove</Button>
          </div>
          <textarea defaultValue={item.comment} className="h-full flex-auto" style={{resize: 'none'}} placeholder="Your comment...." onBlur={(e) => setMovieComment(item, e.target.value)}></textarea>
      </div>)}
    </div>
  );
}
