import { useEffect, useState } from "react";
import { UserLogInPage } from "../../User/Pages/UserLogInPage";
import { DEFAULT_USER } from "../../Utilities/Constants/User.defaut";
import { PageContext } from "../../Utilities/Contexts/Page.context";
import { PathPrivateContext } from "../../Utilities/Contexts/PathPrivate.context";
import { PathPublicContext } from "../../Utilities/Contexts/PathPublic.context";
import { UserContext } from "../../Utilities/Contexts/User.context";
import { Requester } from "../../Utilities/Requester/Requester";
import { TPath } from "../../Utilities/Types/Path.type";
import "../Style/App.style.css";

/**
 * Iconothèque v1 :
 * * Gestionnaire d'affichage des pages de l'application
 * * Gestionnaire d'acces utilisateur
 *
 * @version v1
 */
export function App() : JSX.Element
{
  /** la page en cours d'affichage (lié au PageContext) */
  const [page, setPage] = useState(<UserLogInPage />);

  /** l'utilisateur en cours d'utilisation */
  const [user, setUser] = useState(DEFAULT_USER);

  /** liste des paths publiques */
  const [pathPublic, setPathPublic] = useState<TPath[]>([]);

  /** liste des paths privés */
  const [pathPrivate, setPathPrivate] = useState<TPath[]>([]);

  /** Récupération des paths publiques */
  useEffect(()=>{
    const fetchPublics = async () => {
      const response = await Requester.path.getPublics()
      if (response.data){
        setPathPublic(response.data)
      }
    }
    fetchPublics()
  },[])

  /** Récupération des paths privés */
  useEffect(()=>{
    const fetchPrivates = async () => {
      const response = await Requester.path.getPrivates(user.token)
      if (response.data){
        setPathPrivate(response.data)
      }
    }
    fetchPrivates()
  },[user])
  

  return (
    <div className="App">
      <PageContext.Provider value={{ page, setPage }}>
        <UserContext.Provider value={{ user, setUser }}>
          <PathPublicContext.Provider value={{ pathPublic, setPathPublic }}>
          <PathPrivateContext.Provider value={{ pathPrivate, setPathPrivate }}>
            {page}
          </PathPrivateContext.Provider>
          </PathPublicContext.Provider>
        </UserContext.Provider>
      </PageContext.Provider>
    </div>
  );
}

