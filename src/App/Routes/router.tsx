import { UserLogInPage } from "../../User/Pages/UserLogInPage";

import { createBrowserRouter, LoaderFunctionArgs, redirect } from "react-router-dom";
import { IconSelectPage } from "../../Icon/Pages/IconSelectPage";
import { UserViewPage } from "../../User/Pages/UserViewPage";
import { UserUpdatePage } from "../../User/Pages/UserUpdatePage";
import { IconUpdatePage } from "../../Icon/Pages/IconUpdatePage";
import { Transition } from "../../Transition/Pages/Transition";
import { IdPage } from "../Pages/IdPage";
import { UserPassUpdatePage } from "../../User/Pages/UserPassUpdatePage";
import { ErrorPage } from "../Pages/ErrorPage";
import { IconViewPage } from "../../Icon/Pages/IconViewPage";
import { IconDeletePage } from "../../Icon/Pages/IconDeletePage";
import { UserAdminPage } from "../../User/Pages/UserAdminPage";
import { UserPromotePage } from "../../User/Pages/UserPromotePage";


/**
 * Elemement de routage simplifié
 *
 * @version v1
 * */
export type TPAGE_CONFIG = {
  path: string ,
  element: JSX.Element ,
  loader?: (...args : any[]) => any ,
  errorElement ? : JSX.Element 
}

/**
 * Les routes du sites sans les transitions
 *
 * @version v1
 * */
export const PAGES_CONFIG : TPAGE_CONFIG[] = [
  {
    path: "/",
    element: <UserLogInPage />,
    loader: () => {
      return redirect("/user/login");
    },
  },
  {
    path: "/user/login",
    element: <UserLogInPage />,
  },
  {
    path: "/user/view",
    element: <UserViewPage />,
  },
  {
    path: "/user/admin",
    element: <UserAdminPage />,
  },
  {
    path: "/user/update",
    element: <UserUpdatePage />,
  },
  {
    path: "/user/passupdate",
    element: <UserPassUpdatePage />,
  },
  {
    path: "/user/promote/:id",
    element: <IdPage />,
    loader : (args : LoaderFunctionArgs | {params : {id : string}})=>{ 
      if (args.params.id)
      {
        return <UserPromotePage userId={Number(args.params.id)}/>
      }
      return <></>
    }
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
    element: <IconUpdatePage pathId={-1} />,
  },
  {
    path: "/paths/update/:id",
    element: <IdPage />,
    loader : (args : LoaderFunctionArgs | {params : {id : string}})=>{ 
      if (args.params.id)
      {
        return <IconUpdatePage pathId={Number(args.params.id)}/>
      }
      return <></>
    }
  },
  {
    path: "/paths/view/:id",
    element: <IdPage />,
    loader : (args : LoaderFunctionArgs | {params : {id : string}})=>{ 
      if (args.params.id)
      {
        return <IconViewPage pathId={Number(args.params.id)}/>
      }
      return <></>
    }
  },
  {
    path: "/paths/delete/:id",
    element: <IdPage />,
    loader : (args : LoaderFunctionArgs | {params : {id : string}})=>{ 
      if (args.params.id)
      {
        return <IconDeletePage pathId={Number(args.params.id)}/>
      }
      return <></>
    }
  },
];

/**
 * Les routes du sites avec les transitions
 *
 * @version v1
 * */
export const ROUTER_CONFIG = PAGES_CONFIG.map((item) => {
  const newItem = { ...item };
  if (newItem.element){
    newItem.element = <Transition>{newItem.element}</Transition>;
  }
  newItem.errorElement = <Transition><ErrorPage /></Transition> ;
  
  return newItem;
});

/**
 * Le router du sites
 *
 * @version v1
 * */
export const ROUTER = createBrowserRouter(ROUTER_CONFIG);
