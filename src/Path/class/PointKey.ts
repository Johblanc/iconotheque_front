
import { TPointKey } from '../Types/TPointKey';

/**
 * Objet contenant les listes de propriétés des format de point
 *
 * @version v2
 */
export class PointKeys {
  
    static get m () : TPointKey[] {
      return ['dx', 'dy'];
    }
    static get l () : TPointKey[] {
      return ['dx', 'dy'];
    }
    static get h () : TPointKey[] {
      return ['dx'];
    }
    static get v () : TPointKey[] {
      return ['dy'];
    }
    static get c () : TPointKey[] {
      return ['dx1', 'dy1', 'dx2', 'dy2', 'dx', 'dy'];
    }
    static get s () : TPointKey[] {
      return ['dx2', 'dy2', 'dx', 'dy'];
    }
    static get q () : TPointKey[] {
      return ['dx1', 'dy1', 'dx', 'dy'];
    }
    static get t () : TPointKey[] {
      return ['dx', 'dy'];
    }
    static get a () : TPointKey[] {
      return ['rx', 'ry', 'angle', 'largeArcFlag', 'sweepFlag', 'dx', 'dy'];
    }
    static get z () : TPointKey[] {
      return [];
    }

    static get M () : TPointKey[] {
      return ['x', 'y'];
    }
    static get L () : TPointKey[] {
      return ['x', 'y'];
    }
    static get H () : TPointKey[] {
      return ['x'];
    }
    static get V () : TPointKey[] {
      return ['y'];
    }
    static get C () : TPointKey[] {
      return ['x1', 'y1', 'x2', 'y2', 'x', 'y'];
    }
    static get S () : TPointKey[] {
      return ['x2', 'y2', 'x', 'y'];
    }
    static get Q () : TPointKey[] {
      return ['x1', 'y1', 'x', 'y'];
    }
    static get T () : TPointKey[] {
      return ['x', 'y'];
    }
    static get A () : TPointKey[] {
      return ['rx', 'ry', 'angle', 'largeArcFlag', 'sweepFlag', 'x', 'y'];
    }
    static get Z () : TPointKey[] {
      return [];
    }

}
