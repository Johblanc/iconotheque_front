
import { useState } from 'react';
import { LogInPage } from '../../LogIn/Components/LogInPage';
import { PageContext } from '../../Utilities/Contexts/Page.context';
import '../Style/App.style.css';


/**
 * Gestionnaire d'affichage des pages de l'application
 * 
 * @version v1
 */
function App() {

  /** la page en cours d'affichage (lié au PageContext) */
  const [page , setPage] = useState(<LogInPage/>)

  return (
    <div className="App">
      <PageContext.Provider value={{page , setPage}} >
      {page}
      </PageContext.Provider>
    </div>
  );
}

export default App;
