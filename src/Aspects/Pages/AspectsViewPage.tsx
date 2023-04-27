import { useContext } from "react";
import { AppHeader } from "../../App/Components/AppHeader";
import { DEFAULT_ASPECT } from "../../Utilities/Constants/Aspect.defaut";
import { AspectContext } from "../../Utilities/Contexts/Aspect.context";
import { LinkCustom } from "../../Utilities/Components/LinkCustom";
import { APP_STYLE } from "../../App/Style/App.bootstrap.style";

export function AspectsViewPage(props: { aspectId: number }) {
  const { aspectId } = props;
  const { aspects } = useContext(AspectContext);

  const aspect = aspects.filter((item) => item.id === aspectId).length > 0
      ? aspects.filter((item) => item.id === aspectId)[0]
      : DEFAULT_ASPECT

  
  return (
    <>
      <AppHeader actif={""} />
      <h2>{aspect.name}</h2>
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
          style={aspect.style}
        />
      </svg>
      <h3>Css</h3>
      <pre className={APP_STYLE.APP.ALT_FONT}>{aspect.asCss}</pre>
      <h3>Style pour React</h3>
      <pre className={APP_STYLE.APP.ALT_FONT}>{aspect.asReactStyleString}</pre>
      <LinkCustom name={"Modifier"} to={`/aspects/update/${aspect.id}`} className={APP_STYLE.APP.BTN_GOOD}/>
      <LinkCustom name={"Supprimer"} to={`/aspects/delete/${aspect.id}`} className={APP_STYLE.APP.BTN_BAD}/>
    </>
  );
}
