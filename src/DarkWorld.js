import { dungeonBosses } from "./dungeons";

import background from "./Dark_World_Map.png";

export const DarkWorld = ({ dungeons }) => {
  const style = {
    backgroundImage: `url(${background})`
  };
  return (
    <div className="world-background Modal" style={style}>
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
