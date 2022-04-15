import "bootstrap/dist/css/bootstrap.min.css";
import { isEqual } from "lodash";
import { useState } from "react";
import { dungeonBosses } from "./dungeons";

import {
  crystal,
  greenPendant,
  noPrize,
  redBluePendant,
  redCrystal,
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
  turtleRock: noPrize,
};

export const DungeonGuesser = ({
  dungeons,
  enabled,
  setShowResult,
  setResult,
}) => {
  const [dungeonsGuesses, setDungeonsGuesses] = useState(newGameGuesses);

  const [answer, setAnswer] = useState(false);

  const [defaultToCrystals, setDefaultToCrystals] = useState(false);

  const togglePrize = (e) => {
    e.preventDefault();
    if (enabled) {
      const value = e.target.value;
      const newState = { ...dungeonsGuesses };
      newState[value] =
        e.type === "contextmenu"
          ? getPreviousPrize(dungeonsGuesses[value])
          : getNextPrize(dungeonsGuesses[value]);
      setDungeonsGuesses({ ...newState });
    }
  };

  const getWrongGuesses = (dungeons, dungeonsGuesses) => {
    const guesses = Object.entries(dungeons).reduce((guesses, [key, val]) => {
      const noGuessCrystal =
        dungeonsGuesses[key].prizeName === "none" &&
        dungeons[key].prizeName === "crystal";
      if (
        !(defaultToCrystals && noGuessCrystal) &&
        dungeonsGuesses[key].prizeName !== dungeons[key].prizeName
      ) {
        guesses[key] = val;
      }
      return guesses;
    }, {});
    return guesses;
  };

  const checkAnswer = () => {
    const guesses = getWrongGuesses(dungeons, dungeonsGuesses);
    const winner = Object.keys(guesses).length === 0;
    setResult({
      winner: winner,
      guesses: guesses,
    });
    setDungeonsGuesses(newGameGuesses);
    setShowResult(winner);
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

  const getPreviousPrize = (prize) => {
    switch (prize.prizeName) {
      case "none":
        return redCrystal;
      case "redCrystal":
        return crystal;
      case "crystal":
        return redBluePendant;
      case "redBluePendant":
        return greenPendant;
      case "greenPendant":
        return noPrize;
      default:
        return noPrize;
    }
  };

  return (
    <div className="container">
      <div className="row boss-row gx-0">
        {dungeonBosses.map((boss) => {
          const prizeIcon = dungeonsGuesses[boss.id]["guessIcon"];
          return (
            <div className="col boss parent col-centered gx-0">
              <img
                id={boss.id}
                className="boss parent"
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
                onContextMenu={(e) => togglePrize(e)}
              />
            </div>
          );
        })}
        <div class="container">
          <div class="row justify-content-md-center">
            <div class="col-md-auto">
              <button
                type="button"
                class="btn btn-secondary"
                onClick={() => checkAnswer()}
              >
                Check Answer
              </button>
            </div>

            {/* <div class="col-md-auto form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                onClick={() => {
                  setDefaultToCrystals(!defaultToCrystals);
                }}
                checked={defaultToCrystals}
              />
              <label class="form-check-label" for="flexSwitchCheckDefault">
                Default ? to Crystal
              </label>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
