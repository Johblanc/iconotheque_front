import { TGraphiFormOptions } from "../Types/TGraphiFormOptions";
import { GraphiPoint } from "./GraphiPoint";


/**
 * Représentation des options pour une GraphiForm
 * 
 * @version v2
 */
export class GraphiFormOptions {
  rounder: number;
  translateX: number;
  translateY: number;

  constructor(data: TGraphiFormOptions | GraphiFormOptions) {
    this.rounder = data.rounder;
    this.translateX = data.translateX;
    this.translateY = data.translateY;
  }

  /**
   * Une copy des options
   * 
   * @version v2
   */
  get copy() {
    return new GraphiFormOptions(this);
  }
  
  /**
   * Permet d'arrondir une valeur en fonction des options
   * 
   * @version v2
   */
  round(value: number): number {
    let result = String(Math.round(value / this.rounder) * this.rounder);
    if (result.includes(".")) {
      const int = result.split(".")[0];
      const dec = result.split(".")[1];
      if (dec.length > String(this.rounder).split(".")[1].length) {
        result =
          int +
          "." +
          dec.substring(0, String(this.rounder).split(".")[1].length);
      }
    }
    return Number(result);
  }

  /**
   * Permet la translation d'un graphiPoint
   * 
   * @version v2
   */
  translateGraphiPoint(value: GraphiPoint ) {
    const newPoints = value.copy;
    newPoints.x += this.translateX;
    newPoints.y += this.translateY;
    return newPoints;
  }

  /**
   * Permet de supprimer la translation d'un graphiPoint
   * 
   * @version v2
   */
  untranslateGraphiPoint(value: GraphiPoint ) {
    const newPoints = value.copy;
    newPoints.x -= this.translateX;
    newPoints.y -= this.translateY;
    return newPoints;
  }
  
  /**
   * Permet d'arrondir les valeur d'un GraphiPoint
   * 
   * @version v2
   */
  roundGraphiPoint (value: GraphiPoint) {
    const newPoints = value.copy;
    newPoints.x = this.round(newPoints.x);
    newPoints.y = this.round(newPoints.y);
    newPoints.bx = this.round(newPoints.bx);
    newPoints.by = this.round(newPoints.by);
    newPoints.ax = this.round(newPoints.ax);
    newPoints.ay = this.round(newPoints.ay);
    return newPoints;
  }

  
  /**
   * Permet d'arrondir les valeur d'un GraphiPoint translaté
   * 
   * @version v2
   */
  allOptionsGraphiPoint(value: GraphiPoint) {

    return this.translateGraphiPoint( this.roundGraphiPoint( value.copy ) ) ;

  }

  
  /**
   * Un effet de translation
   * 
   * @version v2
   */
  effectFlowGraphiPoint(value: GraphiPoint ) {
    const newPoints = value.copy;
    newPoints.x += this.translateX;
    newPoints.y += this.translateY;
    newPoints.bx += this.translateX;
    newPoints.by += this.translateY;
    newPoints.ax += this.translateX;
    newPoints.ay += this.translateY;
    return newPoints;
  }
}
