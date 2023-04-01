import { useContext } from "react";
import { LinkCustom } from "../../Utilities/Components/LinkCustom";
import { UserContext } from "../../Utilities/Contexts/User.context";
import { APP_STYLE } from "../Style/App.bootstrap.style";

/**
 * La Navigation du site
 *
 * @route Profil            > UserViewPage
 * @route Nouvelle Icônes   > IconUpdatePage "DEFAULT_PATH"
 * @route Icônes publiques  > IconSelectPage "public"
 * @route Profil            > IconSelectPage "private"
 *
 * @version v1
 */
export function AppNav(props: {
  actif: "profil" | "new" | "public" | "private" | "";
}): JSX.Element {
  const { actif } = props;

  const { user } = useContext(UserContext);

  return (
    <nav className={APP_STYLE.APP.NAV.CADRE}>
      <h2 className={APP_STYLE.APP.NAV.TITLE}>Navigation</h2>
      <button
        className={APP_STYLE.APP.NAV.BUTTON}
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <svg  
          width="1.5em"
          viewBox="0 0 10 10"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Navigation</title>
          <path 
            className="fill-dark"
            d="M 0 0 10 0 10 2 0 2 Z M 0 4 10 4 10 6 0 6 Z M 0 8 10 8 10 10 0 10 Z" 
          />
        </svg>
      </button>
      <div className={APP_STYLE.APP.NAV.BOX_A} id="navbarNavAltMarkup">
        <div className={APP_STYLE.APP.NAV.BOX_B}>
          <LinkCustom
            className={`${APP_STYLE.APP.NAV.ITEM}${
              actif === "profil" ? " active" : ""
            }`}
            to={"/user/view"}
            name="Profile"
          />
          {user.access > 1 && (
            <LinkCustom
              className={`${APP_STYLE.APP.NAV.ITEM}${
                actif === "new" ? " active" : ""
              }`}
              to={"/paths/new"}
              name="Nouvelle icône"
            />
          )}
          <LinkCustom
            className={`${APP_STYLE.APP.NAV.ITEM}${
              actif === "public" ? " active" : ""
            }`}
            to={"/paths/publics"}
            name="Icônes publiques"
          />
          {user.access > 1 && (
            <LinkCustom
              className={`${APP_STYLE.APP.NAV.ITEM}${
                actif === "private" ? " active" : ""
              }`}
              to={"/paths/privates"}
              name="Mes icônes"
            />
          )}
        </div>
      </div>
    </nav>
  );
}
