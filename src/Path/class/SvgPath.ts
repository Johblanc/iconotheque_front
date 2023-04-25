
import { TOptions } from "../Types/TOptions";
import { FormatServices } from "./FormatServices";
import { GraphiGroup } from "./GraphiGroup";
import { GraphiPoint } from "./GraphiPoint";
import { Options } from "./Options";
import { PathPoint } from "./PathPoint";
import { SvgPathServices } from "./SvgPathServices";

/**
 * Un objet representant un path Svg
 *
 * @version v2
 * */
export class SvgPath {
  points: PathPoint[];
  private __options: Options;

  constructor(path: string = "", options?: Options | Partial<TOptions>) {
    this.points = [];

    this.__options = new Options(options);

    if (path !== "") {
      this.set(path);
    }
  }

  /**
   * Convertion d'un string en SvgPath
   * 
   * @version v2
   */

  set(path: string) {
    this.points = [];
    let splitPath = SvgPathServices.pathSpliter(path);
    let curItem: string = "m";
    let prevMindex = 0;

    while (splitPath.length > 0) {
      if (curItem === "m") curItem = "l";
      if (curItem === "M") curItem = "L";

      if (FormatServices.isFormat(splitPath[0])) {
        curItem = splitPath.shift()!;
      }

      let newPoint = new PathPoint(
        FormatServices.convert(curItem)!,
        this.points[this.points.length - 1],
        this.points[prevMindex],
        this.__options
      );
      splitPath = newPoint.setPath(splitPath);

      this.points.push(newPoint);

      if (newPoint.format.formatA === "m") {
        prevMindex = this.points.length - 1;
      }
    }
  }


  /**
   * Convertion du Path en string
   * 
   * @version v2
   */
  get asString() {
    return this.points.map((item) => item.asString).join("");
  }

  /**
   * Convertion du Path en string
   * 
   * @version v2
   */
  get asRelativeString() {
    return this.points.map((item) =>{ item.toRelative() ; return item.asString}).join("");
  }

  /**
   * Convertion du Path en GraphiGroup contenant des GraphiPoints.
   * Objet facilitant la modification graphique
   * 
   * @version v2
   */
  get asGraphi(){


    let graphiPoints : GraphiGroup[] = [] ;
    this.points.forEach ((item,index,arr) =>
    {
      if (item.format.value === "M" || item.format.value === "m"){
        graphiPoints.push(new GraphiGroup({points : [], isClose : false})) ;
      }
      
      if (item.format.value === "Z" || item.format.value === "z") {
        if (
          (
            graphiPoints[graphiPoints.length-1].points[0].x === 
          graphiPoints[graphiPoints.length-1].points[graphiPoints[graphiPoints.length-1].points.length-1].x
          ) && (
            graphiPoints[graphiPoints.length-1].points[0].y === 
          graphiPoints[graphiPoints.length-1].points[graphiPoints[graphiPoints.length-1].points.length-1].y
          )
          ){
            const last = graphiPoints[graphiPoints.length-1].points.pop()! ;
            last.bx = graphiPoints[graphiPoints.length-1].points[0].bx ;
            last.by = graphiPoints[graphiPoints.length-1].points[0].by ;
            graphiPoints[graphiPoints.length-1].points[0] = last ;
        }
        graphiPoints[graphiPoints.length-1].isClose = true ;
        
      } 
      else 
      {
        const newPoint = new GraphiPoint({
          x : item.x,
          y : item.y,
          bx : index !== arr.length - 1 ? arr[index+1].x1 : item.x,
          by : index !== arr.length - 1 ? arr[index+1].y1 : item.y,
          ax : item.x2,
          ay : item.y2,
        })
        newPoint.verifStatus()
        graphiPoints[graphiPoints.length-1].points.push(newPoint) ;
      }
    })
    return graphiPoints ;
  }
  
}
