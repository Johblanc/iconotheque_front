
import { useLoaderData } from "react-router-dom";

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
