import { useEffect, useState } from "react";
import { DEFAULT_USER } from "../../Utilities/Constants/User.defaut";
import { PageContext } from "../../Utilities/Contexts/Page.context";
import { PathPrivateContext } from "../../Utilities/Contexts/PathPrivate.context";
import { PathPublicContext } from "../../Utilities/Contexts/PathPublic.context";
import { UserContext } from "../../Utilities/Contexts/User.context";
import { Requester } from "../../Utilities/Requester/Requester";
import { TPath } from "../../Utilities/Types/Path.type";
import "../Style/App.style.css";

import { RouterProvider } from "react-router-dom";
import { IconSelectPage } from "../../Icon/Pages/IconSelectPage";
import { ROUTER } from "../Routes/router";
import { Contextualizer } from "./Contextualizer";

/**
 * Iconothèque v1 :
 * * Gestionnaire du Context
 * * Gestionnaire des Routes
 *
 * @version v1
 */
export function App(): JSX.Element {
  return (
    <div className="App">
      <Contextualizer>
        <RouterProvider router={ROUTER} />
      </Contextualizer>
    </div>
  );
}
