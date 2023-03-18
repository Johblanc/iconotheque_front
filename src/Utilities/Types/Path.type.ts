import { TUser } from "./User.type"

/**
 * Type Path Svg
 * 
 * @version v1
 */
export type TPath = {
  id : number
  name : string ,
  status : "private" | "public" ,
  d : string ,
  user : TUser
}