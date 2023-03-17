import { useState } from "react";
import { LogInPage } from "../../LogIn/Components/LogInPage";
import { DEFAULT_USER } from "../../Utilities/Constants/User.defaut";
import { PageContext } from "../../Utilities/Contexts/Page.context";
import { UserContext } from "../../Utilities/Contexts/User.context";
import "../Style/App.style.css";

/**
 * Iconothèque v1 :
 * * Gestionnaire d'affichage des pages de l'application
 * * Gestionnaire d'acces utilisateur
 *
 * @version v1
 */
function App() {

  /** la page en cours d'affichage (lié au PageContext) */
  const [page, setPage] = useState(<LogInPage />);

  /** l'utilisateur en cours d'utilisation */
  const [user, setUser] = useState(DEFAULT_USER);

  return (
    <div className="App">
      <PageContext.Provider value={{ page, setPage }}>
        <UserContext.Provider value={{ user, setUser }}>
          {page}
        </UserContext.Provider>
      </PageContext.Provider>
    </div>
  );
}

export default App;
