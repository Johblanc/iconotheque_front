import { AppHeader } from "../../App/Components/AppHeader";
import { Entry } from "../../Utilities/Components/Entry";


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
      <div>
        <Entry/>
        <Entry/>
        <button>Log In</button>
      </div>
      <div>
        <Entry/>
        <Entry/>
        <Entry/>
        <Entry/>
        <button>Sign In</button>
      </div>
      </div>
    </div>
  )
}