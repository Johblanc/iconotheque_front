import { useContext } from "react";
import { APP_STYLE } from "../../App/Style/App.bootstrap.style";
import { LinkCustom } from "../../Utilities/Components/LinkCustom";
import { TransitionContext } from "../../Utilities/Contexts/Transition.context";
import { UserContext } from "../../Utilities/Contexts/User.context";
import { Requester } from "../../Utilities/Requester/Requester";

/**
 * Page de suppression d'un icône
 *
 * @version v1
 */
export function UserPromotePage(props: { userId: number }): JSX.Element {
  /** L'identifiant du path en cours de suppression */
  const { userId } = props;
  const { user } = useContext(UserContext);

  const { setTransition } = useContext(TransitionContext);

  /** Tentative de suppression */
  const handlePromote = async () => {
    const response = await Requester.user.promote(userId, user.token);
    if (response.data) {
      setTransition({
        to: "/user/admin",
        message: `Promotion réussie`,
      });
    } else {
      setTransition({
        to: `/user/admin`,
        message: `Promotion échouée : ${response.message}`,
        isBad: true,
      });
    }
  };

  return (
    <div className={APP_STYLE.TRANSITION.MESSAGE.PAGE}>
      <div className={APP_STYLE.TRANSITION.MESSAGE.CADRE}>
        <button
          onClick={handlePromote}
          className={APP_STYLE.TRANSITION.MESSAGE.BTN_BAD}
        >
          OUI
        </button>

        <div>
          <h2>Promouvoir ?</h2>
        </div>
        <LinkCustom
          className={APP_STYLE.TRANSITION.MESSAGE.BTN_GOOD}
          name={"NON"}
          to={`/user/admin`}
        />
      </div>
    </div>
  );
}
