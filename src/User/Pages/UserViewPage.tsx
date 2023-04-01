import { ChangeEvent, useContext } from "react";
import { AppHeader } from "../../App/Components/AppHeader";
import { AppNav } from "../../App/Components/AppNav";
import { APP_STYLE } from "../../App/Style/App.bootstrap.style";
import { IconItem } from "../../Icon/Components/IconItem";
import { LinkCustom } from "../../Utilities/Components/LinkCustom";
import { PathPrivateContext } from "../../Utilities/Contexts/PathPrivate.context";
import { PathPublicContext } from "../../Utilities/Contexts/PathPublic.context";
import { ThemeContext } from "../../Utilities/Contexts/Theme.context";
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
  const { theme, setTheme } = useContext(ThemeContext);

  const SumPublished = pathPublic.filter(
    (item) => item.user.name === user.name
  ).length;
  const SumCreated = SumPublished + pathPrivate.length;

  const icons = [
    ...pathPublic.filter((item) => item.user.name === user.name),
    ...pathPrivate,
  ];

  const hexToRgb = (hex: string) => {
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      let c = hex.substring(1).split("");
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      const result = Number("0x" + c.join(""));
      return [(result >> 16) & 255, (result >> 8) & 255, result & 255];
    }
    throw new Error("Bad Hex");
  };

  const rgbcToHex = (r: number , g : number , b : number) => {
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
  };

  const handleColors = (event: ChangeEvent<HTMLInputElement>) => {
    const newTheme = { ...theme };
    [newTheme.red, newTheme.green, newTheme.blue] = hexToRgb(
      event.target.value
    );
    setTheme(newTheme);
  };

  const handleTransparency = (event: ChangeEvent<HTMLInputElement>) => {
    const newTheme = { ...theme };
    newTheme.transparency = Number(event.target.value);
    setTheme(newTheme);
  };
  const isAdmin = user.access > 1;
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
                to: "/user/login",
                message: `GoodBye ${user.name}`,
                isBad: true,
              }}
              className={APP_STYLE.USER.VIEW.BOX_BUTTON_BAD}
            />
          </div>
        </span>
        <div className={APP_STYLE.PATH.SELECT.CADRE}>
          <h3 className={APP_STYLE.PATH.SELECT.TITLE}>Theme</h3>
          <h4>Couleur :</h4>
          <input type="color" onChange={handleColors} defaultValue={rgbcToHex(theme.red,theme.green,theme.blue)}></input>
          <h4>Ombrage :</h4>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            defaultValue={theme.transparency}
            onChange={handleTransparency}
          ></input>
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
