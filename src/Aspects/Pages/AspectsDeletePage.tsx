import { useContext } from "react";
import { APP_STYLE } from "../../App/Style/App.bootstrap.style";
import { LinkCustom } from "../../Utilities/Components/LinkCustom";
import { UserContext } from "../../Utilities/Contexts/User.context";
import { AspectContext } from "../../Utilities/Contexts/Aspect.context";
import { TransitionContext } from "../../Utilities/Contexts/Transition.context";
import { DEFAULT_ASPECT } from "../../Utilities/Constants/Aspect.defaut";
import { Requester } from "../../Utilities/Requester/Requester";


export function AspectsDeletePage(props : {aspectId : number}){
  /** L'identifiant du path en cours de suppression */
  const { aspectId } = props;

  /** Récupération des contexts */
  const { user } = useContext(UserContext);

  const { aspects, setAspects } = useContext(AspectContext);

  const { setTransition } = useContext(TransitionContext);

  /** Récupération de l'aspect */
  const aspect = aspects.filter((item) => item.id === aspectId)[0] || DEFAULT_ASPECT ;

  /** Tentative de suppression */
  const handleDelete = async () => {
    const response = await Requester.aspect.delete(aspect.id, user.token);
    if (response.data) {
      setTimeout(
        () =>
        setAspects(
          aspects.filter((item) => item.id !== aspect.id)
          ),
        800
      );

      setTransition({
        to: "/aspects/privates",
        message: `Suppression réussie`,
      });
    } else {
      setTransition({
        to: "/aspects/privates",
        message: `Suppression échouée : ${response.message}`,
        isBad: true,
      });
    }
  };

  return (
    <div className={APP_STYLE.TRANSITION.MESSAGE.PAGE}>
      <div className={APP_STYLE.TRANSITION.MESSAGE.CADRE}>
        <button
          onClick={handleDelete}
          className={APP_STYLE.TRANSITION.MESSAGE.BTN_BAD}
        >
          OUI
        </button>

        <div>
          <h2>Supprimer ?</h2>
          {/* Dans React */}
          <svg
            width="min(calc((1.375rem + 1.5vw)*6),15rem)"
            height="min(calc((1.375rem + 1.5vw)*6),15rem)"
            viewBox="0 0 100 100"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Style : {aspect.name}</title>
                <circle
                  cx="50"
                  cy="50"
                  r="20"
                  style={aspect.style}
                />
          </svg>
        </div>
        <LinkCustom
          className={APP_STYLE.TRANSITION.MESSAGE.BTN_GOOD}
          name={"NON"}
          to={`/aspects/view/${aspect.id}`}
        />
      </div>
    </div>
  );
}