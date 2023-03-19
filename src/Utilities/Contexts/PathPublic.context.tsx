import React from "react";
import { TPath } from "../Types/Path.type";


/**
 * Permet le réglage des paths publique
 * 
 * @version v1
 */
export const PathPublicContext = React.createContext({
  pathPublic : [] as TPath[],
  setPathPublic: (value: TPath[]) => {},
});