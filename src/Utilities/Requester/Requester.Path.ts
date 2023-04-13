import { TPath } from "../Types/Path.type";
import { RequestMethods } from "../Types/RequestMethod";
import { TResponse } from "../Types/TResponse";
import { RequesterBase } from "./RequesterBase";

/**
 * Permet les requêtes pour la route paths
 * 
 * @v1 **getPublics**   : Requête de récupération de paths publics
 * @v1 **getPrivates**  : Requête de récupération de paths privées
 * @v1 **new**          : Requête de création d'un path
 * @v1 **update**       : Requête de mise à jour d'un path
 * @v1 **publish**      : Requête de publication d'un path
 * @v1 **delete**       : Requête de suppression d'un path
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
  static async getPublics() : Promise<TResponse<TPath[],string>>
  {
    const response = await PathRequester.base<TPath[],string>(
      "paths",
      RequestMethods.GET ,
      [],
      undefined
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
   * Requête de création d'un path
   * 
   * @param body  les parametres de modification du path
   * @param token le token de l'utilisateur
   * 
   * @returns le path créé
   * 
   * @version v1
   */
  static async new( body: {name : string, viewbox : string, d: string} , token : string) : Promise<TResponse<TPath>>
  {
    const response = await PathRequester.base<TPath>(
      "paths",
      RequestMethods.POST ,
      [],
      body,
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
   * @returns le path mis à jour
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