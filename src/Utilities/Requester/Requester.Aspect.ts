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
  }

  /**
   * Requête de récupération des aspects
   * 
   * @returns Liste des aspects
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
  }

}