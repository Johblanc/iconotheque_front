import { TAspect } from "../Types/Aspect.type";
import { DEFAULT_USER } from "./User.defaut";

/**
 * Un visiteur
 * 
 * @version v1
 */
export const DEFAULT_ASPECT : TAspect = {
  id : -1 ,
  name : "Nouvel Aspect" ,
  fill_color : "#000000" ,
  fill_opacity : 1 ,
  stroke_color : "#FFFFFF",
  stroke_opacity : 1 ,
  stroke_width : 1,
  user : DEFAULT_USER
}
