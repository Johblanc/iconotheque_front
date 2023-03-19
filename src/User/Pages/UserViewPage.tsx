import { AppHeader } from "../../App/Components/AppHeader";
import { AppNav } from "../../App/Components/AppNav";


/**
 * Page de Consultation de profil
 * 
 * @version v1
 */
export function UserViewPage() : JSX.Element
{
  return (
  <div>
    <AppHeader/>
    <AppNav actif={"profil"}/>
    <h2>Profile</h2>
    <div>
    </div>
  </div>
)
}