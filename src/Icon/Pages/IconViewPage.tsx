
import { useLoaderData } from "react-router-dom";
import { IconView } from "../Components/IconView";

/**
 * Page de visualisation d'un icône
 *
 * @version v1
 */
export function IconViewPage(): JSX.Element {
  const  view  = useLoaderData() as JSX.Element
  
  return (
    <>{view}</>
  );
}
