import { useContext } from "react";
import { LinkCustom } from "../../Utilities/Components/LinkCustom";
import { DEFAULT_PATH } from "../../Utilities/Constants/Path.defaut";
import { PathPrivateContext } from "../../Utilities/Contexts/PathPrivate.context";
import { PathPublicContext } from "../../Utilities/Contexts/PathPublic.context";
import { TransitionContext } from "../../Utilities/Contexts/Transition.context";
import { UserContext } from "../../Utilities/Contexts/User.context";
import { Requester } from "../../Utilities/Requester/Requester";

/**
 * Page de suppression d'un icône
 *
 * @version v1
 */
export function IconDeletePage(props: { pathId: number }): JSX.Element {

  /** L'identifiant du path en cours de suppression */
  const { pathId } = props;

  /** Récupération des contexts */
  const { user } = useContext(UserContext);

  const { pathPublic, setPathPublic } = useContext(PathPublicContext);
  const { pathPrivate, setPathPrivate } = useContext(PathPrivateContext);

  const { setTransition } = useContext(TransitionContext) 

  /** Récupération du path */
  const path = [...pathPublic, ...pathPrivate].filter(
    (item) => item.id === pathId
  )[0] || DEFAULT_PATH;
  
  /** Tentative de suppression */
  const handleDelete = async () => {
    const response =  await Requester.path.delete(path.id,user.token)
    if (response.data) {
      setTimeout(()=> setPathPublic(pathPublic.filter( item => item.id !== response.data.id)) , 800) ;
      setTimeout(()=> setPathPrivate(pathPrivate.filter( item => item.id !== response.data.id)) , 800) ;

      setTransition({
        to : "/paths/publics", 
        message : `Suppression réussie`
      }) ;
    }
    else {
      setTransition({
        to : `/paths/publics`, 
        message : `Suppression échouée : ${response.message}`,
        isBad : true
      }) ;
    }
  }

  return (
    <div>
      <h2>Supprimer ?</h2>

      <svg
        className=""
        width="min(calc((1.375rem + 1.5vw)*6),15rem)"
        viewBox={path.viewbox}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Path : {path.name}</title>
        <path d={path.d} />
      </svg>
      <div>
      <button onClick={handleDelete}>
        OUI
      </button>
      </div>
      <div>
        <LinkCustom name={"NON"} to={`/paths/view/${path.id}`} />
      </div>
    </div>
  );
}
