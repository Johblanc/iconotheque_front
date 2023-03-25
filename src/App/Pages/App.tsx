import "../Style/App.style.css";

import { RouterProvider } from "react-router-dom";
import { ROUTER } from "../Routes/router";
import { Contextualizer } from "../Components/Contextualizer";
import { ChangeEvent, CSSProperties, useState } from "react";

/**
 * Iconothèque v1 :
 * * Gestionnaire du Context
 * * Gestionnaire des Routes
 *
 * @version v1
 */
export function App(): JSX.Element {

  

  return (
      <Contextualizer>
        <RouterProvider router={ROUTER} />
      </Contextualizer>
  );
}
