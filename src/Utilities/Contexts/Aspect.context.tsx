import React from "react";
import { TAspect } from "../Types/Aspect.type";


/**
 * Permet le réglage des aspects
 * 
 * @version v2
 */
export const AspectContext = React.createContext({
  aspects : [] as TAspect[],
  setAspects: (value: TAspect[]) => {},
});