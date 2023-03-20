import { LinkCustom } from "../../Utilities/Components/LinkCustom";


/**
 * Page de mise à jour des données utilisateur
 * 
 * @version v1
 */
export function UserUpdatePage() : JSX.Element
{
  return <>
  
  <div>
    <LinkCustom name={"Enregistrer les modifications"} to={"/user/view"}/>
    </div>
  <div>
    <LinkCustom name={"Annuler les modifications"} to={"/user/view"}/>
    </div>
  </>
}