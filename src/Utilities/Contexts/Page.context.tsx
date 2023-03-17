import React from "react";


/**
 * Permet le réglage de la page en cours d'affichage
 * 
 * @version v1
 */
export const PageContext = React.createContext({
  page : <></> as JSX.Element,
  setPage: (value: JSX.Element) => {},
});