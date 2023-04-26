import { AppNav } from "./AppNav";

/**
 * Le Titre du site
 * 
 * @version v2
 */
export function AppHeader(props : {actif : "" | "logIn" | "profil" | "pathNew" | "pathPublic" | "pathPrivate" | "iconsNew" | "iconsPublic" | "iconsPrivate" | "aspectsNew" | "aspectsPrivate" }) : JSX.Element
{
  return (
    <header>
      <AppNav actif={props.actif}/>
    </header>
  ) 
}