import { TFigure } from "./Figure.type"
import { TUser } from "./User.type"

/**
 * Type Icône Svg
 * 
 * @version v2
 */
export type TIcon = {
  id : number
  name : string ,
  status : "private" | "public" ,
  viewbox : string ,
  user : TUser,
  figures : TFigure[]
}