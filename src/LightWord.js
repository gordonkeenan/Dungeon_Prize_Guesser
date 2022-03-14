import background from "./Hyrule_Light_World_map.png";
import { zeroPad } from "./Utils";

export const LigthtWorld = ({ dungeons, seconds, minutes }) => {
  const style = {
    backgroundImage: `url(${background})`
  };

  return (
    <div className="world-background Modal" style={style}>
            <span className="countdown">{zeroPad(minutes, 2)}:{zeroPad(seconds, 2)}</span>
      <img
        id="hera"
        className="hera icon"
        src={`/${dungeons.hera.prizeIcon}`}
        alt="Hera"
      />
      <img
        id="eastern"
        className="eastern icon"
        src={`/${dungeons.eastern.prizeIcon}`}
        alt="Eastern"
      />
      <img
        id="desert"
        className="desert icon"
        src={`/${dungeons.desert.prizeIcon}`}
        alt="Desert"
      />
    </div>
  );
};
