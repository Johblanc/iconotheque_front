import { RequestMethods } from "../Types/RequestMethod";
import { TResponse } from "../Types/TResponse";
import { TUser } from "../Types/User.type";
import { RequesterBase } from "./RequesterBase";

/**
 * Permet les requêtes pour la route users
 * 
 * @v1 **logIn**   : Requête pour log in un utilisateur
 * @v1 **signIn**  : Requête pour enregistrer un utilisateur
 * @v1 **update**  : Requête pour Modifier un profile utilisateur
 * @v1 **allUser** : Requête pour récupérer la liste des utilisateurs
 * @v1 **promote** : Requête pour récupérer la liste des utilisateurs
 * 
 * @version v1
 */
export class UserRequester extends RequesterBase {


  /**
   * Requête pour log in un utilisateur
   * 
   * @param body.name       Le nom de l'utilisateur
   * @param body.password   Le mot de passe de l'utilisateur
   * 
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
   * Requête pour enregistrer un utilisateur
   * 
   * @param body.name       Le nom de l'utilisateur
   * @param body.mail       Le mail de l'utilisateur
   * @param body.password   Le mot de passe de l'utilisateur
   * 
   * @returns               la réponse compléte de la requête
   * 
   * @version v1
   */
  static async signIn(body : { name: string, mail : string, password: string}) : Promise<TResponse<TUser,string>>
  {
    const response = await UserRequester.base<TUser,string>(
      "users/register",
      RequestMethods.POST,
      [],
      body
    )
    return response
  }

  /**
   * Requête pour Modifier un profile utilisateur
   * 
   * @param body.name       Le nom de l'utilisateur
   * @param body.mail       Le mail de l'utilisateur
   * @param body.password   Le mot de passe de l'utilisateur
   * @param token           le token de l'utilisateur
   * 
   * @returns               la réponse compléte de la requête
   * 
   * @version v1
   */
  static async update(body : { name?: string, mail?: string, password?: string}, token : string) : Promise<TResponse<TUser,string>>
  {
    const response = await UserRequester.base<TUser,string>(
      "users",
      RequestMethods.PATCH,
      [],
      body,
      token
    )
    return response
  }

  /**
   * Requête pour récupérer la liste des utilisateurs
   * 
   * @param token           le token de l'utilisateur
   * 
   * @returns               La liste des utilisateurs
   * 
   * @version v1
   */
  static async allUser( token : string) : Promise<TUser[]>
  {
    const response = await UserRequester.base<TUser[],string>(
      "users",
      RequestMethods.GET,
      [],
      undefined,
      token
    )
    return response.data
  }

  /**
   * Requête pour récupérer la liste des utilisateurs
   * 
   * @param token           le token de l'utilisateur
   * 
   * @returns               La liste des utilisateurs
   * 
   * @version v1
   */
  static async promote( id :number, token : string) : Promise<TResponse<TUser,string>>
  {
    const response = await UserRequester.base<TUser,string>(
      "users/promote",
      RequestMethods.GET,
      [id],
      undefined,
      token
    )
    return response
  }
}