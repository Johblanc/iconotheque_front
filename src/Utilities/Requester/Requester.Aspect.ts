import { TAspect } from "../Types/Aspect.type";
import { RequestMethods } from "../Types/RequestMethod";
import { TResponse } from "../Types/TResponse";
import { RequesterBase } from "./RequesterBase";

/**
 * Permet les requêtes pour la route aspect
 * 
 * @v2 **getAll** : Requête de récupération des aspects
 * 
 * @version v2
 */
export class AspectRequester extends RequesterBase {


  /**
   * Requête de récupération des aspects
   * 
   * @returns Liste des aspects
   * 
   * @version v2
   */
  static async getAll() : Promise<TResponse<TAspect[],string>>
  {
    const response = await AspectRequester.base<TAspect[],string>(
      "aspects",
      RequestMethods.GET ,
      [],
      undefined
      )
    return response
  } ;

  /**
   * Création d'un nouvel aspect
   * 
   * @param body Les infos de création d'un aspect
   * @param token Le token d'identification de l'auteur
   * 
   * @returns Le nouvel aspect
   * 
   * @version v2
   */
  static async new(body : TAspect, token : string) : Promise<TAspect>
  {
    const response = await AspectRequester.base<TAspect,string>(
      "aspects",
      RequestMethods.POST ,
      [],
      body,
      token
      )
    return response.data
  } ;

  /**
   * Mise à jour d'un aspect
   * 
   * @param body  Les infos de création d'un aspect
   * @param token Le token d'identification de l'auteur
   * @param id    L'identification de l'aspect
   * 
   * @returns Le nouvel aspect
   * 
   * @version v2
   */
  static async update(body : TAspect, token : string, id :number) : Promise<TAspect>
  {
    const response = await AspectRequester.base<TAspect,string>(
      "aspects",
      RequestMethods.PATCH ,
      [id],
      body,
      token
      )
    return response.data
  } ;

}