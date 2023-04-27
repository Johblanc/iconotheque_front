import { CSSProperties, useEffect, useState } from "react";
import { DEFAULT_THEME } from "../../Utilities/Constants/Theme.defaut";
import { DEFAULT_USER } from "../../Utilities/Constants/User.defaut";
import { PathPrivateContext } from "../../Utilities/Contexts/PathPrivate.context";
import { PathPublicContext } from "../../Utilities/Contexts/PathPublic.context";
import { ThemeContext } from "../../Utilities/Contexts/Theme.context";
import { TransitionContext } from "../../Utilities/Contexts/Transition.context";
import { UserContext } from "../../Utilities/Contexts/User.context";
import { Requester } from "../../Utilities/Requester/Requester";
import { TPath } from "../../Utilities/Types/Path.type";
import { TTheme } from "../../Utilities/Types/Theme.type";
import { TTransition } from "../../Utilities/Types/TTransition";
import "../Style/App.style.css";
import { AspectContext } from "../../Utilities/Contexts/Aspect.context";
import { Aspect } from "../../Aspects/Class/Aspect.class";
import { Icon } from "../../Icons/Classes/Icon.class";
import { IconPublicContext } from "../../Utilities/Contexts/IconPublic.context";
import { IconPrivateContext } from "../../Utilities/Contexts/IconPrivate.context";

/**
 * Un conteneur avec tous les contextes
 *
 * * user
 * * Formes publiques
 * * Formes privés
 * * transition
 * * theme
 *
 * @version v2
 */
export function Contextualizer(props: {
  children: JSX.Element | JSX.Element[] | null;
}) {
  /** l'utilisateur en cours d'utilisation */
  const [user, setUser] = useState(DEFAULT_USER);

  /** liste des paths publiques */
  const [pathPublic, setPathPublic] = useState<TPath[]>([]);

  /** liste des paths privés */
  const [pathPrivate, setPathPrivate] = useState<TPath[]>([]);

  /** liste des aspects */
  const [aspects, setAspects] = useState<Aspect[]>([]);

  /** liste des icônes publiques */
  const [iconPublic, setIconPublic] = useState<Icon[]>([]);

  /** liste des icônes privates */
  const [iconPrivate, setIconPrivate] = useState<Icon[]>([]);

  /** La transition en cours */
  const [transition, setTransition] = useState<TTransition>({ to: "" });

  /** La style en cours */
  const [theme, setTheme] = useState<TTheme>(DEFAULT_THEME);

  /** Récupération des paths publiques */
  useEffect(() => {
    const fetchPublics = async () => {
      const response = await Requester.path.getPublics();
      if (response.data) {
        setPathPublic(response.data);
      }
    };
    fetchPublics();
  }, []);

  /** Récupération des paths privés*/
  useEffect(() => {
    const fetchPrivates = async () => {
      const response = await Requester.path.getPrivates(user.token);
      if (response.data) {
        setPathPrivate(response.data);
      }
    };
    if (user.access > 0) {
      fetchPrivates();
    } else {
      setPathPrivate([]);
    }
  }, [user]);

  /** Récupération des icônes publiques */
  useEffect(() => {
    const fetchPublics = async () => {
      const response = await Requester.icon.getPublics();
      if (response.data) {
        setIconPublic( response.data.map( item => new Icon( item ) ) );
      }
    };
    fetchPublics();
  }, []);
  
  /** Récupération des paths privés*/
  useEffect(() => {
    const fetchPrivates = async () => {
      const response = await Requester.icon.getPrivates(user.token);
      if (response.data) {
        setIconPrivate(response.data.map( item => new Icon( item ) ) );
      }
    };
    if (user.access > 0) {
      fetchPrivates();
    } else {
      setIconPrivate([]);
    }
  }, [user]);

  /** Récupération des aspects */
  useEffect(() => {
    const fetchAll = async () => {
      const response = await Requester.aspect.getAll();
      if (response.data) {
        setAspects(response.data.map((item) => new Aspect(item)));
      }
    };
    fetchAll();
  }, []);

  return (
    <div
      className={`app ${
        theme.red + theme.green + theme.blue > 280 ? "light" : "dark"
      }`}
      style={
        {
          "--base-red": theme.red,
          "--base-green": theme.green,
          "--base-blue": theme.blue,
          "--shad-transparency": theme.transparency,
        } as CSSProperties
      }
    >
      <UserContext.Provider value={{ user, setUser }}>
        <PathPublicContext.Provider value={{ pathPublic, setPathPublic }}>
          <PathPrivateContext.Provider value={{ pathPrivate, setPathPrivate }}>
            <AspectContext.Provider value={{ aspects, setAspects }}>
              <IconPublicContext.Provider value={{ iconPublic, setIconPublic }}>
                <IconPrivateContext.Provider value={{ iconPrivate, setIconPrivate }}>
                  <TransitionContext.Provider value={{ transition, setTransition }}>
                    <ThemeContext.Provider value={{ theme, setTheme }}>
                      {props.children}
                    </ThemeContext.Provider>
                  </TransitionContext.Provider>
                </IconPrivateContext.Provider>
              </IconPublicContext.Provider>
            </AspectContext.Provider>
          </PathPrivateContext.Provider>
        </PathPublicContext.Provider>
      </UserContext.Provider>
    </div>
  );
}
