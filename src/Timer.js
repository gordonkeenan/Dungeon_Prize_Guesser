import Timer from "react-compound-timer/build";

<Timer ref={(node) => { this.timerRef = node; }}> 
{({ start, resume, pause, stop, reset, timerState }) => ( 
    <>
    <span className="timer"><Timer.Seconds />:<Timer.Milliseconds /></span>
        
    </>
)}
</Timer>
{/* <button onClick={() => {this.timerRef.stop()}}>stop timer</button>
<button onClick={() => {this.timerRef.start()}}>start timer</button> */}