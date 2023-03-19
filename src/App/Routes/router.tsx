
import { UserLogInPage } from "../../User/Pages/UserLogInPage";

import {
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { IconSelectPage } from "../../Icon/Pages/IconSelectPage";
import { UserViewPage } from "../../User/Pages/UserViewPage";
import { UserUpdatePage } from "../../User/Pages/UserUpdatePage";
import { IconUpdatePage } from "../../Icon/Pages/IconUpdatePage";
import { Transition } from "../../Transition/Pages/Transition";




/** 
 * Les routes du sites sans les transitions 
 * 
 * @version v1
 * */
export const PAGES_CONFIG = [
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
    element: <UserViewPage />
  },
  {
    path: "/user/update",
    element: <UserUpdatePage />
  },
  {
    path: "/paths/publics",
    element: <IconSelectPage actif={"public"} />
  },
  {
    path: "/paths/privates",
    element: <IconSelectPage actif={"private"} />
  },
  {
    path: "/paths/new",
    element: <IconUpdatePage/>
  },
  {
    path: "/paths/update",
    element: <IconUpdatePage />
  },
]


/** 
 * Les routes du sites avec les transitions 
 * 
 * @version v1
 * */
export const ROUTER_CONFIG = PAGES_CONFIG.map(item => 
  {
    const newItem = {...item} ;
    newItem.element = <Transition>{newItem.element}</Transition>
    return newItem
  }
  )
  
/**
 * Le router du sites
 * 
 * @version v1
 * */
export const ROUTER = createBrowserRouter(ROUTER_CONFIG);