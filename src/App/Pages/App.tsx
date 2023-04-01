import "../Style/App.style.css";
import "../Style/Theme.style.css";
import "../Style/Shade.style.css";
import "../Style/Btn.style.css";
import "../Style/Sizing.style.css";
import "../Style/Svg.style.css";

import { RouterProvider } from "react-router-dom";
import { ROUTER } from "../Routes/router";
import { Contextualizer } from "../Components/Contextualizer";

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
