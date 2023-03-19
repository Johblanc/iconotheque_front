import { useContext } from "react";
import { LinkCustom } from "../../Utilities/Components/LinkCustom";
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
            <LinkCustom
              className={`nav-link${(actif === "profil") ? " active" : ""}`} to={"/user/view"} name="Profile" />
            { user.access > 1 &&
              <LinkCustom 
                className={`nav-link${(actif === "new") ? " active" : ""}`} to={"/paths/new"} name="Nouvelle icône" />
            }
            <LinkCustom 
              className={`nav-link${(actif === "public") ? " active" : ""}`} to={"/paths/publics"} name="Icônes publiques"/>
            { user.access > 1 &&
              <LinkCustom className={`nav-link${(actif === "private") ? " active" : ""}`} to={"/paths/privates"} name="Mes icônes" />
            }
          </div>
        </div>
      </div>
    </nav>
  );
}
