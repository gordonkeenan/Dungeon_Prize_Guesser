import { useState, useEffect } from "react";
import useInterval from "./useInterval";

const useTimer = () => {
  const [prevTime, setPrevTime] = useState(Date.now());
  const [isRunning, setIsRunning] = useState(false);
  const [milliseconds, setMilliSeconds] = useState(0);
  const [prevMilliseconds, setPrevMilliSeconds] = useState(0);

  const [ms, setMs] = useState(0);
  const [interval, setIntervalRef] = useState(0);

  const start = () => {
    console.log("start");
    const newPrevTime = new Date();
    setPrevTime(newPrevTime);
    setIsRunning(true);
  };

  const reset = () => {
    setMilliSeconds(0);
    setPrevMilliSeconds(0);
    setIsRunning(false);
  };

  const pause = () => {
    setIsRunning(false);
    clearInterval(interval);
    setPrevMilliSeconds(milliseconds);
    console.log("pause", milliseconds);
  };

  useInterval(
    () => {
      setMilliSeconds(Date.now() - prevTime + prevMilliseconds);
    },
    isRunning ? 100 : null
  );

  return {
    start,
    pause,
    reset,
    milliseconds,
  };
};

export default useTimer;
