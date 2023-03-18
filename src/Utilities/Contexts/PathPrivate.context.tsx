import React from "react";
import { TPath } from "../Types/Path.type";


/**
 * Permet le réglage des paths publique
 * 
 * @version v1
 */
export const PathPrivateContext = React.createContext({
  pathPrivate : [] as TPath[],
  setPathPrivate: (value: TPath[]) => {},
});