import {useState} from "react";
import usePromise from "../utilities/usePromise";
import Button from "../components/Button.component";
import {useNavigate} from "react-router";
import useAuthService from "../services/auth.service";
import useOnInit from "../utilities/onInit";

export default function Login() {
  const navigator = useNavigate();
  const auth = useAuthService();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginResult, doLogin, optsLogin] = usePromise(
    () => auth.login(username, password),
    (result) => {
      if (result) {
        setTimeout(() => {
          // navigator('/');
        }, 5000);
      }
    }
  );

  useOnInit(() => {
    if (auth.isAuthenticated) {
      navigator('/');
    }
  })

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="ui-panel gap-6 p-24 w-3/4 lg:w-1/4">
        <input
          className="w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username: anything"
        />
        <input
          className="w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password: 1234"
          type="password"
        />
        <Button
          onClick={doLogin}
          loading={optsLogin.loading}
          className="transition-all w-1/3 hover:w-full mt-6"
          disabled={!username || !password || !!loginResult}
        >
          Login
        </Button>
        <div className="w-full flex items-center justify-center">
          {loginResult ? (
            <span className="text-center">
              Logged in successfully, welcome to the super-secret movies archive.
              facility
              You will be redirected shortly...
            </span>
          ) : (
            optsLogin.errorElement
          )}
        </div>
      </div>
    </div>
  );
}
