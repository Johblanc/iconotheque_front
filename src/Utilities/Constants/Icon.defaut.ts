import { Icon } from "../../Icons/Classes/Icon.class";
import { DEFAULT_USER } from "./User.defaut";

/**
 * Un visiteur
 * 
 * @version v1
 */
export const DEFAULT_ICON  = new Icon( {
  id : -1 ,
  name : "Nouvelle Icône",
  status : "private" ,
  viewbox : "0 0 1 1",
  user : DEFAULT_USER,
  figures : []
})
