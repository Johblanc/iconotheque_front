import { TPath } from "../Types/Path.type";
import { RequestMethods } from "../Types/RequestMethod";
import { TResponse } from "../Types/TResponse";
import { RequesterBase } from "./RequesterBase";

/**
 * Permet les requêtes pour la route paths
 * 
 * * **getPublics**  : Requête de récupération de paths publics
 * * **getPrivates** : Requête de récupération de paths privées
 * 
 * @version v1
 */
export class PathRequester extends RequesterBase {


  /**
   * Requête de récupération de paths publics
   * 
   * @returns Liste des paths publics
   * 
   * @version v1
   */
  static async getPublics() : Promise<TResponse<TPath[],string>>
  {
    const response = await PathRequester.base<TPath[],string>("paths")
    return response
  }

  /**
   * Requête de récupération de paths privés
   * 
   * @returns Liste des paths privés
   * 
   * @version v1
   */
  static async getPrivates(token : string) : Promise<TResponse<TPath[],string>>
  {
    const response = await PathRequester.base<TPath[],string>(
      "paths/privates",
      RequestMethods.GET ,
      [],
      undefined,
      token
      )
    return response
  }
}