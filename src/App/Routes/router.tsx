import { UserLogInPage } from "../../User/Pages/UserLogInPage";

import { createBrowserRouter, LoaderFunctionArgs } from "react-router-dom";
import { PathSelectPage } from "../../Path/Pages/PathSelectPage";
import { UserViewPage } from "../../User/Pages/UserViewPage";
import { UserUpdatePage } from "../../User/Pages/UserUpdatePage";
import { PathUpdatePage } from "../../Path/Pages/PathUpdatePage";
import { Transition } from "../../Transition/Pages/Transition";
import { IdPage } from "../Pages/IdPage";
import { UserPassUpdatePage } from "../../User/Pages/UserPassUpdatePage";
import { ErrorPage } from "../Pages/ErrorPage";
import { PathViewPage } from "../../Path/Pages/PathViewPage";
import { PathDeletePage } from "../../Path/Pages/PathDeletePage";
import { UserAdminPage } from "../../User/Pages/UserAdminPage";
import { UserPromotePage } from "../../User/Pages/UserPromotePage";
import { AccueilPage } from "../Pages/AccueilPage";
import { IconsSelectPage } from "../../Icons/Pages/IconsSelectPage";
import { IconsDeletePage } from "../../Icons/Pages/IconsDeletePage";
import { IconsViewPage } from "../../Icons/Pages/IconsViewPage";
import { IconsUpdatePage } from "../../Icons/Pages/IconsUpdatePage";
import { AspectsSelectPage } from "../../Aspects/Pages/AspectsSelectPage";
import { AspectsUpdatePage } from "../../Aspects/Pages/AspectsUpdatePage";
import { AspectsDeletePage } from "../../Aspects/Pages/AspectsDeletePage";
import { AspectsViewPage } from "../../Aspects/Pages/AspectsViewPage";


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
 * @version v2
 * */
export const PAGES_CONFIG : TPAGE_CONFIG[] = [
  {
    path: "/",
    element: <AccueilPage/>,
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
    element: <PathSelectPage actif={"public"} />,
  },
  {
    path: "/paths/privates",
    element: <PathSelectPage actif={"private"} />,
  },
  {
    path: "/paths/new",
    element: <PathUpdatePage pathId={-1} />,
  },
  {
    path: "/paths/update/:id",
    element: <IdPage />,
    loader : (args : LoaderFunctionArgs | {params : {id : string}})=>{ 
      if (args.params.id)
      {
        return <PathUpdatePage pathId={Number(args.params.id)}/>
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
        return <PathViewPage pathId={Number(args.params.id)}/>
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
        return <PathDeletePage pathId={Number(args.params.id)}/>
      }
      return <></>
    }
  },

  
  {
    path: "/icons/publics",
    element: <IconsSelectPage actif={"public"} />,
  },
  {
    path: "/icons/privates",
    element: <IconsSelectPage actif={"private"} />,
  },
  {
    path: "/icons/new",
    element: <IconsUpdatePage iconId={-1} />,
  },
  {
    path: "/icons/update/:id",
    element: <IdPage />,
    loader : (args : LoaderFunctionArgs | {params : {id : string}})=>{ 
      if (args.params.id)
      {
        return <IconsUpdatePage iconId={Number(args.params.id)}/>
      }
      return <></>
    }
  },
  {
    path: "/icons/view/:id",
    element: <IdPage />,
    loader : (args : LoaderFunctionArgs | {params : {id : string}})=>{ 
      if (args.params.id)
      {
        return <IconsViewPage iconId={Number(args.params.id)}/>
      }
      return <></>
    }
  },
  {
    path: "/icons/delete/:id",
    element: <IdPage />,
    loader : (args : LoaderFunctionArgs | {params : {id : string}})=>{ 
      if (args.params.id)
      {
        return <IconsDeletePage iconId={Number(args.params.id)}/>
      }
      return <></>
    }
  },

  
  {
    path: "/aspects/privates",
    element: <AspectsSelectPage actif={"private"} />,
  },
  {
    path: "/aspects/new",
    element: <AspectsUpdatePage aspectId={-1} />,
  },
  {
    path: "/aspects/update/:id",
    element: <IdPage />,
    loader : (args : LoaderFunctionArgs | {params : {id : string}})=>{ 
      if (args.params.id)
      {
        return <AspectsUpdatePage aspectId={Number(args.params.id)}/>
      }
      return <></>
    }
  },
  {
    path: "/aspects/view/:id",
    element: <IdPage />,
    loader : (args : LoaderFunctionArgs | {params : {id : string}})=>{ 
      if (args.params.id)
      {
        return <AspectsViewPage aspectId={Number(args.params.id)}/>
      }
      return <></>
    }
  },
  {
    path: "/aspects/delete/:id",
    element: <IdPage />,
    loader : (args : LoaderFunctionArgs | {params : {id : string}})=>{ 
      if (args.params.id)
      {
        return <AspectsDeletePage aspectId={Number(args.params.id)}/>
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
