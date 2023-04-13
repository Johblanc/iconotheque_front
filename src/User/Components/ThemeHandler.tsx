import { ChangeEvent, useContext } from "react";
import { APP_STYLE } from "../../App/Style/App.bootstrap.style";
import { ThemeContext } from "../../Utilities/Contexts/Theme.context";
import { hexToRgb, rgbToHex } from "../Modules/HexColo";

/**
 * Permet le reglage du ThemeContext
 * 
 * @version v2
 */
export function ThemeHandler() {
  const { theme, setTheme } = useContext(ThemeContext);


  /**
   * Réglage de la couleur du theme
   * 
   * @param event Changement de la couleur
   */
  const handleColors = (event: ChangeEvent<HTMLInputElement>) => {
    const newTheme = { ...theme };
    [newTheme.red, newTheme.green, newTheme.blue] = hexToRgb(
      event.target.value
    );
    setTheme(newTheme);
  };

  /**
   * Réglage de la transparence du theme
   * 
   * @param event Changement de transparence
   */
  const handleTransparency = (event: ChangeEvent<HTMLInputElement>) => {
    const newTheme = { ...theme };
    newTheme.transparency = Number(event.target.value);
    setTheme(newTheme);
  };

  return (
    <div className={APP_STYLE.APP.ENTRY.CADRE}>
      <div className={APP_STYLE.APP.ENTRY.BOX}>
        <label className={APP_STYLE.APP.ENTRY.LABEL}>Couleur</label>
        <input
          style={{height : "3em"}}
          className={APP_STYLE.APP.ENTRY.INPUT}
          type="color"
          onChange={handleColors}
          defaultValue={rgbToHex(theme.red, theme.green, theme.blue)}
        ></input>
        <label className={APP_STYLE.APP.ENTRY.LABEL}>Ombrage</label>
        <input
          className={APP_STYLE.APP.ENTRY.INPUT}
          type="range"
          min="0"
          max="1"
          step="0.1"
          defaultValue={theme.transparency}
          onChange={handleTransparency}
        ></input>
      </div>
    </div>
  );
}
