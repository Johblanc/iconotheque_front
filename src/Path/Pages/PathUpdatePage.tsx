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
import { EntriesViewBox } from "../../Utilities/Components/EntriesViewBox";
import { PathGraphic } from "../Components/PathGraphic";
import { SvgPathServices } from "../class/SvgPathServices";
import { IconPublicContext } from "../../Utilities/Contexts/IconPublic.context";
import { IconPrivateContext } from "../../Utilities/Contexts/IconPrivate.context";
//import { parsePath, serializeInstructions } from "@remotion/paths";

/**
 * Page de mise à jour d'une Forme
 *
 * @version v2
 */
export function PathUpdatePage(props: { pathId: number }): JSX.Element {
  /** L'identifiant du path en cours de modification */
  const { pathId } = props;

  /** Récupération des contexts */
  const { user } = useContext(UserContext);

  const { pathPublic, setPathPublic } = useContext(PathPublicContext);
  const { pathPrivate, setPathPrivate } = useContext(PathPrivateContext);
  const { iconPublic, setIconPublic } = useContext(IconPublicContext);
  const { iconPrivate, setIconPrivate } = useContext(IconPrivateContext);
  const [inAdvance, setInAdvance] = useState(false);

  const [actif, setActif] = useState<"" | "x" | "y" | "width" | "height">("");

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
    if (value !== undefined) {
      if (key === "d") {
        const newMessage = SvgPathServices.findErrors(value);
        newLogBody[key] = value;
        setMessage(newMessage);
      } else {
        newLogBody[key] = value;
      }
      setInAdvance(false);
    }
    setUpdateBody(newLogBody);

    const newLogValid = { ...updateValid };
    if (valid !== undefined) newLogValid[key] = valid;
    setUpdateValid(newLogValid);
  };

  /** Déclenchement d'une modification ou d'une création */

  const handleRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (path.id !== -1) {
      // Update

      const response = await Requester.path.update(
        path.id,
        updateBody,
        user.token
      );

      if (response.data) {
        setPathPublic(
          pathPublic.map((item) => {
            if (item.id === response.data.id) {
              return response.data;
            }
            return item;
          })
        );
        setPathPrivate(
          pathPrivate.map((item) => {
            if (item.id === response.data.id) {
              return response.data;
            }
            return item;
          })
        );
        setIconPublic(
          iconPublic.map((item) => {
            item.figures = item.figures.map((jtem) => {
              if (jtem.path.id === response.data.id) {
                jtem.path = response.data;
              }
              return jtem;
            });
            return item;
          })
        );
        setIconPrivate(
          iconPrivate.map((item) => {
            item.figures = item.figures.map((jtem) => {
              if (jtem.path.id === response.data.id) {
                jtem.path = response.data;
              }
              return jtem;
            });
            return item;
          })
        );
        setMessage("");

        setTransition({
          to: `/paths/view/${path.id}`,
          message: "Enregistrement réussi",
        });
      } else {
        if (typeof response.message === "string") {
          setMessage(response.message);
        } else {
          setMessage(response.message.join("\n"));
        }
      }
    } else {
      // New

      const response = await Requester.path.new(updateBody, user.token);

      if (response.data) {
        setPathPrivate([response.data, ...pathPrivate]);
        setMessage("");

        setTransition({
          to: `/paths/view/${response.data.id}`,
          message: "Enregistrement réussi",
        });
      } else {
        if (typeof response.message === "string") {
          setMessage(response.message);
        } else {
          setMessage(response.message.join("\n"));
        }
      }
    }
  };
  const isValid =
    updateValid.name && updateValid.viewbox && updateValid.d && message === "";

  return (
    <>
      <AppHeader actif={pathId === -1 ? "pathNew" : ""} />
      <Form
        method="post"
        onSubmit={handleRequest}
        className={APP_STYLE.PATH.VIEW.CADRE}
      >
        <span className={APP_STYLE.PATH.VIEW.COLO}>
          <div className={APP_STYLE.PATH.VIEW.BOX_A}>
            <div className={APP_STYLE.PATH.VIEW.ICON_CENTER}>
              <div
                className={`${APP_STYLE.PATH.VIEW.ICON_BG} ${
                  path.status === "public"
                    ? "bg-primary icon-large"
                    : "bg-warning icon-large-bad"
                }`}
              >
                <svg
                  width="min(calc((1.375rem + 1.5vw)*6),10em,40vw)"
                  height="min(calc((1.375rem + 1.5vw)*6),10em,40vw)"
                  viewBox={path.viewbox}
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Path : {path.name}</title>
                  <path
                    className={APP_STYLE.PATH.VIEW.DROWN}
                    d={updateBody.d}
                  />
                </svg>
              </div>
            </div>
            <em>Créée par {path.user.name}</em>
          </div>
          <div className={APP_STYLE.PATH.VIEW.NO_CADRE}>
            <EntryString
              accecibilityId={"path-update-nom"}
              name={"Nom"}
              defaultValue={updateBody.name}
              setValue={(value, valid) =>
                handleUpdateBody("name", value, valid)
              }
              validators={[EntryValidators.minLenght(4)]}
            />
            <EntriesViewBox
              accecibilityId={"path-update-viewbox"}
              defaultValue={updateBody.viewbox}
              setValue={(value, valid) =>
                handleUpdateBody("viewbox", value, valid)
              }
              setActive={setActif}
            />
            <button
              type="submit"
              disabled={!isValid || inAdvance}
              className={APP_STYLE.APP.BTN_GOOD}
            >
              {path.id !== -1
                ? "Enregistrer les modification"
                : "Enregistrer le path"}
            </button>

            <LinkCustom
              className={APP_STYLE.APP.BTN_BAD}
              name={
                path.id !== -1
                  ? "Annuler les modification"
                  : "Annuler le création"
              }
              to={path.id !== -1 ? `/paths/view/${path.id}` : `/paths/publics`}
            />
          </div>
        </span>
        <div className={APP_STYLE.PATH.VIEW.BOX_B}>
          <h2>
            {path.id !== -1 ? "Modication d'un path" : "Création d'un path"}
          </h2>

          {inAdvance ? (
            <div>
              <h4>Tracé Source</h4>
              <div>
                {updateBody.d.split("\n").map((item, i) => (
                  <p key={i} className={APP_STYLE.APP.ALT_FONT}>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <TextArea
                accecibilityId={"path-update-d"}
                name={"Tracé"}
                defaultValue={updateBody.d}
                setValue={(value, valid) => handleUpdateBody("d", value, valid)}
              />
              <p className={APP_STYLE.APP.MESSAGE_BAD}>{message}</p>
            </div>
          )}

          <button
            className={
              inAdvance ? APP_STYLE.APP.BTN_BAD : APP_STYLE.APP.BTN_GOOD
            }
            onClick={(e) => {
              e.preventDefault();
              setInAdvance(!inAdvance);
            }}
            disabled={message !== ""}
          >
            {inAdvance
              ? "Basculer en modification de base (et annuler les changements)"
              : "Basculer en modification avancée"}
          </button>
          {inAdvance && (
            <PathGraphic
              path={updateBody}
              actif={actif}
              setDValue={(value) => handleUpdateBody("d", value)}
            />
          )}
        </div>
      </Form>
    </>
  );
}
