import { useEffect, useState } from "react";
import { DEFAULT_USER } from "../../Utilities/Constants/User.defaut";
import { PathPrivateContext } from "../../Utilities/Contexts/PathPrivate.context";
import { PathPublicContext } from "../../Utilities/Contexts/PathPublic.context";
import { TransitionContext } from "../../Utilities/Contexts/Transition.context";
import { UserContext } from "../../Utilities/Contexts/User.context";
import { Requester } from "../../Utilities/Requester/Requester";
import { TPath } from "../../Utilities/Types/Path.type";
import { TTransition } from "../../Utilities/Types/TTransition";
import "../Style/App.style.css";



/**
 * Un conteneur avec tous les contextes
 * 
 * * user
 * * icônes publiques
 * * icônes privés
 * 
 * @version v1
 */
export function Contextualizer(props:{children : JSX.Element | JSX.Element[] | null }){
  
  /** l'utilisateur en cours d'utilisation */
  const [user, setUser] = useState(DEFAULT_USER);

  /** liste des paths publiques */
  const [pathPublic, setPathPublic] = useState<TPath[]>([]);

  /** liste des paths privés */
  const [pathPrivate, setPathPrivate] = useState<TPath[]>([]);

  /** La transition en cours */
  const [transition,setTransition] = useState<TTransition>( { to : "" });

  /** Récupération des paths */
  useEffect(() => {
    const fetchPublics = async () => {
      const response = await Requester.path.getPublics(user.token);
      if (response.data) {
        setPathPublic(response.data);
      }
    };

    const fetchPrivates = async () => {
      const response = await Requester.path.getPrivates(user.token);
      if (response.data) {
        setPathPrivate(response.data);
      }
    };
    if (user.access > 0) {
      fetchPublics();
    } else {
      setPathPublic([]);
    }
    if (user.access > 1) {
      fetchPrivates();
    } else {
      setPathPrivate([]);
    }
  }, [user]);

  return (
        <UserContext.Provider value={{ user, setUser }}>
          <PathPublicContext.Provider value={{ pathPublic, setPathPublic }}>
            <PathPrivateContext.Provider value={{ pathPrivate, setPathPrivate }} >
              <TransitionContext.Provider value={{transition,setTransition}}>
              {props.children}
              </TransitionContext.Provider>
            </PathPrivateContext.Provider>
          </PathPublicContext.Provider>
        </UserContext.Provider>
  );
}