import { TAspect } from "../../Utilities/Types/Aspect.type";
import { TUser } from "../../Utilities/Types/User.type"


export class Aspect {
  
  id              : number ;
  name            : string ;
  fill_color      : string ;
  fill_opacity    : number ;
  stroke_color    : string ;
  stroke_opacity  : number ;
  stroke_width    : number ;
  user            : TUser

  constructor( src : TAspect | Aspect ){
    this.id             = src.id              ;
    this.name           = src.name            ;
    this.fill_color     = src.fill_color      ;
    this.fill_opacity   = src.fill_opacity    ;
    this.stroke_color   = src.stroke_color    ;
    this.stroke_opacity = src.stroke_opacity  ;
    this.stroke_width   = src.stroke_width    ;
    this.user           = src.user            ;

  }

  get style (){
    return {
      fill: this.fill_color,
      fillOpacity: this.fill_opacity,
      stroke: this.stroke_color,
      strokeOpacity: this.stroke_opacity,
      strokeWidth: this.stroke_width,
    }
  }

  get asCss () {
    let result = `.${this.name} {` ;
    result += `\n\tfill : ${this.fill_color} ;` ;
    result += `\n\tfill-opacity : ${this.fill_opacity} ;` ;
    result += `\n\tstroke : ${this.stroke_color} ;` ;
    result += `\n\tstroke-opacity : ${this.stroke_opacity} ;` ;
    result += `\n\tstroke-width : ${this.stroke_width} ;` ;
    result += `\n}` ;
    return result ;
  }

  get asReactStyleString () {
    let result = `style = {{` ;
    result += `\n\tfill : "${this.fill_color}" ,` ;
    result += `\n\tfillOpacity : ${this.fill_opacity} ,` ;
    result += `\n\tstroke : "${this.stroke_color}" ,` ;
    result += `\n\tstrokeOpacity : ${this.stroke_opacity} ,` ;
    result += `\n\tstrokeWidth : ${this.stroke_width} ,` ;
    result += `\n}}` ;
    return result ;
  }
}