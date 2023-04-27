import { Aspect } from "../../Aspects/Class/Aspect.class";
import { DEFAULT_USER } from "./User.defaut";

/**
 * Un visiteur
 * 
 * @version v1
 */
export const DEFAULT_ASPECT = new Aspect( {
  id : -1 ,
  name : "Nouvel Aspect" ,
  fill_color : "#000000" ,
  fill_opacity : 1 ,
  stroke_color : "#FFFFFF",
  stroke_opacity : 1 ,
  stroke_width : 1,
  user : DEFAULT_USER
} )
