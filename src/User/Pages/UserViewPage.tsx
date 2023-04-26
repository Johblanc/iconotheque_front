import { useContext } from "react";
import { AppHeader } from "../../App/Components/AppHeader";
import { APP_STYLE } from "../../App/Style/App.bootstrap.style";
import { PathItem } from "../../Path/Components/PathItem";
import { LinkCustom } from "../../Utilities/Components/LinkCustom";
import { PathPrivateContext } from "../../Utilities/Contexts/PathPrivate.context";
import { PathPublicContext } from "../../Utilities/Contexts/PathPublic.context";
import { UserContext } from "../../Utilities/Contexts/User.context";
import { ThemeHandler } from "../Components/ThemeHandler";
import { Requester } from "../../Utilities/Requester/Requester";
import { ThemeContext } from "../../Utilities/Contexts/Theme.context";
import { rgbToHex } from "../Modules/HexColo";
import { DEFAULT_USER } from "../../Utilities/Constants/User.defaut";

/**
 * Page de Consultation de profil
 *
 * @version v2
 */
export function UserViewPage(): JSX.Element {
  const { user,setUser } = useContext(UserContext);
  const { pathPrivate } = useContext(PathPrivateContext);
  const { pathPublic } = useContext(PathPublicContext);
  const { theme } = useContext(ThemeContext);

  const paths = [
    ...pathPublic.filter((item) => item.user.name === user.name),
    ...pathPrivate,
  ];

  const SumPublished = pathPublic.filter(
    (item) => item.user.name === user.name
  ).length;
  const SumCreated = SumPublished + pathPrivate.length;
  
  /** Déclenchement d'une tentative d'Update */

  const handleRequest = async () => 
  {
    await Requester.user.update({
      theme_color : rgbToHex(
        theme.red,
        theme.green,
        theme.blue
      ) , 
      theme_relief : theme.transparency
    }, 
    user.token
    );
  };

  const isAdmin = user.access > 1;
  return (
    <>
      <AppHeader  actif={"profil"} />
      <div className={APP_STYLE.USER.VIEW.CADRE}>
        <span className={APP_STYLE.USER.VIEW.COLO}>
          <div className={APP_STYLE.USER.VIEW.BOX}>
            <h2>Profile</h2>
            <p>Pseudo : {user.name}</p>
            <p>Mail : {user.mail}</p>
            {SumCreated !== 0 && (
              <p>
                Formes créée{SumCreated > 1 && "s"} : {SumCreated}{" "}
              </p>
            )}
            {SumPublished !== 0 && (
              <p>
                Formes publiée{SumPublished > 1 && "s"} : {SumPublished}{" "}
              </p>
            )}
          </div>
          <div className={APP_STYLE.USER.VIEW.BOX_SELECT}>
            <LinkCustom
              name={"Modifier mon profile"}
              to={"/user/update"}
              className={APP_STYLE.USER.VIEW.BOX_BUTTON}
            />
            <LinkCustom
              name={"Modifier mon mot de passe"}
              to={"/user/passupdate"}
              className={APP_STYLE.USER.VIEW.BOX_BUTTON}
            />

            {isAdmin && (
              <LinkCustom
                name={"Administrer"}
                to={`/user/admin`}
                className={APP_STYLE.USER.VIEW.BOX_BUTTON}
              />
            )}
            <LinkCustom
              name={"Déconnection"}
              to={{
                to: "/paths/publics",
                message: `GoodBye ${user.name}`,
                isBad: true,
              }}
              className={APP_STYLE.USER.VIEW.BOX_BUTTON_BAD}
              onClick={()=> setTimeout(()=> setUser(DEFAULT_USER),1000)}
            />
          </div>
        </span>
        <div className={APP_STYLE.PATH.SELECT.CADRE}>
          <ThemeHandler />
          <button 
          onClick={handleRequest}
            className={APP_STYLE.APP.BTN_GOOD}
            style={{maxWidth:"350px"}}
          >
            Définir thème par défaut
          </button>
          <h3 className={APP_STYLE.PATH.SELECT.TITLE}>Mes Formes</h3>
          <div className={APP_STYLE.PATH.SELECT.BOX}>
            {paths.map((item, i) => (
              <PathItem path={item} key={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
