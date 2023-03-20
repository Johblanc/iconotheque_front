import { LinkCustom } from "../../Utilities/Components/LinkCustom";


/**
 * Page de mise à jour d'un icône
 * 
 * @version v1
 */
export function IconUpdatePage() : JSX.Element
{
  return <>
  <div>
  <LinkCustom name={"Enregistrer les modification"} to={"/paths/view"}/>
  </div>
  <div>
  <LinkCustom name={"Annuler les modification"} to={"/paths/publics"}/>
  </div>
  </>
}