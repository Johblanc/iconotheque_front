import { useContext } from "react";
import { AppHeader } from "../../App/Components/AppHeader";
import { UserContext } from "../../Utilities/Contexts/User.context";
import { LogInBox } from "../Components/LogInBox";
import { SignInBox } from "../Components/SignInBox";



/**
 * Page de Log In et du Register
 * 
 * @version v1
 */
export function UserLogInPage() : JSX.Element
{
  const {user} = useContext(UserContext)

  return (
    <>
      <AppHeader/>
      <div>
        <LogInBox/>
        <SignInBox/>
      </div>
    </>
  )
}