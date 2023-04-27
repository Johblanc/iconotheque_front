
import { TIcon } from "../../Utilities/Types/Icon.type";
import { TUser } from "../../Utilities/Types/User.type";
import { Figure } from "./Figure.class";



export class Icon  {
  id      : number                ;
  name    : string                ;
  status  : "private" | "public"  ;
  viewbox : string                ;
  user    : TUser                 ;
  figures : Figure[]              ;

  constructor(src : TIcon | Icon){
    this.id      = src.id      ;
    this.name    = src.name    ;
    this.status  = src.status  ;
    this.viewbox = src.viewbox ;
    this.user    = src.user    ;
    this.figures = src.figures.map(item => new Figure(item)) ;
  }
}