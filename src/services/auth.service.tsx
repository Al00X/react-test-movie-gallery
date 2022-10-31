import Error from "../components/Error.component";
import useStorage from "../utilities/useStorage";
import {useNavigate} from "react-router";
import {AUTH_STORAGE_TOKEN} from "../store-keys";

export default function useAuthService() {
    const navigator = useNavigate();
    const [auth, setAuth] = useStorage(AUTH_STORAGE_TOKEN);
    return {
        login: (username: string, password: string) => {
            return new Promise<boolean>((resolve, reject) => {
                setTimeout(() => {
                    if (password === '1234') {
                        setAuth({
                            username
                        });
                        resolve(true);
                    } else {
                        reject(<Error text="Wrong password, please try again."/>);
                    }
                }, 900);
            })
        },
        logout: () => {
            setAuth(null);
            navigator('/login');
        },
        isAuthenticated: !!auth?.username,
        state: auth,
    }
}
