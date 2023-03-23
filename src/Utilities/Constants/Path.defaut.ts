import { TPath } from "../Types/Path.type";
import { DEFAULT_USER } from "./User.defaut";

/**
 * Un visiteur
 * 
 * @version v1
 */
export const DEFAULT_PATH : TPath = {
  id : -1 ,
  name : "",
  status : "private",
  d : "M 0 0 1 1 0 1 1 0 Z",
  viewbox : "0 0 1 1",
  user : DEFAULT_USER
}
