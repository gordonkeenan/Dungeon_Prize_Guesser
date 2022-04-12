import background from "./Hyrule_Light_World_map.png";

export const LigthtWorld = ({
  dungeons,
  milliseconds,
}) => {
  const style = {
    backgroundImage: `url(${background})`,
  };

  return (
    <div className="world-background Modal" style={style}>
      <span className="timer">{(milliseconds / 1000).toFixed(3)}</span>
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
