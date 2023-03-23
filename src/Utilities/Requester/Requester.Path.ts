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
   * @param token le token de l'utilisateur
   * 
   * @returns Liste des paths publics
   * 
   * @version v1
   */
  static async getPublics(token : string) : Promise<TResponse<TPath[],string>>
  {
    const response = await PathRequester.base<TPath[],string>(
      "paths",
      RequestMethods.GET ,
      [],
      undefined,
      token
      )
    return response
  }

  /**
   * Requête de récupération de paths privés
   * 
   * @param token le token de l'utilisateur
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

  /**
   * Requête de mise à jour d'un path
   * 
   * @param id    l'identifiant du path
   * @param body  les parametres de modification du path
   * @param token le token de l'utilisateur
   * 
   * @returns le path publié
   * 
   * @version v1
   */
  static async update(id : number, body: {name : string, viewbox : string, d: string} , token : string) : Promise<TResponse<TPath>>
  {
    const response = await PathRequester.base<TPath>(
      "paths",
      RequestMethods.PATCH ,
      [id],
      body,
      token
      )
    return response
  }

  /**
   * Requête de publication d'un path
   * 
   * @param id    l'identifiant du path
   * @param token le token de l'utilisateur
   * 
   * @returns le path publié
   * 
   * @version v1
   */
  static async publish(id : number,token : string) : Promise<TResponse<TPath,string>>
  {
    const response = await PathRequester.base<TPath,string>(
      "paths/publish",
      RequestMethods.PATCH ,
      [id],
      undefined,
      token
      )
    return response
  }

  /**
   * Requête de suppression d'un path
   * 
   * @param id    l'identifiant du path
   * @param token le token de l'utilisateur
   * 
   * @returns le path supprimé
   * 
   * @version v1
   */
  static async delete(id : number,token : string) : Promise<TResponse<TPath,string>>
  {
    const response = await PathRequester.base<TPath,string>(
      "paths",
      RequestMethods.DELETE ,
      [id],
      undefined,
      token
      )
    return response
  }
}