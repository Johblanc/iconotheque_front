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
   * @param body.name       Le nom de l'utilisateur
   * @param body.password   Le mot de passe de l'utilisateur
   * @returns               la réponse compléte de la requête
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

  /**
   * Requête pour log in un utilisateur
   * 
   * @param body.name       Le nom de l'utilisateur
   * @param body.mail       Le mail de l'utilisateur
   * @param body.password   Le mot de passe de l'utilisateur
   * @returns               la réponse compléte de la requête
   * 
   * @version v1
   */
  static async SignIn(body : { name: string, mail : string, password: string}) : Promise<TResponse<TUser,string>>
  {
    const response = await UserRequester.base<TUser,string>(
      "users/register",
      RequestMethods.POST,
      [],
      body
    )
    return response
  }
}