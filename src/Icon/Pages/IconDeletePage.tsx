import { useContext } from "react";
import { APP_STYLE } from "../../App/Style/App.bootstrap.style";
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
    <div className={APP_STYLE.APP.PAGE + " bg-warning d-flex flex-wrap align-items-center justify-content-center"}>
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-center w-100">
      <button onClick={handleDelete} className="btn-big btn btn-bad m-5 p-3 rounded-5 border border-2 border-warning" >
        OUI
      </button>

      <div>
      <h2>Supprimer ?</h2>

      <svg
        width="min(calc((1.375rem + 1.5vw)*6),15rem)"
        viewBox={path.viewbox}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Path : {path.name}</title>
        <path className="fill-dark" d={path.d} />
      </svg>
      </div>
        <LinkCustom className="btn-big btn m-5 p-3 rounded-5 border border-2 border-info" name={"NON"} to={`/paths/view/${path.id}`} />
        </div>
    </div>
  );
}
