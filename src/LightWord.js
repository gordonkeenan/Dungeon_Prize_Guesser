import { useState, useEffect } from "react";
import useTimer from "./hooks/useTimer";
import background from "./Hyrule_Light_World_map.png";
import { zeroPad } from "./Utils";
// import useTimer from "react-timer-hook";

// const [milliseconds, setMillisecond] = useState(0);
// const interval = setInterval(() => {
//   setMillisecond(Date.now() - startTime);
//   //document.getElementById("timer").innerHTML = (elapsedTime / 1000).toFixed(3);
// }, 100);

export const LigthtWorld = ({
  dungeons,
  milliseconds,
  // setMillisecond,
}) => {
  // const [milliseconds, setMillisecond] = useState(0);
  const style = {
    backgroundImage: `url(${background})`,
  };
  // const [intervalStatus, setIntervalStatus] = useState(false);
  // const startTime = Date.now();
  // let interval;

  // useEffect(() => {
  //   return () => { 
  //     console.log('here')
  //     return clearInterval(interval)};
  // }),[];

  // useEffect(() => {
  //   return () => {
  //     console.log('will unmount');
  //     clearInterval(interval);
  //   }
  // }, []);


  // useEffect(() => {
  //   setIntervalStatus(true);
  //   interval = setInterval(() => {
  //     setMillisecond(Date.now() - startTime);
  //     //document.getElementById("timer").innerHTML = (elapsedTime / 1000).toFixed(3);
  //   }, 100);
  // }, );

  // const { start, pause, milliseconds } =
  // useTimer({ autoStart: false });

  //   useEffect(() => {
  //     start();
  //   return () => {
  //     pause();
  //   }
  // }, []);



  return (
    <div className="world-background Modal" style={style}>
      {/* <span className="timer">{zeroPad(minutes, 2)}:{zeroPad(seconds, 2)}</span> */}
      <span className="timer">{(milliseconds / 1000).toFixed(3)}</span>
      <img
        id="hera"
        className="hera icon"
        src={`/${dungeons.hera.prizeIcon}`}
        alt="Hera"
      />
      <img
        id="eastern"
        className="eastern icon"
        src={`/${dungeons.eastern.prizeIcon}`}
        alt="Eastern"
      />
      <img
        id="desert"
        className="desert icon"
        src={`/${dungeons.desert.prizeIcon}`}
        alt="Desert"
      />
    </div>
  );
};
