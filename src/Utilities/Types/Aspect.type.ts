import { TUser } from "./User.type"

/**
 * Type Aspect d'une forme
 * 
 * @version v2
 */
export type TAspect = {
  id : number
  name : string ,
  fill_color : string ,
  fill_opacity : number ,
  stroke_color : string ,
  stroke_opacity : number ,
  stroke_width : number,
  user : TUser
}