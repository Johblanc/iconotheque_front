import { useContext } from "react";
import { LinkCustom } from "../../Utilities/Components/LinkCustom";
import { UserContext } from "../../Utilities/Contexts/User.context";
import { APP_STYLE, PERSO } from "../Style/App.bootstrap.style";
import { BS } from "../Style/easyBootstrap";
import { TitreStatic } from "./TitreStatic";

/**
 * La Navigation du site
 *
 * @route Login             > UserLogIn
 * @route Profil            > UserViewPage
 * @route Nouvelle Forme    > PathUpdatePage "DEFAULT_PATH"
 * @route Formes publiques  > PathSelectPage "public"
 * @route Profil            > PathSelectPage "private"
 *
 * @version v2
 */
export function AppNav(props: {
  actif: "profil" | "new" | "public" | "private" | "logIn" | "";
}): JSX.Element {
  const { actif } = props;

  const { user } = useContext(UserContext);

  return (
    <nav className={APP_STYLE.APP.NAV.CADRE}>
      <TitreStatic/>
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
        <ul className={APP_STYLE.APP.NAV.BOX_B}>
          {user.access === 0 && (
            <li
              className={`${APP_STYLE.APP.NAV.ITEM}${
                actif === "logIn" ? " active" : ""
              }`}
            >
              <LinkCustom
                className={`${BS.color("dark")}`}
                to={"/user/login"}
                name="Connection"
              />
            </li>
          )}
          {user.access > 0 && (
            <li
              className={`${APP_STYLE.APP.NAV.ITEM}${
                actif === "profil" ? " active" : ""
              }`}
            >
              <LinkCustom
                className={`${BS.color("dark")}`}
                to={"/user/view"}
                name="Profile"
              />
            </li>
          )}

          {user.access === 0 && (
            <li
              className={`${APP_STYLE.APP.NAV.ITEM}${
                actif === "public" ? " active" : ""
              }`}
            >
              <LinkCustom
                className={`${BS.color("dark")}`}
                to={"/icons/publics"}
                name="Icônes publiques"
              />
            </li>
          )}

          {user.access === 0 && (
            <li
              className={`${APP_STYLE.APP.NAV.ITEM}${
                actif === "public" ? " active" : ""
              }`}
            >
              <LinkCustom
                className={`${BS.color("dark")}`}
                to={"/paths/publics"}
                name="Formes publiques"
              />
            </li>
          )}
          {user.access > 0 && (
            <li className={`nav-item dropdown ${BS.spacing("p", 2)}`}>
              <button
                className={`${BS.spacing("p", 2)} ${BS.button()} ${
                  PERSO.SHAD_ACTIVE
                }${actif === "new" ? " active" : ""} nav-link dropdown-toggle w-100`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Icônes
              </button>
              <ul
                className={`dropdown-menu ${PERSO.SHAD_IN_P} ${BS.spacing(
                  "p",
                  2,
                  "x"
                )} ${BS.background("secondary")}`}
              >
                <li
                  className={`${BS.spacing("both", 2, "y")} ${BS.button()} ${
                    PERSO.SHAD_ACTIVE
                  }${actif === "new" ? " active" : ""} dropdown-item`}
                >
                  <LinkCustom
                    className={`${BS.color("dark")}`}
                    to={"/icons/new"}
                    name="Nouvelle Icône"
                  />
                </li>
                <li
                  className={`${BS.spacing("both", 2, "y")} ${BS.button()} ${
                    PERSO.SHAD_ACTIVE
                  }${actif === "public" ? " active" : ""} dropdown-item`}
                >
                  <LinkCustom
                    className={`${BS.color("dark")}`}
                    to={"/icons/publics"}
                    name="Icônes publiques"
                  />
                </li>
                <li
                  className={`${BS.spacing("both", 2, "y")} ${BS.button()} ${
                    PERSO.SHAD_ACTIVE
                  }${actif === "private" ? " active" : ""} dropdown-item`}
                >
                  <LinkCustom
                    className={`${BS.color("dark")}`}
                    to={"/icons/privates"}
                    name="Mes Icônes"
                  />
                </li>
              </ul>
            </li>
          )}
          {user.access > 0 && (
            <li className={`nav-item dropdown ${BS.spacing("p", 2)}`}>
              <button
                className={`${BS.spacing("p", 2)} ${BS.button()} ${
                  PERSO.SHAD_ACTIVE
                }${actif === "new" ? " active" : ""} nav-link dropdown-toggle w-100`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Formes
              </button>
              <ul
                className={`dropdown-menu ${PERSO.SHAD_IN_P} ${BS.spacing(
                  "p",
                  2,
                  "x"
                )} ${BS.background("secondary")}`}
              >
                <li
                  className={`${BS.spacing("both", 2, "y")} ${BS.button()} ${
                    PERSO.SHAD_ACTIVE
                  }${actif === "new" ? " active" : ""} dropdown-item`}
                >
                  <LinkCustom
                    className={`${BS.color("dark")}`}
                    to={"/paths/new"}
                    name="Nouvelle Forme"
                  />
                </li>
                <li
                  className={`${BS.spacing("both", 2, "y")} ${BS.button()} ${
                    PERSO.SHAD_ACTIVE
                  }${actif === "public" ? " active" : ""} dropdown-item`}
                >
                  <LinkCustom
                    className={`${BS.color("dark")}`}
                    to={"/paths/publics"}
                    name="Formes publiques"
                  />
                </li>
                <li
                  className={`${BS.spacing("both", 2, "y")} ${BS.button()} ${
                    PERSO.SHAD_ACTIVE
                  }${actif === "private" ? " active" : ""} dropdown-item`}
                >
                  <LinkCustom
                    className={`${BS.color("dark")}`}
                    to={"/paths/privates"}
                    name="Mes Formes"
                  />
                </li>
              </ul>
            </li>
          )}
          {user.access > 0 && (
            <li className={`nav-item dropdown ${BS.spacing("p", 2)}`}>
              <button
                className={`${BS.spacing("p", 2)} ${BS.button()} ${
                  PERSO.SHAD_ACTIVE
                }${actif === "new" ? " active" : ""} nav-link dropdown-toggle w-100`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Aspects
              </button>
              <ul
                className={`dropdown-menu ${PERSO.SHAD_IN_P} ${BS.spacing(
                  "p",
                  2,
                  "x"
                )} ${BS.background("secondary")}`}
              >
                <li
                  className={`${BS.spacing("both", 2, "y")} ${BS.button()} ${
                    PERSO.SHAD_ACTIVE
                  }${actif === "new" ? " active" : ""} dropdown-item`}
                >
                  <LinkCustom
                    className={`${BS.color("dark")}`}
                    to={"/aspects/new"}
                    name="Nouvel Aspect"
                  />
                </li>
                <li
                  className={`${BS.spacing("both", 2, "y")} ${BS.button()} ${
                    PERSO.SHAD_ACTIVE
                  }${actif === "private" ? " active" : ""} dropdown-item`}
                >
                  <LinkCustom
                    className={`${BS.color("dark")}`}
                    to={"/aspects/privates"}
                    name="Mes Aspects"
                  />
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
