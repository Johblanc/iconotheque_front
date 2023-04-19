
/**
 * Un GraphiPoint pour la modification graphique
 * 
 * @version v2
 */
export type TGraphiPoint = {
  x : number,
  y : number,
  bx : number,
  by : number,
  ax : number,
  ay : number,
  status? :  "dur" | "symétrique" | "doux",
}