import React from "react";
import { TTransition } from "../Types/TTransition";


/**
 * Permet le réglage de la transition en cours
 * 
 * @version v1
 */
export const TransitionContext = React.createContext({
  transition : {  to : "" } as TTransition,
  setTransition: (value: TTransition) => {}
});