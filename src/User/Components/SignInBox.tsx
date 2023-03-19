import { useContext, useState } from "react";
import { Form } from "react-router-dom";
import { EntryString } from "../../Utilities/Components/EntryString";
import { TransitionContext } from "../../Utilities/Contexts/Transition.context";
import { UserContext } from "../../Utilities/Contexts/User.context";
import { Requester } from "../../Utilities/Requester/Requester";
import { EntryValidators } from "../../Utilities/Validators/Entry.Validators";

/**
 * Composant permetant le Sign In d'un utilisateur
 *
 * @route SignIn Ok > Transition > IconSelect
 * 
 * @version v1
 */
export function SignInBox(): JSX.Element {

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

  const handleRequest = async () => {

    const responseSign = await Requester.user.SignIn(signBody) ;
    
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
    <Form method="post" onSubmit={handleRequest}>
    <h2>... ou Enregistrez-vous !</h2>
      <EntryString
        name={"Pseudo"}
        defaultValue={signBody.name}
        setValue={(value, valid) => handleLogBody("name", value, valid)}
        validators={[EntryValidators.minLenght(4)]}
      />
      <EntryString
        name={"Mail"}
        defaultValue={signBody.mail}
        setValue={(value, valid) => handleLogBody("mail", value, valid)}
        validators={[EntryValidators.isMail()]}
      />
      <EntryString
        name={"Mot de passe"}
        defaultValue={signBody.password}
        setValue={(value, valid) => handleLogBody("password", value, valid)}
        validators={[
          EntryValidators.minLenght(4)
        ]}
        isPass
      />
      <EntryString
        name={"Vérification du mot de passe"}
        defaultValue={signBody.verifpass}
        setValue={(value, valid) => handleLogBody("verifpass", value, valid)}
        validators={[
          EntryValidators.minLenght(4),
          EntryValidators.samePasswords(signBody.password)
        ]}
        isPass
      />
      <div>{message}</div>
      <button type="submit" disabled={!isValid} >Sign In</button>
    </Form>
  );
}