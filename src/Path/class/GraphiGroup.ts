import { TGraphiGroup } from "../Types/TGraphiGroup";
import { GraphiFormOptions } from "./GraphiFormOptions";
import { GraphiPoint } from "./GraphiPoint";


/**
 * Un Ensemble de GraphiPoints
 * 
 * @version v2
 */
export class GraphiGroup {
  points : GraphiPoint[];
  isClose : boolean;


  constructor(data :TGraphiGroup | GraphiGroup )
  {
    this.points  = data.points;
    this.isClose  = data.isClose;
  }

  /**
   * La copie du GraphiGRoup
   */
  get copy () : GraphiGroup {
    return new GraphiGroup({
      points : this.points.map(item => item.copy),
      isClose : this.isClose
    })
  }
  
  /**
   * Convertion de GraphiGroups en string
   * 
   * @version v2
   */

  static fromGraphiToString(
    data : GraphiGroup[],
    formOptions : GraphiFormOptions
  )
  {

    return data.map(forme => {

      let result = "M" ;

      const newPoints = forme.points.map(item => formOptions.allOptionsGraphiPoint( item ))

      if (forme.isClose)
      {
        result += ` ${newPoints[newPoints.length-1].x} ${newPoints[newPoints.length-1].y}` ;
        result += `${newPoints.map((point, i, arr) => {
          if (i === 0){
            return ` C ${arr[arr.length-1].bx} ${arr[arr.length-1].by} ${point.ax} ${point.ay} ${point.x} ${point.y}`
          }
          return ` C ${arr[i-1].bx} ${arr[i-1].by} ${point.ax} ${point.ay} ${point.x} ${point.y}`
        
        }).join(" ")}` ;
      }
      else
      {
        result += ` ${newPoints[0].x} ${newPoints[0].y}` ;
        result += `${newPoints.map((point, i, arr) => {
          if (i === 0){
            return ``
          }
          return ` C ${arr[i-1].bx} ${arr[i-1].by} ${point.ax} ${point.ay} ${point.x} ${point.y}`
        }).join("")}` ;
      }
      return result
    }).join(" ")
  }

  asString(formOptions : GraphiFormOptions) {
    return GraphiGroup.fromGraphiToString([this],formOptions)
  }
}