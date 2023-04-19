import { TGraphiGroup } from "../Types/TGraphiGroup";
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
}