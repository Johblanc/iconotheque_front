import React from "react";
import { DEFAULT_THEME } from "../Constants/Theme.defaut";
import { TTheme } from "../Types/Theme.type";


/**
 * Permet le réglage du style
 * 
 * @version v1
 */
export const ThemeContext = React.createContext({
  theme : DEFAULT_THEME,
  setTheme: (value: TTheme) => {},
});