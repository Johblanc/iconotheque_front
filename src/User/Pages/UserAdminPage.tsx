import { useContext, useEffect, useState } from "react";
import { AppHeader } from "../../App/Components/AppHeader";
import { AppNav } from "../../App/Components/AppNav";
import { APP_STYLE } from "../../App/Style/App.bootstrap.style";
import { LinkCustom } from "../../Utilities/Components/LinkCustom";
import { UserContext } from "../../Utilities/Contexts/User.context";
import { Requester } from "../../Utilities/Requester/Requester";
import { TUser } from "../../Utilities/Types/User.type";

/**
 * Page de Log In et du Register
 *
 * @version v1
 */
export function UserAdminPage(): JSX.Element {

  const {user} = useContext(UserContext) ;
  const [users, setUsers] = useState<TUser[]>([])

  useEffect(()=>{

    const fetchUsers = async () =>{
      const response = await Requester.user.allUser(user.token) ;
      setUsers(response)
    }

    fetchUsers()
  },[user])

  return (
    <div className={APP_STYLE.APP.PAGE}>
      <AppHeader />
      <AppNav actif={""} />
      <div className={APP_STYLE.USER.LOGIN.CADRE_A}>
        <div className={APP_STYLE.USER.LOGIN.CADRE_B}>
          <div>
        <h2 className=" m-2">Promotion en Administrateur</h2>
        <div >
          {users.filter(item => item.access === 1).map((item,i)=> (
            <div className="d-flex m-3" key={i}>
              <LinkCustom className="btn" name={"↑↑"} to={`/user/promote/${item.id}`}/>
              <p style={{width:"15em"}} className="m-1 p-1" >{item.name}</p>
            </div>
          ))}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
