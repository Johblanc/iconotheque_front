import { Aspect } from "../../Aspects/Class/Aspect.class"
import { TAspect } from "./Aspect.type"
import { TPath } from "./Path.type"

/**
 * Type Combinaison Path + Aspect
 * 
 * @version v2
 */
export type TFigure = {
  id : number
  order : number ,
  path : TPath,
  aspect : TAspect | Aspect
}