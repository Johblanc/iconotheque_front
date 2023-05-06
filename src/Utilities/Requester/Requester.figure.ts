
import { TIcon } from "../Types/Icon.type";
import { RequestMethods } from "../Types/RequestMethod";
import { TResponse } from "../Types/TResponse";
import { RequesterBase } from "./RequesterBase";

/**
 * Permet les requêtes pour la route icons
 * 
 * @v2 **add**          : Requête d'ajout d'une figure à une icône
 * @v2 **update**       : Requête de mise à jour d'une figure
 * @v2 **delete**       : Requête de suppression d'une figure à une icône
 * 
 * @version v2
 */
export class FigureRequester extends RequesterBase {



  /**
   * Requête de création d'une icone
   * 
   * @param body  les parametres de modification de l'icones
   * @param token le token de l'utilisateur
   * 
   * @returns l'icone créée
   * 
   * @version v2
   */
  static async add( body: {name : string, viewbox : string, d: string} , token : string) : Promise<TResponse<TIcon>>
  {
    const response = await FigureRequester.base<TIcon>(
      "icons",
      RequestMethods.POST ,
      [],
      body,
      token
      )
    return response
  }

  /**
   * Requête de mise à jour d'une icone
   * 
   * @param id    l'identifiant de l'icone
   * @param body  les parametres de modification du path
   * @param token le token de l'utilisateur
   * 
   * @returns l'icone mise à jour
   * 
   * @version v2
   */
  static async update(id : number, body: {name : string, viewbox : string, d: string} , token : string) : Promise<TResponse<TIcon>>
  {
    const response = await FigureRequester.base<TIcon>(
      "icons",
      RequestMethods.PATCH ,
      [id],
      body,
      token
      )
    return response
  }


  /**
   * Requête de suppression d'un path
   * 
   * @param id    l'identifiant de l'icone
   * @param token le token de l'utilisateur
   * 
   * @returns l'icone supprimée
   * 
   * @version v2
   */
  static async delete(id : number,token : string) : Promise<TResponse<TIcon,string>>
  {
    const response = await FigureRequester.base<TIcon,string>(
      "icons",
      RequestMethods.DELETE ,
      [id],
      undefined,
      token
      )
    return response
  }
}