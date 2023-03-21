import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AppHeader } from "../../App/Components/AppHeader";
import { AppNav } from "../../App/Components/AppNav";
import { LinkCustom } from "../../Utilities/Components/LinkCustom";
import { PathPublicContext } from "../../Utilities/Contexts/PathPublic.context";

/**
 * Page de visualisation d'un icône
 *
 * @version v1
 */
export function IconView(props : { pathId : number }): JSX.Element {
  const  {pathId}  = props
  const {pathPublic} = useContext(PathPublicContext)
  
  return (
    <div>
      <AppHeader />
      <AppNav actif={""} />
      <h2>IconViewPage {pathId}</h2>
      <div>
        <LinkCustom name={"Modifier"} to={"/paths/update"} />
      </div>
      <div>
        <LinkCustom name={"Publier"} to={"/paths/publics"} />
      </div>
      <div>
        <LinkCustom name={"Supprimer"} to={"/paths/publics"} />
      </div>
    </div>
  );
}
