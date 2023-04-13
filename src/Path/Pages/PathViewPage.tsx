
import { useContext } from "react";
import { AppHeader } from "../../App/Components/AppHeader";
import { AppNav } from "../../App/Components/AppNav";
import { APP_STYLE } from "../../App/Style/App.bootstrap.style";
import { LinkCustom } from "../../Utilities/Components/LinkCustom";
import { DEFAULT_PATH } from "../../Utilities/Constants/Path.defaut";
import { PathPrivateContext } from "../../Utilities/Contexts/PathPrivate.context";
import { PathPublicContext } from "../../Utilities/Contexts/PathPublic.context";
import { TransitionContext } from "../../Utilities/Contexts/Transition.context";
import { UserContext } from "../../Utilities/Contexts/User.context";
import { Requester } from "../../Utilities/Requester/Requester";

/**
 * Page de visualisation d'une Forme
 *
 * @version v2
 */
export function PathViewPage(props: { pathId: number }): JSX.Element {
  /** L'identifiant du path en cours de publication */
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

  /** Tentative de publication */
  const handlePublish = async () => {
    const response = await Requester.path.publish(path.id, user.token);
    if (response.data) {
      setPathPublic([response.data, ...pathPublic]);
      setPathPrivate(
        pathPrivate.map((item) => {
          if (item.id === response.data.id) {
            return response.data;
          }
          return item;
        })
      );

      setTransition({
        to: "/paths/publics",
        message: `Publication réussie`,
      });
    } else {
      setTransition({
        to: `/paths/view/${path.id}`,
        message: `Publication échouée : ${response.message}`,
        isBad: true,
      });
    }
  };

  /* Conditions d'affichage */
  const isOwner = path.user.id === user.id;
  const isPrivate = path.status === "private";

  const toCamelCase = (value : string) => {

    return value.toLowerCase().split(" ").map(word => word.split("").map((letter,i) => i ? letter : letter.toUpperCase()).join("")).join("")
  }

  return (
    <>
      <AppHeader />
      <AppNav actif={""} />
      <div className={APP_STYLE.PATH.VIEW.CADRE}>
        <span className={APP_STYLE.PATH.VIEW.COLO}>
          <div className={APP_STYLE.PATH.VIEW.BOX_A}>
            <div className={APP_STYLE.PATH.VIEW.ICON_CENTER}>
            <div className={`${APP_STYLE.PATH.VIEW.ICON_BG}  ${path.status === "public" ?  "bg-primary icon-large" : "bg-warning icon-large-bad"}`}>
              <svg
                width="min(calc((1.375rem + 1.5vw)*6),10em,40vw)"
                height="min(calc((1.375rem + 1.5vw)*6),10em,40vw)"
                viewBox={path.viewbox}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Path : {path.name}</title>
                <path className={APP_STYLE.PATH.VIEW.DROWN} d={path.d} />
              </svg>
            </div>
            </div>
            <em>Créée par {path.user.name}</em>
          </div>
          {isOwner && (
          <div className={APP_STYLE.PATH.VIEW.NO_CADRE}>
              <LinkCustom name={"Modifier"} to={`/paths/update/${path.id}`} className={APP_STYLE.APP.BTN_GOOD}/>

              {isPrivate && <button className={APP_STYLE.APP.BTN_GOOD} onClick={handlePublish}>Publier</button>}

              <LinkCustom name={"Supprimer"} to={`/paths/delete/${path.id}`} className={APP_STYLE.APP.BTN_BAD} />
            </div>
          )}
        </span>
        <div className={APP_STYLE.PATH.VIEW.BOX_B}>
          <h2>{path.name}</h2>
          <h3>View Box :</h3>
          <p className={APP_STYLE.PATH.VIEW.P}>{path.viewbox}</p>
          <h3>Drown (tracé) :</h3>
          <p className={APP_STYLE.PATH.VIEW.P}>{path.d}</p>
          <h3>En Svg</h3>
          <pre style={{tabSize : "1em"}} className={APP_STYLE.PATH.VIEW.P}>
            {`<svg width="100%" viewBox="${path.viewbox}" version="1.1" xmlns="http://www.w3.org/2000/svg">\n`}
            {`\t<title>Forme ${path.name}</title>\n`}
            {`\t<path d="${path.d.split("\n").join(" ")}" />\n`}
            {`</svg>`}
          </pre>
          <h3>En React</h3>
          <pre style={{tabSize : "1em"}} className={APP_STYLE.PATH.VIEW.P}>
            {`export function Path${toCamelCase(path.name)}(): JSX.Element {\n`}
            {`\treturn (\n`}
            {`\t\t<svg width="100%" viewBox="${path.viewbox}" version="1.1" xmlns="http://www.w3.org/2000/svg">\n`}
            {`\t\t\t<title>Forme ${path.name}</title>\n`}
            {`\t\t\t<path d="${path.d.split("\n").join(" ")}" />\n`}
            {`\t\t</svg>\n`}
            {`\t)\n`}
            {`}`}
          </pre>
        </div>
      </div>
    </>
  );
}

