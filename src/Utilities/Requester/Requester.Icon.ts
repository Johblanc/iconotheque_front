
import { TIcon } from "../Types/Icon.type";
import { RequestMethods } from "../Types/RequestMethod";
import { TResponse } from "../Types/TResponse";
import { RequesterBase } from "./RequesterBase";

/**
 * Permet les requêtes pour la route icons
 * 
 * @v2 **getPublics**   : Requête de récupération d'icones publics
 * @v2 **getPrivates**  : Requête de récupération de icones privés
 * @v2 **new**          : Requête de création d'une icône
 * @v2 **update**       : Requête de mise à jour d'une icône
 * @v2 **publish**      : Requête de publication d'une icône
 * @v2 **delete**       : Requête de suppression d'une icône
 * 
 * @version v2
 */
export class IconRequester extends RequesterBase {


  /**
   * Requête de récupération d'icones publics
   * 
   * @returns Liste des icones publics
   * 
   * @version v2
   */
  static async getPublics() : Promise<TResponse<TIcon[],string>>
  {
    const response = await IconRequester.base<TIcon[],string>(
      "icons",
      RequestMethods.GET ,
      [],
      undefined
      )
    return response
  }

}