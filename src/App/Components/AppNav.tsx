import { useContext } from "react";
import { IconSelectPage } from "../../Icon/Pages/IconSelectPage";
import { IconUpdatePage } from "../../Icon/Pages/IconUpdatePage";
import { UserViewPage } from "../../User/Pages/UserViewPage";
import { PageContext } from "../../Utilities/Contexts/Page.context";
import { UserContext } from "../../Utilities/Contexts/User.context";


/**
 * La Navigation du site
 *
 * @route Profil            > UserViewPage
 * @route Nouvelle Icônes   > IconUpdatePage "DEFAULT_PATH"
 * @route Icônes publiques  > IconSelectPage "public"
 * @route Profil            > IconSelectPage "private"
 *
 * @version v1
 */
export function AppNav(props : {actif : "profil" | "new" | "public" | "private" | ""}): JSX.Element {
  
  const {actif} = props ;
  
  const {setPage} = useContext(PageContext) ;
  const {user} = useContext(UserContext)

  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <button 
              onClick={(actif === "profil") ? undefined : ()=> setPage(<UserViewPage/>) }
              className={`nav-link${(actif === "profil") ? " active" : "" }`}
            >
              Profil
            </button>
            { user.access > 1 &&
              <button 
                onClick={(actif === "new") ? undefined : ()=> setPage(<IconUpdatePage/>) }
                className={`nav-link${(actif === "new") ? " active" : "" }`}
              >
                Nouvelle icône
              </button>
            }
            <button 
              onClick={(actif === "public") ? undefined : ()=> setPage(<IconSelectPage actif={"public"} />) }
              className={`nav-link${(actif === "public") ? " active" : "" }`}
            >
              Icônes publiques
            </button>
            { user.access > 1 &&
              <button 
                onClick={(actif === "private") ? undefined : ()=> setPage(<IconSelectPage actif={"private"} />) }
                className={`nav-link${(actif === "private") ? " active" : "" }`}
              >
                Mes icônes
              </button>
            }
          </div>
        </div>
      </div>
    </nav>
  );
}
