import { GraphiPoint } from "../class/GraphiPoint";

/**
 * Un Ensemble de GraphiPoints
 * 
 * @version v2
 */
export type TGraphiGroup = {
  points: GraphiPoint[];
  isClose: boolean;
}