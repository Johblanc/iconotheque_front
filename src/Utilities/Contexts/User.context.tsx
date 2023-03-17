import React from "react";
import { DEFAULT_USER } from "../Constants/User.defaut";
import { TUser } from "../Types/User.type";


/**
 * Permet le réglage de l'utilisateur en cours
 * 
 * @version v1
 */
export const UserContext = React.createContext({
  user : DEFAULT_USER,
  setUser: (value: TUser) => {},
});