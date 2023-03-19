
import { UserLogInPage } from "../../User/Pages/UserLogInPage";

import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import { IconSelectPage } from "../../Icon/Pages/IconSelectPage";
import { UserViewPage } from "../../User/Pages/UserViewPage";
import { UserUpdatePage } from "../../User/Pages/UserUpdatePage";
import { IconUpdatePage } from "../../Icon/Pages/IconUpdatePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLogInPage />,
    loader : ()=>{
      return redirect("/user/login")
    }
  },
  {
    path: "/user/login",
    element: <UserLogInPage />,
    action : ()=> null
  },
  {
    path: "/user/view",
    element: <UserViewPage />,
  },
  {
    path: "/user/update",
    element: <UserUpdatePage />,
  },
  {
    path: "/paths/publics",
    element: <IconSelectPage actif={"public"} />,
  },
  {
    path: "/paths/privates",
    element: <IconSelectPage actif={"private"} />,
  },
  {
    path: "/paths/new",
    element: <IconUpdatePage/>,
  },
  {
    path: "/paths/update",
    element: <IconUpdatePage />,
  },
]);