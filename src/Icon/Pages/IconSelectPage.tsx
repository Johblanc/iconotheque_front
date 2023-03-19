import { useContext, useState } from "react";
import { AppHeader } from "../../App/Components/AppHeader";
import { AppNav } from "../../App/Components/AppNav";
import { PathPrivateContext } from "../../Utilities/Contexts/PathPrivate.context";
import { PathPublicContext } from "../../Utilities/Contexts/PathPublic.context";
import { UserContext } from "../../Utilities/Contexts/User.context";
import { IconItem } from "../Components/IconItem";


/**
 * Permet de selectionnner un icône
 * 
 * @param props.actif les données publiques ou privées
 * 
 * @route nav > ?
 * @route selection path > IconViewPage {path}
 * 
 * @version v1
 */
export function IconSelectPage(props : {actif : "public" | "private"}) : JSX.Element
{
  const {actif} = props

  const {pathPublic } = useContext(PathPublicContext)
  const {pathPrivate } = useContext(PathPrivateContext)
  const {user } = useContext(UserContext)

  const [transitionTo,setTransitionTo] = useState("")

  let path = [] ;
  if (actif === "public"){
    path = pathPublic
  }
  else
  {
    path = [...pathPublic.filter(item => item.user.id === user.id),...pathPrivate]
  }
  const icons = path.map(
    (item,i) => (
      <div key={i} /* onClick={()=> setPage(<IconViewPage/>)} */>
        <IconItem path={item}/>
      </div>
    )
  )

  return (
    <>
      <AppHeader/>
      <AppNav actif={actif}/>
      <h2>{actif === "public" ? "Icônes publiques" : "Mes icônes"}</h2>
      <div>
        {icons}
      </div>
    </>
  )
}