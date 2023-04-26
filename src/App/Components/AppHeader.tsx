import { AppNav } from "./AppNav";

/**
 * Le Titre du site
 * 
 * @version v2
 */
export function AppHeader(props : {actif : "" | "profil" | "new" | "public" | "private" | "logIn" }) : JSX.Element
{
  return (
    <header>
      <AppNav actif={props.actif}/>
    </header>
  )
}