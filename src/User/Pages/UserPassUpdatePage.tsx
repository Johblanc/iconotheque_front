import { useContext, useState } from "react";
import { Form } from "react-router-dom";
import { EntryString } from "../../Utilities/Components/EntryString";
import { LinkCustom } from "../../Utilities/Components/LinkCustom";
import { TransitionContext } from "../../Utilities/Contexts/Transition.context";
import { UserContext } from "../../Utilities/Contexts/User.context";
import { Requester } from "../../Utilities/Requester/Requester";
import { EntryValidators } from "../../Utilities/Validators/Entry.Validators";

/**
 * Page de mise à jour des données utilisateur
 *
 * @version v1
 */
export function UserPassUpdatePage(): JSX.Element {

  /** Récupération du réglage de l'utilisateur dans le context */
  const {user, setUser} = useContext(UserContext)

  const { setTransition } = useContext(TransitionContext) 

  /** Préparation du body pour la requête SignIn */

  const [updateBody, setSignBody] = useState({ password: "" , verifpass : ""});
  const [signValid, setSignValid] = useState({ password: false , verifpass : false });

  /** Prépartion du message d'alerte */
  
  const [message,setMessage] = useState("")


  /**
   * Permet la modification des parametres du body :
   * 
   * @param key     Nom du paramères à modifier
   * @param value   Nouvelle valeur du parametre
   * @param valid   validité de l'Entry
   */

  const handleUpdateBody = (key: "password" | "verifpass" , value ? : string , valid ? : boolean ) => {
    const newSignBody = { ...updateBody };
    if ( value !== undefined ) newSignBody[key] = value;
    setSignBody(newSignBody);
    const newSignValid = { ...signValid };
    if ( valid !== undefined ) newSignValid[key] = valid ;
    setSignValid(newSignValid);
  };

  /** Déclenchement d'une tentative d'Update */

  const handleRequest = async (event : React.FormEvent<HTMLFormElement>) => {

    event.preventDefault()
    const responseUpdate = await Requester.user.update(updateBody,user.token) ;
    if (responseUpdate.data ){
      setMessage("")
      setUser(responseUpdate.data)
      setTransition({to : "/user/view", message : `Enregistrement Réussi`}) ;
    }
    else
    {
      setMessage(responseUpdate.message)
    }
  }

  const isValid = signValid.password && signValid.verifpass

  return (
    <Form method="post" onSubmit={handleRequest}>
      <h2>Modification du mot de passe</h2>
      <EntryString
        name={"Mot de passe"}
        defaultValue={updateBody.password}
        setValue={(value, valid) => handleUpdateBody("password", value, valid)}
        validators={[EntryValidators.minLenght(4)]}
        isPass
      />
      <EntryString
        name={"Vérification du mot de passe"}
        defaultValue={updateBody.verifpass}
        setValue={(value, valid) => handleUpdateBody("verifpass", value, valid)}
        validators={[
          EntryValidators.minLenght(4),
          EntryValidators.samePasswords(updateBody.password),
        ]}
        isPass
      />
      <div>{message}</div>
      <button type="submit" disabled={!isValid} >
        Enregistrer les modifications
      </button>
      <div>
        <LinkCustom name={"Annuler les modifications"} to={"/user/view"} />
      </div>
    </Form>
  );
}
