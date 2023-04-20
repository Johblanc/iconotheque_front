import { APP_STYLE } from "../../App/Style/App.bootstrap.style";
import { ExtendVB } from "../class/ExtendVB";


/**
 * Affichage des backgroun de la viewbox et de la viewbox extend ainsi que les axe origine x et y.
 * 
 * @param props.viewbox l'extend viewbox
 */
export function PathGraphicBackGround(props : { viewbox : ExtendVB }){
  const { viewbox : vb } = props ;


  return (
    <g>
        {/* Background Extend*/}
        <rect
          x={vb.exX}
          y={vb.exY}
          width={vb.exWidth}
          height={vb.exHeight}
          className={APP_STYLE.PATH.GRAPH.BG.EXTENDVIEWBOX}
        />
        {/* Background ViewBox*/}
        <rect
          x={vb.x}
          y={vb.y}
          width={vb.width}
          height={vb.height}
          className={APP_STYLE.PATH.GRAPH.BG.VIEWBOX}
        />
        {/* Visualisation l'axe x*/}
        <path
          className={APP_STYLE.PATH.GRAPH.BG.AXE}
          style={{
            strokeWidth: vb.sizeRef / 200,
          }}
          d={`m ${vb.exX} 0 h ${vb.exWidth}`}
        />
        {/* Visualisation l'axe y*/}
        <path
          className={APP_STYLE.PATH.GRAPH.BG.AXE}
          style={{
            strokeWidth: vb.sizeRef / 200,
          }}
          d={`m 0 ${vb.exY} v ${vb.exHeight}`}
        />
    </g>
  )
}