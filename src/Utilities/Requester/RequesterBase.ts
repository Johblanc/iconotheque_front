
import { TResponse } from "../Types/TResponse";
import { BASE_URL } from "../url";
import { RequestMethods } from "../Types/RequestMethod";
/**
 * Contient la methode de Requêtes génériques
 * 
 * @version v1
 */
export class RequesterBase {

  /**
   * Une Requête générique
   * 
   * @type `Data`   Le Type de donnée de la réponse
   * 
   * @param url         Le complément d'url
   * @param method  ?   La methode html
   * @param params  ?   Les paramètres
   * @param body    ?   Le corps de la Requête
   * @param token   ?   Le token
   * 
   * @returns La réponse à la requête
   * 
   * @version v1
   */
  static async base<Data = any, Message = string | string[]>(
    url: string,
    method: RequestMethods = RequestMethods.GET,
    params: (string | number)[] = [],
    body: any = undefined,
    token: string | undefined = undefined
  )
  : Promise<TResponse<Data,Message>> 
  {
    const data = await fetch(
      `${BASE_URL}/${url}${params.map((item) => "/" + String(item))}`,
      {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(body),
      }
    );
    const result: TResponse<Data,Message> = await data.json();
    console.log(result.message);

    return result;
  }
}
