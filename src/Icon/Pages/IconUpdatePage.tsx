
import { useContext, useState } from "react";
import { Form } from "react-router-dom";
import { AppHeader } from "../../App/Components/AppHeader";
import { APP_STYLE } from "../../App/Style/App.bootstrap.style";
import { EntryString } from "../../Utilities/Components/EntryString";
import { LinkCustom } from "../../Utilities/Components/LinkCustom";
import { TextArea } from "../../Utilities/Components/TextArea";
import { DEFAULT_PATH } from "../../Utilities/Constants/Path.defaut";
import { PathPrivateContext } from "../../Utilities/Contexts/PathPrivate.context";
import { PathPublicContext } from "../../Utilities/Contexts/PathPublic.context";
import { TransitionContext } from "../../Utilities/Contexts/Transition.context";
import { UserContext } from "../../Utilities/Contexts/User.context";
import { Requester } from "../../Utilities/Requester/Requester";
import { EntryValidators } from "../../Utilities/Validators/Entry.Validators";

/**
 * Page de mise à jour d'un icône
 *
 * @version v1
 */
export function IconUpdatePage(props: { pathId: number }): JSX.Element {
  /** L'identifiant du path en cours de modification */
  const { pathId } = props;

  /** Récupération des contexts */
  const { user } = useContext(UserContext);

  const { pathPublic, setPathPublic } = useContext(PathPublicContext);
  const { pathPrivate, setPathPrivate } = useContext(PathPrivateContext);

  const { setTransition } = useContext(TransitionContext);

  /** Récupération du path */
  const path =
    [...pathPublic, ...pathPrivate].filter((item) => item.id === pathId)[0] ||
    DEFAULT_PATH;

  /** Préparation du body pour la requête LogIn */
  const [updateBody, setUpdateBody] = useState({
    name: path.name,
    viewbox: path.viewbox,
    d: path.d,
  });
  const [updateValid, setUpdateValid] = useState({
    name: path.id !== -1,
    viewbox: true,
    d: true,
  });

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
    key: "name" | "viewbox" | "d",
    value?: string,
    valid?: boolean
  ) => {
    const newLogBody = { ...updateBody };
    if (value !== undefined) newLogBody[key] = value;
    setUpdateBody(newLogBody);
    const newLogValid = { ...updateValid };
    if (valid !== undefined) newLogValid[key] = valid;
    setUpdateValid(newLogValid);
  };

  /** Déclenchement d'une modification ou d'une création */

  const handleRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (path.id !== -1){ // Update

      const response = await Requester.path.update(path.id,updateBody,user.token) ;
  
      if (response.data){
        setPathPublic(pathPublic.map(item => {
          if (item.id === response.data.id){
            return response.data
          }
          return item
        }))
        setPathPrivate(pathPrivate.map(item => {
          if (item.id === response.data.id){
            return response.data
          }
          return item
        }))
        setMessage("")
  
        setTransition({to : `/paths/view/${path.id}`, message : "Enregistrement réussi"})
      }
      else {
        if (typeof response.message === "string"){
          setMessage(response.message)
        }
        else
        {
          setMessage(response.message.join("\n"))
        }
      }
    }
    else { // New

      const response = await Requester.path.new(updateBody,user.token) ;
  
      if (response.data){
        setPathPrivate([response.data, ...pathPrivate])
        setMessage("")
  
        setTransition({to : `/paths/view/${response.data.id}`, message : "Enregistrement réussi"})
      }
      else {
        if (typeof response.message === "string"){
          setMessage(response.message)
        }
        else
        {
          setMessage(response.message.join("\n"))
        }
      }
    }
  };
  const isValid = updateValid.name && updateValid.viewbox && updateValid.d;

  /*
  console.log(updateBody.d);
  
  const verifPath = (val : string) => {
    try {
      return parsePath(updateBody.d)
    }
    catch (err) {
      return err
    }
  }

  console.log(verifPath(updateBody.d));*/
  return (
    <>
      <AppHeader />
      <Form method="post" onSubmit={handleRequest} className={APP_STYLE.PATH.VIEW.CADRE}>
        <span className={APP_STYLE.PATH.VIEW.COLO}>
          <div className={APP_STYLE.PATH.VIEW.BOX_A}>
            <div className={APP_STYLE.PATH.VIEW.ICON_CENTER}>
              <div className={`${APP_STYLE.PATH.VIEW.ICON_BG} ${path.status === "public" ?  "bg-secondary icon-large" : "bg-warning icon-large-bad"}`}>
                <svg
                  width="min(calc((1.375rem + 1.5vw)*6),10em,40vw)"
                  viewBox={updateBody.viewbox}
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Path : {updateBody.name}</title>
                  <path className={APP_STYLE.PATH.VIEW.DROWN} d={updateBody.d} />
                </svg>
              </div>
            </div>
            <em>Créée par {path.user.name}</em>
          </div>
          <div className={APP_STYLE.PATH.VIEW.NO_CADRE}>
        
            <button type="submit" disabled={!isValid} className={APP_STYLE.APP.BTN_GOOD}>
              {(path.id !== -1) ? "Enregistrer les modification" : "Enregistrer le path"}
            </button>

            <LinkCustom  className={APP_STYLE.APP.BTN_BAD} name={(path.id !== -1) ? "Annuler les modification" : "Annuler le création"} to={(path.id !== -1) ? `/paths/view/${path.id}` : `/paths/publics`} />
          </div>
        </span>
        <div className={APP_STYLE.PATH.VIEW.BOX_B}>
          
        <h2>{(path.id !== -1) ? "Modication d'un path" : "Création d'un path"}</h2>
        <EntryString
          name={"Nom"}
          defaultValue={updateBody.name}
          setValue={(value, valid) => handleUpdateBody("name", value, valid)}
          validators={[EntryValidators.minLenght(4)]}
        />
        <EntryString
          name={"View Box"}
          defaultValue={updateBody.viewbox}
          setValue={(value, valid) => handleUpdateBody("viewbox", value, valid)}
          validators={[EntryValidators.minLenght(4)]}
        />
        <TextArea
          name={"Drown"}
          defaultValue={updateBody.d}
          setValue={(value, valid) => handleUpdateBody("d", value, valid)}
          validators={[EntryValidators.minLenght(4)]}
        />
        <pre className={APP_STYLE.APP.MESSAGE_BAD} >{message}</pre>
        </div>
      </Form>
    </>
  );
}
