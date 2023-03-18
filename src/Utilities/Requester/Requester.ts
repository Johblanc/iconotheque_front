import { PathRequester } from "./Requester.Path"
import { UserRequester } from "./Requester.User"

/**
 * Centralisation Requesters
 * 
 * @version v1
 */
export class Requester {

  static user = UserRequester
  static path = PathRequester

}