import "../Style/App.style.css";

import { RouterProvider } from "react-router-dom";
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
