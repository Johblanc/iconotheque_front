import React from "react";
import { Icon } from "../../Icons/Classes/Icon.class";


/**
 * Permet le réglage des icônes publiques
 * 
 * @version v2
 */
export const IconPublicContext = React.createContext({
  iconPublic : [] as Icon[],
  setIconPublic: (value: Icon[]) => {},
});