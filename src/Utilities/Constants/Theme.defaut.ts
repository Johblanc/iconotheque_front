import { TTheme } from "../Types/Theme.type";

/**
 * Un theme
 * 
 * @version v1
 */
export const DEFAULT_THEME : TTheme = {
  red : Math.floor(Math.random()*255) ,
  green : Math.floor(Math.random()*255),
  blue : Math.floor(Math.random()*255),
  transparency : 0.5
}
