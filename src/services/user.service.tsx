import useStorage from "../utilities/useStorage";
import {USER_STORAGE_TOKEN} from "../store-keys";
import useOnInit from "../utilities/onInit";

export default function useUserService() {
    const [userStore, setUserStore, patchUserStore] = useStorage(USER_STORAGE_TOKEN);

    useOnInit(() => {
        if (userStore === null) {
            setUserStore({
                favorites: [],
                comments: {},
            })
        }
    })

    return {
        state: userStore,
        toggleFavorite: (id: number) => {
            const array = userStore?.favorites ?? [];
            const itemIndex = array.indexOf(id);
            if (itemIndex === -1) {
                array.push(id);
            } else {
                array.splice(itemIndex, 1);
            }
            patchUserStore({
                favorites: array
            })
        },
        setComment(id: number, text: string | null) {
            const comments = userStore?.comments ?? {};
            if (text) {
                comments[id] = text;
            } else {
                delete comments[id];
            }
            patchUserStore({
                comments: comments
            })
        }
    }
}
