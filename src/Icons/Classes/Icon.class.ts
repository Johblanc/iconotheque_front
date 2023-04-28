
import { TFigure } from "../../Utilities/Types/Figure.type";
import { TIcon } from "../../Utilities/Types/Icon.type";
import { TUser } from "../../Utilities/Types/User.type";
import { Figure } from "./Figure.class";



export class Icon  {
  id      : number                ;
  name    : string                ;
  status  : "private" | "public"  ;
  viewbox : string                ;
  user    : TUser                 ;
  private __figures : Figure[]              ;

  constructor(src : TIcon | Icon){
    this.id      = src.id      ;
    this.name    = src.name    ;
    this.status  = src.status  ;
    this.viewbox = src.viewbox ;
    this.user    = src.user    ;
    this.__figures = src.figures.map(item => new Figure(item)) ;
  }

  get figures () : Figure[] {
    return this.__figures.sort((a, b) => a.order - b.order) ;
  }

  set figures (value : TFigure[] | Figure[]){
    this.__figures = value.map(item => new Figure(item)) ;
  }
}