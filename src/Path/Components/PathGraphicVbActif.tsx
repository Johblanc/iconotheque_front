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
  actif : "width" | "height" | "y" | "x"
}){

  const { viewbox : vb , actif} = props ;


  return (
    <g>
      {/** Viualisation de la largeur de la viewbox */}
      {actif === "width" && (
        <path
          style={{
            stroke: "#FF8888",
            strokeWidth: vb.sizeRef / 100,
          }}
          d={`m ${vb.x} ${vb.y} h ${vb.width}`}
        />
      )}
      {/** Viualisation de la hauteur de la viewbox */}
      {actif === "height" && (
        <path
          style={{
            stroke: "#FF8888",
            strokeWidth: vb.sizeRef / 100,
          }}
          d={`m ${vb.x} ${vb.y} v ${vb.height}`}
        />
      )}
      {/** Viualisation de la coordonné y de la viewbox */}
      {actif === "y" && (
        <path
          style={{
            stroke: "#FF8888",
            strokeWidth: vb.sizeRef / 100,
          }}
          d={`m 0 0 v ${vb.y}`}
        />
      )}
      {/** Viualisation de la coordonné x de la viewbox */}
      {actif === "x" && (
        <path
          style={{
            stroke: "#FF8888",
            strokeWidth: vb.sizeRef / 100,
          }}
          d={`m 0 0 h ${vb.x}`}
        />
      )}
    </g>
  )
}