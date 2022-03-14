import { dungeonBosses } from "./dungeons";

import background from "./Dark_World_Map.png";
import { zeroPad } from "./Utils";

export const DarkWorld = ({ dungeons, seconds, minutes }) => {
  const style = {
    backgroundImage: `url(${background})`
  };
  return (
    <div className="world-background Modal" style={style}>
      <span className="timer">{zeroPad(minutes, 2)}:{zeroPad(seconds, 2)}</span>
      {dungeonBosses.map((boss, index) => {
        const prizeIcon = dungeons[boss.id]["prizeIcon"];
        return (
          index > 2 && (
            <img
              id={boss.id}
              className={`${boss.id} icon`}
              src={`/${prizeIcon}`}
              alt={boss.name}
            />
          )
        );
      })}
    </div>
  );
};
