import {Navigate} from "react-router";
import useAuthService from "../services/auth.service";

export default function AuthGuard(props: {
    children: any
}) {
    const auth = useAuthService();
    return <>
        { auth.isAuthenticated ? props.children : <Navigate to="/login" replace /> }
    </>
}
