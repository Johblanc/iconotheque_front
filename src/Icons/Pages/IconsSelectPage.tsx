import { useContext } from "react";
import { AppHeader } from "../../App/Components/AppHeader";
import { UserContext } from "../../Utilities/Contexts/User.context";
import { IconPublicContext } from "../../Utilities/Contexts/IconPublic.context";
import { IconPrivateContext } from "../../Utilities/Contexts/IconPrivate.context";
import { IconItem } from "../Components/IconItem";
import { APP_STYLE } from "../../App/Style/App.bootstrap.style";


/**
 * Permet la selection d'une icône
 * 
 * @param props.actif Les icônes privées ou publiques
 * 
 * @version v2
 */
export function IconsSelectPage(props: { actif: "private" | "public" }) {
  const { actif } = props;

  const { iconPublic } = useContext(IconPublicContext);
  const { iconPrivate } = useContext(IconPrivateContext);
  const { user } = useContext(UserContext);

  let temp = [];
  if (actif === "public") {
    temp = iconPublic;
  } else {
    temp = [
      ...iconPublic.filter((item) => item.user.id === user.id),
      ...iconPrivate,
    ];
  }
  const icons = temp.map((item, i) => <IconItem key={i} icon={item} />);

  return (
    <>
      <AppHeader actif={actif === "private" ? "iconsPrivate" : "iconsPublic"} />
      <div className={`${APP_STYLE.PATH.SELECT.CADRE}`}>
        <h2 className={`${APP_STYLE.PATH.SELECT.TITLE}`}>
          {actif === "public" ? "Icônes publiques" : "Mes Icônes"}
        </h2>
        <div>{icons}</div>
      </div>
    </>
  );
}
