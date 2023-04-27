import { Aspect } from "../../Aspects/Class/Aspect.class";
import { TFigure } from "../../Utilities/Types/Figure.type";
import { TPath } from "../../Utilities/Types/Path.type";


/**
 * Une Figure pour une Icone
 * 
 * @version v2
 */
export class Figure  {
  id      : number            ;
  order   : number            ;
  path    : TPath             ;
  aspect  : Aspect  ;

  constructor(src : TFigure | Figure){
    this.id     = src.id     ;
    this.order  = src.order  ;
    this.path   = src.path   ;
    this.aspect = new Aspect(src.aspect) ;
  }
}