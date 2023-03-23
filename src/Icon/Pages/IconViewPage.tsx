import path from "path";
import { useContext } from "react";
import { AppHeader } from "../../App/Components/AppHeader";
import { AppNav } from "../../App/Components/AppNav";
import { LinkCustom } from "../../Utilities/Components/LinkCustom";
import { DEFAULT_PATH } from "../../Utilities/Constants/Path.defaut";
import { PathPrivateContext } from "../../Utilities/Contexts/PathPrivate.context";
import { PathPublicContext } from "../../Utilities/Contexts/PathPublic.context";
import { TransitionContext } from "../../Utilities/Contexts/Transition.context";
import { UserContext } from "../../Utilities/Contexts/User.context";
import { Requester } from "../../Utilities/Requester/Requester";

/**
 * Page de visualisation d'un icône
 *
 * @version v1
 */
export function IconViewPage(props: { pathId: number }): JSX.Element {

  /** L'identifiant du path en cours de publication */
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

  /** Tentative de publication */
  const handlePublish = async () => {
    const response =  await Requester.path.publish(path.id,user.token)
    if (response.data) {
      setPathPublic([response.data,...pathPublic]) ;
      setPathPrivate(pathPrivate.map(item => {
        if (item.id === response.data.id){
          return response.data
        }
        return item
      })) ;

      setTransition({
        to : "/paths/publics", 
        message : `Publication réussie`
      }) ;
    }
    else {
      setTransition({
        to : `/paths/view/${path.id}`, 
        message : `Publication échouée : ${response.message}`,
        isBad : true
      }) ;
    }
  }

  /* Conditions d'affichage */
  const isOwner = path.user.id === user.id;
  const isPrivate = path.status === "private";

  return (
    <div>
      <AppHeader />
      <AppNav actif={""} />
      <h2>{path.name}</h2>
      <p>{path.viewbox}</p>
      <p>{path.d}</p>

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

      <p>Créée par {path.user.name}</p>
      {isOwner && (
        <div>
          <div>
            <LinkCustom name={"Modifier"} to={`/paths/update/${path.id}`} />
          </div>
          {isPrivate && (
            <button onClick={handlePublish}>
              Publier
            </button>
          )}
          <div>
            <LinkCustom name={"Supprimer"} to={`/paths/delete/${path.id}`} />
          </div>
        </div>
      )}
    </div>
  );
}
