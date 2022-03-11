import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Mode } from "./Mode";

export const practice = {
  id: "practice",
  icon: "prize5.png",
  name: "Practice",
  text: "No time limit. Open and close the maps at will.",
  checkOnce: false
};

export const beginner = {
  id: "beginner",
  icon: "sword1.png",
  name: "Beginner",
  text: "30 seconds to view each map.",
  timeout: 30000,
  checkOnce: true
};

export const racer = {
  id: "racer",
  icon: "sword2.png",
  name: "Racer",
  text: "10 seconds to view each map.",
  timeout: 10000,
  checkOnce: true
};

export const expert = {
  id: "expert",
  icon: "sword3.png",
  text: "5 seconds to view each map.",
  name: "Expert",
  timeout: 5000,
  checkOnce: true
};

const commentator = {
  id: "commentator",
  icon: "sword4.png",
  name: "Commentator",
  text: "Random time to view each map. Map will randomly appear.",
  random: true,
  checkOnce: true
};

export const ModeSelector = ({ selectedMode, setMode, disabled }) => {
  return (
    <div className="container">
      <div className="row btn-group" role="group">
        <Mode
          setMode={setMode}
          mode={practice}
          selectedMode={selectedMode}
        ></Mode>

        <Mode
          setMode={setMode}
          mode={beginner}
          selectedMode={selectedMode}
        ></Mode>

        <Mode setMode={setMode} mode={racer} selectedMode={selectedMode}></Mode>

        <Mode
          setMode={setMode}
          mode={expert}
          selectedMode={selectedMode}
        ></Mode>

        <Mode
          setMode={setMode}
          mode={commentator}
          selectedMode={selectedMode}
        ></Mode>
      </div>
    </div>
  );
};
