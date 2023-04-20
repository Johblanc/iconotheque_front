import { APP_STYLE } from "../../App/Style/App.bootstrap.style";
import { ExtendVB } from "../class/ExtendVB";


/**
 * Visualisation de la partie active de la viewBox
 * 
 * @param props.viewbox l'extend viewbox
 * @param props.actif la partie à visualiser
 * 
 * @version v2
 */
export function PathGraphicVbActif(props : { 
  viewbox : ExtendVB ,
  actif : string
}){

  const { viewbox : vb , actif} = props ;


  return (
    <g>
      {( actif === "width" || actif === "height" || actif === "y" || actif === "x" ) && 
        <g>
          {/** Viualisation de la largeur de la viewbox */}
          <path
            className={actif === "width" ? APP_STYLE.PATH.GRAPH.VBACTIF.ACTIF : APP_STYLE.PATH.GRAPH.VBACTIF.VISIBLE}
            style={{
              strokeWidth: vb.sizeRef / (actif === "width" ? 100 : 300),
            }}
            d={`m ${vb.x} ${vb.y} h ${vb.width}`}
          />
          {/** Viualisation de la hauteur de la viewbox */}
          <path
            className={actif === "height" ? APP_STYLE.PATH.GRAPH.VBACTIF.ACTIF : APP_STYLE.PATH.GRAPH.VBACTIF.VISIBLE}
            style={{
              strokeWidth: vb.sizeRef / (actif === "height" ? 100 : 300),
            }}
            d={`m ${vb.x} ${vb.y} v ${vb.height}`}
          />
          {/** Viualisation de la coordonné y de la viewbox */}
          <path
            className={actif === "y" ? APP_STYLE.PATH.GRAPH.VBACTIF.ACTIF : APP_STYLE.PATH.GRAPH.VBACTIF.VISIBLE}
            style={{
              strokeWidth: vb.sizeRef / (actif === "y" ? 100 : 300),
            }}
            d={`m 0 0 v ${vb.y}`}
          />
          {/** Viualisation de la coordonné x de la viewbox */}
          <path
            className={actif === "x" ? APP_STYLE.PATH.GRAPH.VBACTIF.ACTIF : APP_STYLE.PATH.GRAPH.VBACTIF.VISIBLE}
            style={{
              strokeWidth: vb.sizeRef / (actif === "x" ? 100 : 300),
            }}
            d={`m 0 0 h ${vb.x}`}
          />
        </g>
      }
    </g>
  )
}