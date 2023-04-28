import { useContext } from "react";
import { Icon } from "../Classes/Icon.class";
import { TransitionContext } from "../../Utilities/Contexts/Transition.context";
import { APP_STYLE } from "../../App/Style/App.bootstrap.style";

/**
 * Permet de visualiser une icône
 * 
 * @param props.icon L'icône à affichée
 * 
 * @version v2
 */
export function IconItem(props: { icon: Icon }) {
  const { icon } = props;
  const { setTransition } = useContext(TransitionContext);

  const figures = icon.figures.map((figure, i) => (
    <path key={i} style={figure.aspect.style} d={figure.path.d} />
  ));

  return (
    <button
      className={`${APP_STYLE.PATH.SELECT.ITEM} ${
        icon.status === "public" ? "bg-primary" : "bg-warning icon-item-bad"
      }`}
    >
      <svg
        onClick={() => setTransition({ to: `/icons/view/${icon.id}` })}
        width="min(calc((1.375rem + 1.5vw)*1.5),3.75rem)"
        height="min(calc((1.375rem + 1.5vw)*1.5),3.75rem)"
        viewBox={props.icon.viewbox}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        {figures}
      </svg>
    </button>
  );
}
