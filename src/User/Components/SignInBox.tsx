import { useContext, useState } from "react";
import { Form } from "react-router-dom";
import { APP_STYLE } from "../../App/Style/App.bootstrap.style";
import { EntryString } from "../../Utilities/Components/EntryString";
import { TransitionContext } from "../../Utilities/Contexts/Transition.context";
import { UserContext } from "../../Utilities/Contexts/User.context";
import { Requester } from "../../Utilities/Requester/Requester";
import { EntryValidators } from "../../Utilities/Validators/Entry.Validators";
import { ThemeHandler } from "./ThemeHandler";
import { ThemeContext } from "../../Utilities/Contexts/Theme.context";
import { rgbToHex } from "../Modules/HexColo";

/**
 * Composant permetant le Sign In d'un utilisateur
 *
 * @route SignIn Ok > Transition > PathSelect
 * 
 * @version v2
 */
export function SignInBox(): JSX.Element {
  
  const { theme } = useContext(ThemeContext);

  /** Récupération du réglage de l'utilisateur dans le context */
  const {setUser} = useContext(UserContext)

  const { setTransition } = useContext(TransitionContext) 

  /** Préparation du body pour la requête SignIn */

  const [signBody, setSignBody] = useState({ name: "" , mail : "", password: "" , verifpass : ""});
  const [signValid, setSignValid] = useState({ name: false , mail : false , password: false , verifpass : false });

  /** Prépartion du message d'alerte */
  
  const [message,setMessage] = useState("")


  /**
   * Permet la modification des parametres du body :
   * 
   * @param key     Nom du paramères à modifier
   * @param value   Nouvelle valeur du parametre
   * @param valid   validité de l'Entry
   */

  const handleLogBody = (key: "name" | "password" | "verifpass" | "mail", value ? : string , valid ? : boolean ) => {
    const newSignBody = { ...signBody };
    if ( value !== undefined ) newSignBody[key] = value;
    setSignBody(newSignBody);
    const newSignValid = { ...signValid };
    if ( valid !== undefined ) newSignValid[key] = valid ;
    setSignValid(newSignValid);
  };

  /** Déclenchement d'une tentative de SignIn */

  const handleRequest = async (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const responseSign = await Requester.user.signIn({
      ...signBody, 
      theme_color : rgbToHex(theme.red, theme.green, theme.blue),
      theme_relief : theme.transparency
    }) ;
    
    if (responseSign.statusCode === 201) 
    {
      const responseLog = await Requester.user.logIn(signBody) ;
      
      if (responseLog.statusCode === 201) 
      {
        setMessage('');
        setUser(responseLog.data)
        setTransition({to : "/paths/publics", message : `Hello ${responseLog.data.name} !`}) ;
      }
      else
      {
        setMessage(responseLog.message);
      }
    }
    else
    {
      setMessage(responseSign.message);
    }
    
  }

  const isValid = signValid.name && signValid.password && signValid.verifpass && signValid.mail

  return (
    <Form method="post" onSubmit={handleRequest} className={APP_STYLE.USER.LOGIN.BOX}>
    <h2>... ou Enregistrez-vous !</h2>
      <EntryString
        accecibilityId={"user-sign-pseudo"}
        name={"Pseudo"}
        defaultValue={signBody.name}
        setValue={(value, valid) => handleLogBody("name", value, valid)}
        validators={[EntryValidators.minLenght(4)]}
      />
      <EntryString
        accecibilityId={"user-sign-mail"}
        name={"Mail"}
        defaultValue={signBody.mail}
        setValue={(value, valid) => handleLogBody("mail", value, valid)}
        validators={[EntryValidators.isMail()]}
      />
      <EntryString
        accecibilityId={"user-sign-pass"}
        name={"Mot de passe"}
        defaultValue={signBody.password}
        setValue={(value, valid) => handleLogBody("password", value, valid)}
        validators={[
          EntryValidators.minLenght(4)
        ]}
        isPass
      />
      <EntryString
        accecibilityId={"user-sign-pass-verif"}
        name={"Vérification du mdp"}
        defaultValue={signBody.verifpass}
        setValue={(value, valid) => handleLogBody("verifpass", value, valid)}
        validators={[
          EntryValidators.minLenght(4),
          EntryValidators.samePasswords(signBody.password)
        ]}
        isPass
      />
      <em className={APP_STYLE.APP.MESSAGE_BAD}>{message}</em>
      <ThemeHandler/>
      <button className={APP_STYLE.USER.LOGIN.SUBMIT} type="submit" disabled={!isValid} >Sign In</button>
    </Form>
  );
}
