import { useContext } from "react";
import { AppHeader } from "../../App/Components/AppHeader";
import { UserContext } from "../../Utilities/Contexts/User.context";
import { IconPublicContext } from "../../Utilities/Contexts/IconPublic.context";
import { IconPrivateContext } from "../../Utilities/Contexts/IconPrivate.context";
import { TransitionContext } from "../../Utilities/Contexts/Transition.context";
import { DEFAULT_ICON } from "../../Utilities/Constants/Icon.defaut";
import { Requester } from "../../Utilities/Requester/Requester";
import { Icon } from "../Classes/Icon.class";
import { APP_STYLE } from "../../App/Style/App.bootstrap.style";
import { LinkCustom } from "../../Utilities/Components/LinkCustom";

export function IconsViewPage(props: { iconId: number }): JSX.Element {
  /** L'identifiant du path en cours de publication */
  const { iconId } = props;

  /** Récupération des contexts */
  const { user } = useContext(UserContext);

  const { iconPublic, setIconPublic } = useContext(IconPublicContext);
  const { iconPrivate, setIconPrivate } = useContext(IconPrivateContext);

  const { setTransition } = useContext(TransitionContext);

  /** Récupération du path */
  const icon =
    [...iconPublic, ...iconPrivate].filter((item) => item.id === iconId)[0] ||
    DEFAULT_ICON;

  /** Tentative de publication */
  const handlePublish = async () => {
    const response = await Requester.icon.publish(icon.id, user.token);
    if (response.data) {
      setIconPublic([new Icon(response.data), ...iconPublic]);
      setIconPrivate(iconPrivate.filter((item) => item.id !== icon.id));

      setTransition({
        to: "/icons/publics",
        message: `Publication réussie`,
      });
    } else {
      setTransition({
        to: `/icons/view/${icon.id}`,
        message: `Publication échouée : ${response.message}`,
        isBad: true,
      });
    }
  };

  /* Conditions d'affichage */
  const isOwner = icon.user.id === user.id;
  const isPrivate = icon.status === "private";

  const toCamelCase = (value: string) => {
    return value
      .toLowerCase()
      .split(" ")
      .map((word) =>
        word
          .split("")
          .map((letter, i) => (i ? letter : letter.toUpperCase()))
          .join("")
      )
      .join("");
  };

  const figuresSvg = icon.figures.map((figure, i) => (
    <path key={i} style={figure.aspect.style} d={figure.path.d} />
  ));

  const figuresDetail = icon.figures.map((figure, i) => (
    <div key={i} className="d-flex">
      <svg
        onClick={()=>setTransition({to : `/paths/view/${figure.path.id}`})}
        className="m-2"
        width="min(calc((1.375rem + 1.5vw)*3),5em,20vw)"
        height="min(calc((1.375rem + 1.5vw)*3),5em,20vw)"
        viewBox={figure.path.viewbox}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Path : {figure.path.name}</title>
        <path className={`${APP_STYLE.PATH.SELECT.DROWN}`} d={figure.path.d} />
      </svg>
      <svg
        className="m-2"
        width="min(calc((1.375rem + 1.5vw)*3),5em,20vw)"
        height="min(calc((1.375rem + 1.5vw)*3),5em,20vw)"
        viewBox="0 0 5 5"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Plus</title>
        <path
          className={`${APP_STYLE.PATH.SELECT.DROWN}`}
          d="M 1 2 2 2 2 1 3 1 3 2 4 2 4 3 3 3 3 4 2 4 2 3 1 3 Z"
        />
      </svg>
      <svg
        onClick={()=>setTransition({to : `/aspects/view/${figure.aspect.id}`})}
        className="m-2"
        width="min(calc((1.375rem + 1.5vw)*3),5em,20vw)"
        height="min(calc((1.375rem + 1.5vw)*3),5em,20vw)"
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Aspect : {figure.aspect.name}</title>
        <circle
          cx="50"
          cy="50"
          r="20"
          style={figure.aspect.style}
        />
      </svg>
      <svg
        className="m-2"
        width="min(calc((1.375rem + 1.5vw)*3),5em,20vw)"
        height="min(calc((1.375rem + 1.5vw)*3),5em,20vw)"
        viewBox="0 0 5 5"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Equal</title>
        <path
          className={`${APP_STYLE.PATH.SELECT.DROWN}`}
          d="M 1 1 4 1 4 2 1 2 Z M 1 3 4 3 4 4 1 4 Z"
        />
      </svg>
      <svg
        className="m-2"
        width="min(calc((1.375rem + 1.5vw)*3),5em,20vw)"
        height="min(calc((1.375rem + 1.5vw)*3),5em,20vw)"
        viewBox={figure.path.viewbox}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Figure : Path {figure.path.name} + Aspect {figure.aspect.name}</title>
        <path style={figure.aspect.style} d={figure.path.d} />
      </svg>
    </div>
  ));


  return (
    <>
      <AppHeader actif={""} />
      <div className={APP_STYLE.PATH.VIEW.CADRE}>
        <span className={APP_STYLE.PATH.VIEW.COLO}>
          <div className={APP_STYLE.PATH.VIEW.BOX_A}>
            <div className={APP_STYLE.PATH.VIEW.ICON_CENTER}>
              <div
                className={`${APP_STYLE.PATH.VIEW.ICON_BG}  ${
                  icon.status === "public"
                    ? "bg-primary icon-large"
                    : "bg-warning icon-large-bad"
                }`}
              >
                <svg
                  width="min(calc((1.375rem + 1.5vw)*6),10em,40vw)"
                  height="min(calc((1.375rem + 1.5vw)*6),10em,40vw)"
                  viewBox={icon.viewbox}
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Icône : {icon.name}</title>
                  {figuresSvg}
                </svg>
              </div>
            </div>
            <em>Créée par {icon.user.name}</em>
          </div>
          {isOwner && (
            <div className={APP_STYLE.PATH.VIEW.NO_CADRE}>
              <LinkCustom
                name={"Modifier"}
                to={`/icons/update/${icon.id}`}
                className={APP_STYLE.APP.BTN_GOOD}
              />

              {isPrivate && (
                <button
                  className={APP_STYLE.APP.BTN_GOOD}
                  onClick={handlePublish}
                >
                  Publier
                </button>
              )}

              <LinkCustom
                name={"Supprimer"}
                to={`/icons/delete/${icon.id}`}
                className={APP_STYLE.APP.BTN_BAD}
              />
            </div>
          )}
        </span>
        <div className={APP_STYLE.PATH.VIEW.BOX_B}>
          <h2>{icon.name}</h2>
          <h3>View Box :</h3>
          <p className={APP_STYLE.PATH.VIEW.P}>{icon.viewbox}</p>
          <h3>Les Figures :</h3>
          <div>{figuresDetail}</div>
          <h3>En Svg</h3>
          <pre style={{tabSize : "1em"}} className={APP_STYLE.PATH.VIEW.P}>
            {`<svg width="100%" viewBox="${icon.viewbox}" version="1.1" xmlns="http://www.w3.org/2000/svg">\n`}
            {`\t<style>\n\n`}
            {icon.figures.map(item => item.aspect.asCss.split("\n").map(jtem => `\t\t${jtem}`).join("\n")).join("\n\n")}
            {`\n\n\t</style>\n`}
            {`\t<title>Icone ${icon.name}</title>\n`}
            {icon.figures.reverse().map(item => `\t<path class="${item.aspect.name}" d="${item.path.d.split("\n").join(" ")}" />`).join("\n")}
            {`\n</svg>`}
          </pre>
          <h3>En React</h3>
          <pre style={{tabSize : "1em"}} className={APP_STYLE.PATH.VIEW.P}>
            {`export function Path${toCamelCase(icon.name)}(): JSX.Element {\n`}
            {`\treturn (\n`}
            {`\t\t<svg width="100%" viewBox="${icon.viewbox}" version="1.1" xmlns="http://www.w3.org/2000/svg">\n`}
            {`\t\t\t<title>Forme ${icon.name}</title>\n`}
            {icon.figures.reverse().map(item => `\t\t\t<path\n${item.aspect.asReactStyleString.split("\n").map(jtem => `\t\t\t\t${jtem}`).join("\n")}\n\t\t\t\td="${item.path.d.split("\n").join(" ")}"\n\t\t\t/>`).join("\n")}
            {`\n\t\t</svg>\n`}
            {`\t)\n`}
            {`}`}
          </pre>
        </div>
      </div>
    </>
  );
}
