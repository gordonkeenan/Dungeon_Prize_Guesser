import { useState } from "react";
import Modal from "react-modal";
import { useStopwatch } from "react-timer-hook";
import { DarkWorld } from "./DarkWorld";
import { DungeonGuesser } from "./DungeonGuesser";
import { dungeonBosses } from "./dungeons";
import useTimer from "./hooks/useTimer";
import { LigthtWorld } from "./LightWord";
import { beginner, ModeSelector, practice } from "./ModeSelector";
import { randomizePrizes } from "./prize";
import "./styles.css";
import { useLocalStorage } from "./useLocalStorage";
import { getRandomInt, zeroPad } from "./Utils";

let dungeons = randomizePrizes();

export default function App() {
  const [showLightWorld, setShowLightWorld] = useState(false);
  const [showDarkWorld, setShowDarkWorld] = useState(false);
  const [lightWorldDisabled, setLightWorldDisabled] = useState(false);
  const [darkWorldDisabled, setDarkWorldDisabled] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [result, setResult] = useState({
    winner: false,
  });
  const [selectedMode, setMode] = useState(practice);
  const [modeSelectable, setModeSelectable] = useState(true);
  const [bestTime, setBestTime] = useLocalStorage("bestMilliSecondTime", NaN);
  const minutes = 0;
  const seconds = 0;

  const finishGame = (winner) => {
    const totalTime = milliseconds;
    if (winner && (!bestTime || totalTime < bestTime)) {
      setBestTime(totalTime);
    }
    setShowResult(true);
  };

    const { start, pause, reset, milliseconds } =
    useTimer({ autoStart: false });

  const setSelectedMode = (mode) => {
    if (modeSelectable) {
      setMode(mode);
    }
  };

  const closeDarkWorld = () => {
    pause();
    setShowDarkWorld(false);
  };

  const closeLightWorld = () => {
    pause();
    setShowLightWorld(false);
  };

  const resetGame = () => {
    setLightWorldDisabled(false);
    setDarkWorldDisabled(false);
    dungeons = randomizePrizes();
    setShowResult(false);
    setModeSelectable(true);
    reset(undefined, false);
  };

  const openLightWorld = (e, open) => {
    setModeSelectable(false);
    if (selectedMode.checkOnce) {
      setLightWorldDisabled(true);
    }
    showWorld(setShowLightWorld, open);
  };
  const openDarkWorld = (e, open) => {
    setModeSelectable(false);
    if (selectedMode.checkOnce) {
      setDarkWorldDisabled(true);
    }
    showWorld(setShowDarkWorld, open);
  };

  const showWorld = (setWorld, show) => {
    if (selectedMode.random) {
      handleRandomMode(setWorld, show);
    } else {
      start();
      setWorld(show);
      if (selectedMode.timeout) {
        setTimeout(() => setWorld(false), selectedMode.timeout);
      }
    }
  };

  const handleRandomMode = (setWorld, show) => {
    const randonShow = getRandomInt(2000, 10000);
    setTimeout(() => {
      setWorld(show);
      const randonHide = getRandomInt(2000, 10000);
      setTimeout(() => setWorld(false), randonHide);
    }, randonShow);
  };

  const handleTimedMode = (setWorld, show) => {
    setWorld(show);
  };

  const customStyles = {
    content: {
      height: "100%",
      width: "100%",
      padding: "0px",
      inset: "0",
      backgroundColor: "lightgrey",
      border: "0px",
    },
  };

  return (
    <div className="App">
      <header>
        <h1>Dungeon Guesser</h1>
      </header>
      <p>
        <button
          type="button"
          class="btn btn-secondary"
          onClick={(e) => openLightWorld(e, true)}
          disabled={lightWorldDisabled}
        >
          Light World Map
        </button>

        <Modal
          isOpen={showDarkWorld}
          style={customStyles}
          contentLabel="Lightworld"
        >
          <div onClick={() => closeDarkWorld()}>
            <DarkWorld
              dungeons={dungeons}
              milliseconds={milliseconds}
            />
          </div>
        </Modal>

        <button
          type="button"
          class="btn btn-secondary"
          onClick={(e) => openDarkWorld(e, true)}
          disabled={darkWorldDisabled}
        >
          Dark World Map
        </button>
      </p>
      <DungeonGuesser
        dungeons={dungeons}
        enabled={!showDarkWorld && !showLightWorld}
        setShowResult={finishGame}
        setResult={setResult}
      ></DungeonGuesser>
      <Modal
        isOpen={showResult}
        dialogClassName="modal-dialog"
        style={customStyles}
        contentLabel="Lightworld"
      >
        <div className="result-modal Modal" onClick={() => resetGame()}>
          <div class="container">
            <div class="timer result row justify-content-md-center">
              <div class="col-md-auto">
                {result.winner ? "You Win!" : "You Lost!"}
              </div>
            </div>

            <hr />
            <div class="row">
              <div class="col-sm">
                <span className="timer result">
                  Current Time: {(milliseconds / 1000).toFixed(3)}
                </span>
              </div>

              <div class="col-md-auto">
                <button class="btn btn-secondary" onClick={() => resetGame()}>
                  Play Again
                </button>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-sm">
                <span className="timer best">
                  Best Time: {bestTime ? (bestTime / 1000).toFixed(3): ''}
                </span>
              </div>
              <div class="col">
                <figure>
                  <img
                    className={bestTime < 20000 ? "medal" : "medal incomplete"}
                    src="sword1.png"
                    title="Achieve a time less than 20 seconds"
                  />
                  <figcaption>Beginner</figcaption>
                </figure>
              </div>
              <div class="col">
                <figure>
                  <img
                    className={bestTime < 5000 ? "medal" : "medal incomplete"}
                    src="sword2.png"
                    alt="Achieve a time less than 5 seconds"
                    title="Achieve a time less than 5 seconds"
                  />
                  <figcaption>Racer</figcaption>
                </figure>
              </div>
              <div class="col">
                <figure>
                  <img
                    className={bestTime < 3000 ? "medal" : "medal incomplete"}
                    src="sword3.png"
                    alt="Achieve a time less than 3 seconds"
                    title="Achieve a time less than 3 seconds"
                  />
                  <figcaption>Expert</figcaption>
                </figure>
              </div>
              <div class="col">
                <figure>
                  <img
                    className={bestTime < 1000 ? "medal" : "medal incomplete"}
                    src="sword4.png"
                    alt="Achieve a time less than 1 second"
                    title="Achieve a time less than 1 second"
                  />
                  <figcaption>Master</figcaption>
                </figure>
              </div>
            </div>

            <hr />
            {!result.winner && (
              <div>
                <div className="col-sm timer message">
                  {!result.winner && "Missing Answers:"}
                </div>
                <hr />

                <div className="row">
                  {result.guesses &&
                    Object.keys(result.guesses).map((key) => {
                      const boss = dungeonBosses.filter(
                        (boss) => boss.id === key
                      )[0];
                      return (
                        <div class="col parent">
                          <img
                            id={result.guesses[key].id}
                            className="boss boss-icon"
                            src={`/${boss.bossIcon}`}
                            alt={result.guesses[key].id}
                          />
                          <input
                            type="image"
                            id={boss.id}
                            className="boss prize"
                            value={boss.id}
                            src={`/${result.guesses[key].guessIcon}`}
                            alt={boss.id}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={showLightWorld}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        dialogClassName="modal-dialog"
        style={customStyles}
        contentLabel="Lightworld"
      >
        <div className="world-modal" onClick={() => closeLightWorld()}>
          <LigthtWorld
            dungeons={dungeons}
            // seconds={seconds}
            // minutes={minutes}
            milliseconds={milliseconds}
          />
        </div>
      </Modal>
    </div>
  );
}
