
import { useLoaderData } from "react-router-dom";
import { IconViewPage } from "../../Icon/Pages/IconViewPage";

/**
 * Affichage des page à route variable
 *
 * @version v1
 */
export function IdPage(): JSX.Element {
  const  view  = useLoaderData() as JSX.Element
  
  return (
    <>{view}</>
  );
}
