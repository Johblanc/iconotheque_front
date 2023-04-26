
import { AppHeader } from "../../App/Components/AppHeader";
import { APP_STYLE } from "../../App/Style/App.bootstrap.style";
import { LogInBox } from "../Components/LogInBox";
import { SignInBox } from "../Components/SignInBox";

/**
 * Page de Log In et du Register
 *
 * @version v1
 */
export function UserLogInPage(): JSX.Element {

  return (
    <div className={APP_STYLE.APP.PAGE}>
      <AppHeader  actif={"logIn"}/>
      <div className={APP_STYLE.USER.LOGIN.CADRE_A}>
        <div className={APP_STYLE.USER.LOGIN.CADRE_B}>
          <LogInBox />
          <SignInBox />
        </div>
      </div>
    </div>
  );
}
