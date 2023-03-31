import { LinkCustom } from "../../Utilities/Components/LinkCustom";
import { APP_STYLE } from "../Style/App.bootstrap.style";


/**
 * Page pour les erreurs de routages
 * 
 * @route retour au site
 * 
 * @version v1 
 */
export function ErrorPage(){


  return (
    <div id="error-page" className={APP_STYLE.ERROR_PAGE.PAGE}>
      <h1 >404 !</h1>
      <p>Cette page n'existe pas</p>
      <LinkCustom name={"Retour au site"} to={"/"} />
      </div>
  );
}