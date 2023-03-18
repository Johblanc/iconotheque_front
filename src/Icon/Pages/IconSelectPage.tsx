import { useContext } from "react";
import { AppNav } from "../../App/Components/AppNav";
import { PathPrivateContext } from "../../Utilities/Contexts/PathPrivate.context";
import { PathPublicContext } from "../../Utilities/Contexts/PathPublic.context";


/**
 * Permet de selectionnner un icône
 * 
 * @version v1
 */
export function IconSelectPage(props : {actif : "public" | "private"}) : JSX.Element
{
  const {actif} = props

  const {pathPublic } = useContext(PathPublicContext)
  const {pathPrivate } = useContext(PathPrivateContext)

  console.log(pathPublic);
  console.log(pathPrivate);
  

  return (
    <div>
      <AppNav actif={actif}/>
      <h2>{actif === "public" ? "Icônes publiques" : "Mes icônes"}</h2>
    </div>
  )
}