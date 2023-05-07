import { ChangeEvent, useContext } from "react";
import { APP_STYLE } from "../../App/Style/App.bootstrap.style";
import { ThemeContext } from "../../Utilities/Contexts/Theme.context";
import { hexToRgb, rgbToHex } from "../Modules/HexColo";
import { EntryColor } from "../../Utilities/Components/EntryColor";
import { EntryRange } from "../../Utilities/Components/EntryRange";

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
  const handleColors = (value: string) => {
    const newTheme = { ...theme };
    [newTheme.red, newTheme.green, newTheme.blue] = hexToRgb(value);
    setTheme(newTheme);
  };

  /**
   * Réglage de la transparence du theme
   *
   * @param event Changement de transparence
   */
  const handleTransparency = (value: number) => {
    const newTheme = { ...theme };
    newTheme.transparency = value;
    setTheme(newTheme);
  };

  return (
    <>
      <EntryColor
        accecibilityId={"theme-update-color"}
        name="Couleur"
        defaultValue={rgbToHex(theme.red, theme.green, theme.blue)}
        setValue={(value) => handleColors(value!)}
      />
      <EntryRange
        accecibilityId={"theme-update-opacity"}
        name="Ombrage"
        min={0}
        max={1}
        step={0.1}
        value={theme.transparency}
        setValue={(value) => handleTransparency(value!)}
      />
    </>
  );
}
