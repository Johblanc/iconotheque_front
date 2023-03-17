import { useContext, useState } from "react";
import { IconSelectPage } from "../../Icon/Pages/IconSelectPage";
import { EntryString } from "../../Utilities/Components/EntryString";
import { PageContext } from "../../Utilities/Contexts/Page.context";
import { UserContext } from "../../Utilities/Contexts/User.context";
import { Requester } from "../../Utilities/Requester/Requester";

/**
 * Composant permetant le Log In d'un utilisateur
 *
 * @route LogIn Ok > Transition > IconSelect
 * 
 * @version v1
 */
export function LogInBox(): JSX.Element {

  /** Récupération du réglage de l'utilisateur dans le context */
  const {setUser} = useContext(UserContext)

  /** Récupération du réglage de la page dans le context */
  const {setPage} = useContext(PageContext)

  /** Préparation du body pour la requête LogIn */

  const [logBody, setLogBody] = useState({ name: "", password: "" });

  /** Prépartion du message d'alerte */
  
  const [message,setMessage] = useState("")


  /**
   * Permet la modification des parametres du body :
   * 
   * @param key     Nom du paramères à modifier
   * @param value   Nouvelle valeur du parametre
   */

  const handleLogBody = (key: "name" | "password", value: string) => {
    const newLogBody = { ...logBody };
    newLogBody[key] = value;
    setLogBody(newLogBody);
  };

  /** Déclenchement d'une tentative de Log In */

  const handleRequest = async () => {

    const response = await Requester.user.logIn(logBody) ;


    if (response.statusCode === 201) 
    {
      setMessage('');
      setUser(response.data)
      setPage(<IconSelectPage/>)
    }
    else
    {
      setMessage("Nom ou Mot de passe invalides");
    }
    
  }

  return (
    <div>
      <EntryString
        name={"Nom"}
        defaultValue={logBody.name}
        setter={(value) => handleLogBody("name", value)}
      />
      <EntryString
        name={"Mot de passe"}
        defaultValue={logBody.password}
        setter={(value) => handleLogBody("password", value)}
        isPass
      />
      <div>{message}</div>
      <button onClick={handleRequest}>Log In</button>
    </div>
  );
}
