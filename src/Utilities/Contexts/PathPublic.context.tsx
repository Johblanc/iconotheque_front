import React from "react";
import { DEFAULT_USER } from "../Constants/User.defaut";
import { TPath } from "../Types/Path.type";
import { TUser } from "../Types/User.type";


/**
 * Permet le réglage des paths publique
 * 
 * @version v1
 */
export const PathPublicContext = React.createContext({
  pathPublic : [] as TPath[],
  setPathPublic: (value: TPath[]) => {},
});