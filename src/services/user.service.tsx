import useStorage from "../utilities/useStorage";
import { USER_STORAGE_TOKEN } from "../store-keys";
import useOnInit from "../utilities/onInit";
import { IMovie } from "../models/moviedb.models";
import { useMemo } from "react";

export default function useUserService() {
  const [userStore, setUserStore, patchUserStore] =
    useStorage(USER_STORAGE_TOKEN);

  useOnInit(() => {
    if (userStore === null) {
      setUserStore({
        collection: {},
      });
    }
  });

  return useMemo(
    () => {
        return ({
            state: userStore,
            collectionIds: Object.keys(userStore?.collection ?? {}).map(x => +x),
            toggleFavorite: (item: IMovie) => {
                const collection = userStore?.collection ?? {};
                if (collection[item.id] === undefined) {
                    collection[item.id] = {
                        ...item,
                        favorite: true,
                        comment: "",
                    };
                } else {
                    delete collection[item.id];
                }
                patchUserStore({
                    collection: collection,
                });
            },
            setComment(id: number, text: string | null) {
                const collection = userStore?.collection ?? [];
                const item = collection[id];
                if (item) {
                    item.comment = text ?? "";
                }
                patchUserStore({
                    collection: collection,
                });
            },
        })
    },
    [userStore]
  );
}
