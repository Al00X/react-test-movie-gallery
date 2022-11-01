import { Outlet, useNavigate } from "react-router";
import AuthGuard from "../guards/Auth.guard";
import useAuthService from "../services/auth.service";
import Button from "../components/Button.component";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function HomeLayout() {
  const navigator = useNavigate();
  const auth = useAuthService();

  const [navLinks] = useState([
    { text: "Movies", link: "/" },
    { text: "Favorites", link: "/favorites" },
    { text: "Logout", action: () => auth.logout() },
  ]);

  return (
    <AuthGuard>
      <div className="w-full flex items-center p-4 bg-primary-darkest border-b-2 border-primary-darker relative">
        <p className="font-bold text-3xl">THE MOVIE ARCHIVE</p>
        <span className="ml-auto">Welcome home {auth.state?.username} !</span>
        <div className="flex gap-4 ml-6">
          {navLinks.map((item) => (
            <NavLink
              to={item.link ?? ""}
              end
              className={({isActive}) => (isActive && item.link ? "opacity-30 pointer-events-none" : "")}
            >
              <Button className="w-full" onClick={item.action}>
                  {item.text}
              </Button>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="p-8">
        <Outlet />
      </div>
    </AuthGuard>
  );
}
