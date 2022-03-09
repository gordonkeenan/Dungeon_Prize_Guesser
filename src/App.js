import { useState } from "react";
import Modal from "react-modal";
import { DarkWorld } from "./DarkWorld";
import { DungeonGuesser } from "./DungeonGuesser";
import { LigthtWorld } from "./LightWord";
import { beginner, ModeSelector } from "./ModeSelector";
import { randomizePrizes } from "./prize";
import "./styles.css";

let dungeons = randomizePrizes();

export default function App() {
  const [showLightWorld, setShowLightWorld] = useState(false);
  const [showDarkWorld, setShowDarkWorld] = useState(false);
  const [lightWorldDisabled, setLightWorldDisabled] = useState(false);
  const [darkWorldDisabled, setDarkWorldDisabled] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    winner: false
  });
  const [selectedMode, setMode] = useState(beginner);
  const [modeSelectable, setModeSelectable] = useState(true);

  const setSelectedMode = (mode) => {
    if (modeSelectable) {
      setMode(mode);
    }
  };

  const closeDarkWorld = () => {
    setShowDarkWorld(false);
  };

  const closeLightWorld = () => {
    setShowLightWorld(false);
  };

  const resetGame = () => {
    setLightWorldDisabled(false);
    setDarkWorldDisabled(false);
    dungeons = randomizePrizes();
    setShowResult(false);
    setModeSelectable(true);
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

  const getRandomInt = (max, min) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const customStyles = {
    content: {
      height: "100%",
      width: "100%",
      padding: "0px",
      inset: "0",
      backgroundColor: "lightgrey",
      border: "0px"
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Dungeon Prize Practice App</h1>
      </header>
      <p>
        <button
          type="button"
          class="btn btn-secondary"
          onClick={(e) => openLightWorld(e, true)}
          disabled={lightWorldDisabled}
        >
          Check LightWord
        </button>

        <Modal
          isOpen={showDarkWorld}
          style={customStyles}
          contentLabel="Lightworld"
        >
          <div onClick={() => closeDarkWorld()}>
            <DarkWorld dungeons={dungeons} />
          </div>
        </Modal>

        <button
          type="button"
          class="btn btn-secondary"
          onClick={(e) => openDarkWorld(e, true)}
          disabled={darkWorldDisabled}
        >
          Check DarkWorld
        </button>
      </p>
      <DungeonGuesser
        dungeons={dungeons}
        enabled={!showDarkWorld && !showLightWorld}
        setShowResult={setShowResult}
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
        <div className="result-modal">
          <h1>Result</h1>
          <p>{result.winner ? "You Win" : "You Lost - Wrong Answers"}</p>
          <ul>
            {result.guesses &&
              result.guesses.map((guess) => {
                return <li>{guess}</li>;
              })}
          </ul>
          <button class="btn btn-secondary" onClick={() => resetGame()}>
            Play Again
          </button>
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
          <LigthtWorld dungeons={dungeons} />
        </div>
      </Modal>
      {/* {showLightWorld && <LigthtWorld dungeons={dungeons} />} */}

      <ModeSelector
        selectedMode={selectedMode}
        setMode={setSelectedMode}
      ></ModeSelector>
    </div>
  );
}
