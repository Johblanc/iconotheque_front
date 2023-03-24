import { useContext, useEffect, useState } from "react";
import { PAGES_CONFIG } from "../../App/Routes/router";
import { useNavigate } from "react-router-dom";
import { TransitionContext } from "../../Utilities/Contexts/Transition.context";

/**
 * Page de transition avec un message
 *
 * @version v1
 */
export function TransitionMessage(props: {
  children: JSX.Element | JSX.Element[] | null;
}): JSX.Element {
  const { children } = props;

  const { transition, setTransition } = useContext(TransitionContext);
  const { to, message, isBad, inTransition } = transition;
  const delay = transition.delay !== undefined ? transition.delay : 800;

  const navigate = useNavigate();

  const [nextOpacity, setNextOpacity] = useState(0);
  const [transitionOpacity, setTransitionOpacity] = useState(0);
  const [nextPage, setNextPage] = useState(<></>);

  useEffect(() => {
    if (to !== "" && inTransition) {
      setNextOpacity(0);
      setTransitionOpacity(0);

      let altElem: JSX.Element | undefined = undefined;
      const nextRoute = PAGES_CONFIG.filter((item) => {
        const [path, ...params] = item.path.split("/:");
        if (params.length > 0) {
          const splitedTo = to.split("/");

          const newTo = splitedTo
            .filter((_, i, arr) => i < arr.length - params.length)
            .join("/");
          if (path === newTo && item.loader) {
            altElem = item.loader({
              params: { id: splitedTo[splitedTo.length - 1] },
            }) as JSX.Element;
          }
          return path === newTo;
        }

        return path === to;
      })[0];

      if (nextRoute) {
        if (altElem) {
          setNextPage(altElem);
        } else {
          setNextPage(nextRoute.element);
        }
        setTimeout(() => setTransitionOpacity(1), 1);
        setTimeout(() => setNextOpacity(1), delay * 2);
        setTimeout(() => setTransitionOpacity(0), delay * 2);
        setTimeout(() => {
          navigate(to);
          setTransition({ to: "" });
          setNextOpacity(0);
        }, delay * 3);
      } else {
        setNextPage(<></>);
      }
      const newTransition = { ...transition };
      newTransition.to = "";
      setTransition(newTransition);
    }
  }, [transition,delay,inTransition,navigate,setTransition,to]);

  return (
    <div>
      <div
        className="transition"
        style={{
          opacity: nextOpacity,
          transition: `opacity ${delay / 1000}s`,
        }}
      >
        {nextPage}
      </div>
      <div
        className="transition"
        style={{
          opacity: 1 - nextOpacity - transitionOpacity,
          transition: `opacity ${delay / 1000}s`,
        }}
      >
        {children}
      </div>
      <div
        className={`transition ${isBad ? "bg-warning" : "bg-success"} d-flex flex-wrap align-items-center justify-content-evenly`}
        style={{
          opacity: transitionOpacity,
          transition: `opacity ${delay / 1000}s`,
        }}
      >
        <h2>{message}</h2>
      </div>
    </div>
  );
}
