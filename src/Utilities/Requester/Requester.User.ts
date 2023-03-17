import { RequestMethods } from "../Types/RequestMethod";
import { TResponse } from "../Types/TResponse";
import { TUser } from "../Types/User.type";
import { RequesterBase } from "./RequesterBase";

/**
 * Permet les requêtes pour la route users
 * 
 * * **logIn** : Requête pour log in un utilisateur
 * 
 * @version v1
 */
export class UserRequester extends RequesterBase {


  /**
   * Requête pour log in un utilisateur
   * 
   * @param body  Le nom et le mot de passe de l'utilisateur
   * @returns     la réponse compléte de la requête
   * 
   * @version v1
   */
  static async logIn(body : { name: string, password: string}) : Promise<TResponse<TUser,string>>
  {
    const response = await UserRequester.base<TUser,string>(
      "users/login",
      RequestMethods.POST,
      [],
      body
    )
    
    return response
  }
}