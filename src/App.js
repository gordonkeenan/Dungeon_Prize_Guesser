import { useState } from "react";
import Modal from "react-modal";
import { useStopwatch } from "react-timer-hook";
import { DarkWorld } from "./DarkWorld";
import { DungeonGuesser } from "./DungeonGuesser";
import { dungeonBosses } from "./dungeons";
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
  const [milliseconds, setMillisecond] = useState(0);

  const [result, setResult] = useState({
    winner: false,
  });
  const [selectedMode, setMode] = useState(practice);
  const [modeSelectable, setModeSelectable] = useState(true);
  const [bestTime, setBestTime] = useLocalStorage("bestTime", NaN);

  const finishGame = (winner) => {
    const totalTime = seconds + minutes * 60;
    if (winner && (!bestTime || totalTime < bestTime)) {
      setBestTime(totalTime);
    }
    setShowResult(true);
  };

  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });

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
              seconds={seconds}
              minutes={minutes}
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
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        dialogClassName="modal-dialog"
        style={customStyles}
        contentLabel="Lightworld"
      >
        <div className="result-modal Modal" onClick={() => resetGame()}>
          <div class="container">
            {/* <div class="row justify-content-md-center">
              <div class="col-md-auto">
                <h4>Game Over</h4>0
              </div>
            </div> */}
            <div class="timer result row justify-content-md-center">
              <div class="col-md-auto">
                {result.winner ? "You Win!" : "You Lost!"}
              </div>
            </div>

            <hr />
            <div class="row">
              <div class="col-sm">
                <span className="timer result">
                  Current Time: {zeroPad(minutes, 2)}:{zeroPad(seconds, 2)}
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
                  Best Time: {bestTime ? zeroPad(bestTime, 2) : "--"} maybePluralize(bestTime, 'Second')
                </span>
              </div>
              <div class="col">
                <figure>
                  <img
                    className={bestTime < 60 ? "medal" : "medal incomplete"}
                    src="sword1.png"
                    title="Achieve a time less than 60 seconds"
                  />
                  <figcaption>Beginner</figcaption>
                </figure>
              </div>
              <div class="col">
                <figure>
                  <img
                    className={bestTime < 30 ? "medal" : "medal incomplete"}
                    src="sword2.png"
                    alt="Achieve a time less than 5 seconds"
                    title="Achieve a time less than 30 seconds"
                  />
                  <figcaption>Racer</figcaption>
                </figure>
              </div>
              <div class="col">
                <figure>
                  <img
                    className={bestTime < 10 ? "medal" : "medal incomplete"}
                    src="sword3.png"
                    alt="Achieve a time less than 10 seconds"
                    title="Achieve a time less than 10 seconds"
                  />
                  <figcaption>Expert</figcaption>
                </figure>
              </div>
              <div class="col">
                <figure>
                  <img
                    className={bestTime < 5 ? "medal" : "medal incomplete"}
                    src="sword4.png"
                    alt="Achieve a time less than 5 seconds"
                    title="Achieve a time less than 5 seconds"
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
            seconds={seconds}
            minutes={minutes}
            setMillisecond={setMillisecond}
            milliseconds={milliseconds}
          />
        </div>
      </Modal>
    </div>
  );
}
