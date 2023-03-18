import { TResponse } from "../Types/TResponse";
import { TUser } from "../Types/User.type";
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
   * @version v1
   */
  static async getPublics() : Promise<TResponse<TUser,string>>
  {
    const response = await PathRequester.base<TUser,string>("paths")
    return response
  }

  /**
   * Requête de récupération de paths privées
   * 
   * @version v1
   */
  static async getPrivates() : Promise<TResponse<TUser,string>>
  {
    const response = await PathRequester.base<TUser,string>("paths/privates")
    return response
  }
}