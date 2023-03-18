import { useState } from "react";

/**
 * La Navigation du site
 *
 * @version v1
 */
export function AppNav(props : {actif : "profil" | "new" | "public" | "private" | ""}): JSX.Element {
  
  const {actif} = props
  
  const [isCollapse, setIsCollapse] = useState(true);

  // Listes des icone fetch

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
            <button className={`nav-link${(actif === "profil") ? " active" : "" }`}>
              Profil
            </button>
            <button className={`nav-link${(actif === "new") ? " active" : "" }`}>
              Nouvelle icône
            </button>
            <button className={`nav-link${(actif === "public") ? " active" : "" }`}>
              Icônes publiques
            </button>
            <button className={`nav-link${(actif === "private") ? " active" : "" }`}>
              Mes icônes
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
