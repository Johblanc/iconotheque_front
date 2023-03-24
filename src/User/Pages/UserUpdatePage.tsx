import { useContext, useState } from "react";
import { Form } from "react-router-dom";
import { AppHeader } from "../../App/Components/AppHeader";
import { APP_STYLE } from "../../App/Style/App.bootstrap.style";
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
export function UserUpdatePage(): JSX.Element {
  /** Récupération du réglage de l'utilisateur dans le context */
  const { user, setUser } = useContext(UserContext);

  const { setTransition } = useContext(TransitionContext);

  /** Préparation du body pour la requête SignIn */

  const [updateBody, setSignBody] = useState({
    name: user.name,
    mail: user.mail,
  });
  const [signValid, setSignValid] = useState({ name: true, mail: true });

  /** Prépartion du message d'alerte */

  const [message, setMessage] = useState("");

  /**
   * Permet la modification des parametres du body :
   *
   * @param key     Nom du paramères à modifier
   * @param value   Nouvelle valeur du parametre
   * @param valid   validité de l'Entry
   */

  const handleUpdateBody = (
    key: "name" | "mail",
    value?: string,
    valid?: boolean
  ) => {
    const newSignBody = { ...updateBody };
    if (value !== undefined) newSignBody[key] = value;
    setSignBody(newSignBody);
    const newSignValid = { ...signValid };
    if (valid !== undefined) newSignValid[key] = valid;
    setSignValid(newSignValid);
  };

  /** Déclenchement d'une tentative d'Update */

  const handleRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const responseUpdate = await Requester.user.update(updateBody, user.token);
    if (responseUpdate.data) {
      setMessage("");
      setUser(responseUpdate.data);
      setTransition({ to: "/user/view", message: `Enregistrement Réussi` });
    } else {
      setMessage(responseUpdate.message);
    }
  };

  const isValid = signValid.name && signValid.mail;

  return (
    <div className={APP_STYLE.APP.PAGE}>
      <AppHeader />
      <Form
        method="post"
        onSubmit={handleRequest}
        className={APP_STYLE.USER.LOGIN.CADRE_A}
      >
        <div className={APP_STYLE.USER.LOGIN.CADRE_B}>
          <div className={APP_STYLE.USER.LOGIN.BOX}>
            <h2>Modification du Profile</h2>
            <EntryString
              name={"Pseudo"}
              defaultValue={updateBody.name}
              setValue={(value, valid) =>
                handleUpdateBody("name", value, valid)
              }
              validators={[EntryValidators.minLenght(4)]}
            />
            <EntryString
              name={"Mail"}
              defaultValue={updateBody.mail}
              setValue={(value, valid) =>
                handleUpdateBody("mail", value, valid)
              }
              validators={[EntryValidators.isMail()]}
            />
            <em className={APP_STYLE.APP.MESSAGE_BAD}>{message}</em>
          </div>
          <div className={APP_STYLE.USER.LOGIN.BOX}>
            <button
              className={APP_STYLE.APP.BTN_GOOD}
              type="submit"
              disabled={!isValid}
            >
              Enregistrer les modifications
            </button>
            <LinkCustom
              className={APP_STYLE.APP.BTN_BAD}
              name={"Annuler les modifications"}
              to={"/user/view"}
            />
          </div>
        </div>
      </Form>
    </div>
  );
}
