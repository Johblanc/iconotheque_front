import { AppNav } from "../../App/Components/AppNav";


/**
 * Permet de selectionnner un icône
 * 
 * @version v1
 */
export function IconSelectPage(props : {actif : "public" | "private"}) : JSX.Element
{
  const {actif} = props

  return (
    <div>
      <AppNav actif={actif}/>
      <h2>{actif === "public" ? "Icônes publiques" : "Mes icônes"}</h2>
    </div>
  )
}