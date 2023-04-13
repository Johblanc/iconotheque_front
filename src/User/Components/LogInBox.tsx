import { useContext, useState } from "react";
import { Form } from "react-router-dom";
import { APP_STYLE } from "../../App/Style/App.bootstrap.style";
import { EntryString } from "../../Utilities/Components/EntryString";
import { TransitionContext } from "../../Utilities/Contexts/Transition.context";
import { UserContext } from "../../Utilities/Contexts/User.context";
import { Requester } from "../../Utilities/Requester/Requester";
import { EntryValidators } from "../../Utilities/Validators/Entry.Validators";
import { ThemeContext } from "../../Utilities/Contexts/Theme.context";
import { hexToRgb } from "../Modules/HexColo";

/**
 * Composant permetant le Log In d'un utilisateur
 *
 * @route LogIn Ok > Transition > PathSelect
 * 
 * @version v2
 */
export function LogInBox(): JSX.Element {

  /** Récupération du réglage de l'utilisateur dans le context */
  const {setUser} = useContext(UserContext)

  const { setTransition } = useContext(TransitionContext) ;
  const { setTheme } = useContext(ThemeContext) ;

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

  const handleRequest = async (event : React.FormEvent<HTMLFormElement>) => {

    event.preventDefault()
    const response = await Requester.user.logIn(logBody) ;

    

    if (response.statusCode === 201) 
    {
      console.log(response.data);
      
      setMessage('');
      setUser(response.data)
      const newColors = hexToRgb(response.data.theme_color)
      setTimeout(
        () => setTheme({
          red : newColors[0],
          green : newColors[1] ,
          blue : newColors[2] ,
          transparency : response.data.theme_relief
        }),
        800
      )
      setTransition({to : "/paths/publics", message : `Hello ${response.data.name} !`}) ;
    }
    else
    {
      setMessage("Nom ou Mot de passe invalides");
    }
  }
  const isValid = logValid.name && logValid.password

  return (
    <Form method="post"  onSubmit={handleRequest} className={APP_STYLE.USER.LOGIN.BOX}>
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
      <em className={APP_STYLE.APP.MESSAGE_BAD}>{message}</em>
      <button type="submit" className={APP_STYLE.APP.BTN_LARGE} disabled={!isValid} >Log In</button>
    </Form>
  );
}
