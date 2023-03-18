import { AppHeader } from "../../App/Components/AppHeader";
import { LogInBox } from "../Components/LogInBox";
import { SignInBox } from "../Components/SignInBox";



/**
 * Page de Log In et du Register
 * 
 * @version v1
 */
export function UserLogInPage() : JSX.Element
{
  return (
    <div>
      <AppHeader/>
      <div>
        <LogInBox/>
        <SignInBox/>
      </div>
    </div>
  )
}