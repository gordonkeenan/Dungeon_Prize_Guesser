import "bootstrap/dist/css/bootstrap.min.css";
import { isEqual } from "lodash";
import { useState } from "react";
import { dungeonBosses } from "./dungeons";

import {
  crystal,
  greenPendant,
  noPrize,
  redBluePendant,
  redCrystal
} from "./prize";

const newGameGuesses = {
  eastern: noPrize,
  desert: noPrize,
  hera: noPrize,
  pod: noPrize,
  swamp: noPrize,
  woods: noPrize,
  thievesTown: noPrize,
  ice: noPrize,
  mire: noPrize,
  turtleRock: noPrize
};


export const getWrongGuesses = (dungeons, dungeonsGuesses) => {
  // const guesses = Object.keys(dungeonsGuesses).filter((key) => {
  //   return dungeonsGuesses[key].prizeName !== dungeons[key].prizeName;
  // });
  const guesses = Object.entries(dungeons).reduce((guesses, [key, val]) => {
    if (dungeonsGuesses[key].prizeName !== dungeons[key].prizeName) {
      guesses[key] = val;
    }
    return guesses
  }, {})
  return guesses;
};

export const DungeonGuesser = ({
  dungeons,
  enabled,
  setShowResult,
  setResult
}) => {
  const [dungeonsGuesses, setDungeonsGuesses] = useState(newGameGuesses);

  const [answer, setAnswer] = useState(false);

  const togglePrize = (e) => {
    if (enabled) {
      const value = e.target.value;
      const newState = { ...dungeonsGuesses };
      newState[value] = getNextPrize(dungeonsGuesses[value]);
      setDungeonsGuesses({ ...newState });
    }
  };

  const checkAnswer = () => {
   // const result = isEqual(dungeons, dungeonsGuesses);
    const guesses = getWrongGuesses(dungeons, dungeonsGuesses)

    setResult({
      winner: Object.keys(guesses).lenght === 0,
      guesses: guesses
    });
    setDungeonsGuesses(newGameGuesses);
    setShowResult(true);
  };

  const getNextPrize = (prize) => {
    switch (prize.prizeName) {
      case "none":
        return greenPendant;
      case "greenPendant":
        return redBluePendant;
      case "redBluePendant":
        return crystal;
      case "crystal":
        return redCrystal;
      case "redCrystal":
        return noPrize;
      default:
        return noPrize;
    }
  };

  return (
    <div className="container">
      <div className="row boss-row">
        {dungeonBosses.map((boss) => {
          const prizeIcon = dungeonsGuesses[boss.id]["guessIcon"];
          return (
            <div className="col boss parent col-centered">
              <img
                id={boss.id}
                className="boss boss-icon"
                src={`/${boss.bossIcon}`}
                alt={boss.name}
              />
              <input
                type="image"
                id={boss.id}
                className="boss prize"
                value={boss.id}
                src={`/${prizeIcon}`}
                alt={boss.id}
                onClick={(e) => togglePrize(e)}
              />
            </div>
          );
        })}
        <div>
          <button
            type="button"
            class="btn btn-secondary"
            onClick={() => checkAnswer()}
          >
            Check Answer
          </button>
        </div>
      </div>
    </div>
  );
};
