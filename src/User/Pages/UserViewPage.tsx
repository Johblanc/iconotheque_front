import { useContext } from "react";
import { AppHeader } from "../../App/Components/AppHeader";
import { AppNav } from "../../App/Components/AppNav";
import { APP_STYLE } from "../../App/Style/App.bootstrap.style";
import { IconItem } from "../../Icon/Components/IconItem";
import { LinkCustom } from "../../Utilities/Components/LinkCustom";
import { PathPrivateContext } from "../../Utilities/Contexts/PathPrivate.context";
import { PathPublicContext } from "../../Utilities/Contexts/PathPublic.context";
import { UserContext } from "../../Utilities/Contexts/User.context";

/**
 * Page de Consultation de profil
 *
 * @version v1
 */
export function UserViewPage(): JSX.Element {
  const { user } = useContext(UserContext);
  const { pathPrivate } = useContext(PathPrivateContext);
  const { pathPublic } = useContext(PathPublicContext);

  const SumPublished = pathPublic.filter(
    (item) => item.user.name === user.name
  ).length;
  const SumCreated = SumPublished + pathPrivate.length;

  const icons = [
    ...pathPublic.filter((item) => item.user.name === user.name),
    ...pathPrivate,
  ];
  return (
    <>
      <AppHeader />
      <AppNav actif={"profil"} />
      <div className={APP_STYLE.USER.VIEW.CADRE}>
        <span className={APP_STYLE.USER.VIEW.COLO}>
          <div className={APP_STYLE.USER.VIEW.BOX}>
            <h2>Profile</h2>
            <p>Pseudo : {user.name}</p>
            <p>Mail : {user.mail}</p>
            {SumCreated !== 0 && (
              <p>
                Icônes créée{SumCreated > 1 && "s"} : {SumCreated}{" "}
              </p>
            )}
            {SumPublished !== 0 && (
              <p>
                Icônes publiée{SumPublished > 1 && "s"} : {SumPublished}{" "}
              </p>
            )}
          </div>
          <div className={APP_STYLE.USER.VIEW.BOX_SELECT}>
            <LinkCustom name={"Modifier mon profile"} to={"/user/update"} className={APP_STYLE.USER.VIEW.BOX_BUTTON} />
            <LinkCustom
              name={"Modifier mon mot de passe"}
              to={"/user/passupdate"}
              className={APP_STYLE.USER.VIEW.BOX_BUTTON} 
            />
            <LinkCustom
              name={"Déconnection"}
              to={{
                to: "/user/login",
                message: `GoodBye ${user.name}`,
                isBad: true,
              }}
              className={APP_STYLE.USER.VIEW.BOX_BUTTON_BAD} 
            />
          </div>
        </span>
        <div className={APP_STYLE.PATH.SELECT.CADRE}>
          <h3 className={APP_STYLE.PATH.SELECT.TITLE}>Mes Icônes</h3>
          <div className={APP_STYLE.PATH.SELECT.BOX}>
            {icons.map((item, i) => (
              <IconItem path={item} key={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
