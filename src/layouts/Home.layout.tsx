import {Outlet} from "react-router";
import AuthGuard from "../guards/Auth.guard";
import useAuthService from "../services/auth.service";
import Button from "../components/Button.component";

export default function HomeLayout() {
    const auth = useAuthService();
    return <AuthGuard>
        <div className="w-full flex items-center p-4 bg-primary-darkest border-b-2 border-primary-darker relative">
            <p className="font-bold text-3xl">THE MOVIE ARCHIVE</p>
            <span className="ml-auto">Welcome home {auth.state?.username} !</span>
            <div className="flex gap-4 ml-6">
                <Button className="w-full">Favorites</Button>
                <Button className="w-full" onClick={auth.logout}>Logout</Button>
            </div>
        </div>
        <div className="p-8">
            <Outlet />
        </div>
    </AuthGuard>
}
