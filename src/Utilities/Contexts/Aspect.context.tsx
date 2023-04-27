import React from "react";
import { Aspect } from "../../Aspects/Class/Aspect.class";


/**
 * Permet le réglage des aspects
 * 
 * @version v2
 */
export const AspectContext = React.createContext({
  aspects : [] as Aspect[],
  setAspects: (value: Aspect[]) => {},
});