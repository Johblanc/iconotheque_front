import { useContext } from "react";
import { AppHeader } from "../../App/Components/AppHeader";
import { AspectContext } from "../../Utilities/Contexts/Aspect.context";
import { TransitionContext } from "../../Utilities/Contexts/Transition.context";

export function AspectsSelectPage(props: { actif: "private" | "public" }) {
  const { aspects } = useContext(AspectContext);
  const { setTransition } = useContext(TransitionContext);

  return (
    <>
      <AppHeader actif={"aspectsPrivate"} />
      <div className="d-flex flex-wrap">
        {aspects.map((item, i) => {
          return (
            <div
              key={i}
              onClick={() =>
                setTransition({
                  to: `/aspects/view/${item.id}`,
                })
              }
              className="bg-primary m-2"
            >
              <p>{item.name}</p>
              <svg
                width="min(calc((1.375rem + 1.5vw)*6),10em,40vw)"
                height="min(calc((1.375rem + 1.5vw)*6),10em,40vw)"
                viewBox={"0 0 100 100"}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="20"
                  style={{
                    fill: item.fill_color,
                    fillOpacity: item.fill_opacity,
                    stroke: item.stroke_color,
                    strokeOpacity: item.stroke_opacity,
                    strokeWidth: item.stroke_width,
                  }}
                />
              </svg>
            </div>
          );
        })}
      </div>
    </>
  );
}
