import { useContext, useState } from "react";
import { IconSelectPage } from "../../Icon/Pages/IconSelectPage";
import { EntryString } from "../../Utilities/Components/EntryString";
import { PageContext } from "../../Utilities/Contexts/Page.context";
import { UserContext } from "../../Utilities/Contexts/User.context";
import { Requester } from "../../Utilities/Requester/Requester";
import { EntryValidators } from "../../Utilities/Validators/Entry.Validators";

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
  const [logValid, setLogValid] = useState({ name: false, password: false });

  /** Prépartion du message d'alerte */
  
  const [message,setMessage] = useState("")


  /**
   * Permet la modification des parametres du body :
   * 
   * @param key     Nom du paramères à modifier
   * @param value   Nouvelle valeur du parametre
   * @param valid   validité de l'Entry
   */

  const handleLogBody = (key: "name" | "password", value ? : string , valid ? : boolean ) => {
    const newLogBody = { ...logBody };
    if ( value !== undefined ) newLogBody[key] = value;
    setLogBody(newLogBody);
    const newLogValid = { ...logValid };
    if ( valid !== undefined ) newLogValid[key] = valid ;
    setLogValid(newLogValid);
  };


  /** Déclenchement d'une tentative de Log In */

  const handleRequest = async () => {

    const response = await Requester.user.logIn(logBody) ;


    if (response.statusCode === 201) 
    {
      setMessage('');
      setUser(response.data)
      setPage(<IconSelectPage actif={"public"}/>)
    }
    else
    {
      setMessage("Nom ou Mot de passe invalides");
    }
    
  }
  const isValid = logValid.name && logValid.password

  console.log(isValid ,logValid.name ,logValid.password);
  

  return (
    <div>
      <h2>Connectez-vous ...</h2>
      <EntryString
        name={"Pseudo"}
        defaultValue={logBody.name}
        setValue={(value, valid) => handleLogBody("name", value, valid)}
        validators={[EntryValidators.minLenght(4)]}
      />
      <EntryString
        name={"Mot de passe"}
        defaultValue={logBody.password}
        setValue={(value, valid) => handleLogBody("password", value, valid)}
        validators={[EntryValidators.minLenght(4)]}
        isPass
      />
      <div>{message}</div>
      <button onClick={handleRequest} disabled={!isValid} >Log In</button>
    </div>
  );
}
