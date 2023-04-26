import { useContext } from "react";
import { AppHeader } from "../../App/Components/AppHeader";
import { APP_STYLE } from "../../App/Style/App.bootstrap.style";
import { PathPrivateContext } from "../../Utilities/Contexts/PathPrivate.context";
import { PathPublicContext } from "../../Utilities/Contexts/PathPublic.context";
import { UserContext } from "../../Utilities/Contexts/User.context";
import { PathItem } from "../Components/PathItem";

/**
 * Permet de selectionnner une Forme
 *
 * @param props.actif les données publiques ou privées
 *
 * @route nav > ?
 * @route selection path > PathSelectPage {path}
 *
 * @version v2
 */
export function PathSelectPage(props: {
  actif: "public" | "private";
}): JSX.Element {
  const { actif } = props;

  const { pathPublic } = useContext(PathPublicContext);
  const { pathPrivate } = useContext(PathPrivateContext);
  const { user } = useContext(UserContext);

  let path = [];
  if (actif === "public") {
    path = pathPublic;
  } else {
    path = [
      ...pathPublic.filter((item) => item.user.id === user.id),
      ...pathPrivate,
    ];
  }
  const paths = path.map((item, i) => (
      <PathItem path={item}  key={i}/>
  ));

  return (
    <>
      <AppHeader actif={actif === "public" ? "pathPublic" : "pathPrivate"} />
      <div className={`${APP_STYLE.PATH.SELECT.CADRE}`}>
        <h2 className={`${APP_STYLE.PATH.SELECT.TITLE}`}>
          {actif === "public" ? "Formes publiques" : "Mes Formes"}
        </h2>
        <div className={`${APP_STYLE.PATH.SELECT.BOX}`}>
          {paths}
        </div>
      </div>
    </>
  );
}
