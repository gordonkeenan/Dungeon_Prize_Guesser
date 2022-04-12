// export default useTimer = ({ autoStart }) => {
//   const [passedSeconds, setPassedSeconds] = useState(
//     Time.getSecondsFromExpiry(offsetTimestamp, true) || 0
//   );
//   const [prevTime, setPrevTime] = useState(new Date());
//   const [miliSeconds, setMiliSeconds] = useState(
//     passedSeconds + Time.getSecondsFromPrevTime(prevTime || 0, true)
//   );
//   const [isRunning, setIsRunning] = useState(autoStart);

import { useState, useEffect } from "react";
import useInterval from "./useInterval";

//   useInterval(
//     () => {
//         setMiliSeconds(passedSeconds + Time.getSecondsFromPrevTime(prevTime, true));
//     },
//     isRunning ? 100 : null
//   );

//   const start = () => {
//     const newPrevTime = new Date();
//     setPrevTime(newPrevTime);
//     setIsRunning(true);
//     setMiliSeconds(
//       passedSeconds + Time.getSecondsFromPrevTime(newPrevTime, true)
//     );
//   };

//   const pause = () => {
//     setPassedSeconds(seconds);
//     setIsRunning(false);
//   };

//   const reset = (offset = 0, newAutoStart = true) => {
//     const newPassedSeconds = Time.getSecondsFromExpiry(offset, true) || 0;
//     const newPrevTime = new Date();
//     setPrevTime(newPrevTime);
//     setPassedSeconds(newPassedSeconds);
//     setIsRunning(newAutoStart);
//     setMiliSeconds(
//       newPassedSeconds + Time.getSecondsFromPrevTime(newPrevTime, true)
//     );
//   };

//   return {
//     ...Time.getTimeFromSeconds(miliSeconds),
//     start,
//     pause,
//     reset,
//     isRunning,
//   };
// };

const useTimer = () => {
  const [prevTime, setPrevTime] = useState(Date.now());
  const [isRunning, setIsRunning] = useState(false);
  const [milliseconds, setMilliSeconds] = useState(0);
  const [prevMilliseconds, setPrevMilliSeconds] = useState(0);

  const [ms, setMs] = useState(0);
  const [interval, setIntervalRef] = useState(0);

  const start = () => {
    console.log('start')
    const newPrevTime = new Date();
    setPrevTime(newPrevTime);
    setIsRunning(true);

    //setMilliSeconds(Date.now() - newPrevTime);

    // setIntervalRef(setInterval(() => {
    //   setMilliSeconds(Date.now() - (prevTime));
    // }, 100));
  };

  const reset = () => {
    setMilliSeconds(0);
    setPrevMilliSeconds(0);
    setIsRunning(false);

  }

  const pause = () => {
    setIsRunning(false);
    clearInterval(interval);
    setPrevMilliSeconds(milliseconds);
    console.log('pause', milliseconds)
  };


// broken
  // useEffect(() => { 
  //   setIntervalRef(setInterval(() => {
  //     setMs(Date.now() - prevTime)
  //     setMilliSeconds(Date.now() - prevTime);
  //   }, 100));
  // }, isRunning);

    useInterval(
    () => {
      setMilliSeconds((Date.now() - prevTime) + prevMilliseconds);
    },
    isRunning ? 100 : null
  );

  // useEffect(() => { 
  //   if(isRunning) {
  //     setInterval(() => {
  //       setMs(Date.now() - prevTime)
  //       setMilliSeconds(Date.now() - prevTime);
  //     }, 100);
  //   }
  //   else {
  //     return () => {};

  //   }
  // }, isRunning);

    return {
    start,
    pause,
    reset,
    milliseconds
  };
};

export default useTimer;