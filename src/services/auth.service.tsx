import Error from "../components/Error.component";
import useStorage, {STORE_USERNAME} from "../utilities/storage";
import {useNavigate} from "react-router";

export default function useAuthService() {
    const navigator = useNavigate();
    const [username, setUsername] = useStorage(STORE_USERNAME);
    return {
        login: (username: string, password: string) => {
            return new Promise<boolean>((resolve, reject) => {
                setTimeout(() => {
                    if (password === '1234') {
                        setUsername(username);
                        resolve(true);
                    } else {
                        reject(<Error text="Wrong password, please try again."/>);
                    }
                }, 900);
            })
        },
        logout: () => {
            setUsername(null);
            navigator('/login');
        },
        isAuthenticated: username !== null,
        username: username,
    }
}
