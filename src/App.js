import React, { useState, useEffect } from "react";
import NoCounter from "./components/NoCounter";

export default function App() {
  const [time, setTime] = useState(getCurrentTime());
  
  const [displayTimer, setDisplayTimer] = useState(false);
  const [displayStopwatch, setDisplayStopwatch] = useState(false);

  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);

  const [timerTime, setTimerTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerInput, setTimerInput] = useState("");

  const [displayedTime, setDisplayedTime] = useState(time);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = getCurrentTime();
      setTime(currentTime);

      // If neither stopwatch nor timer is active, show the current clock time
      if (!displayStopwatch && !displayTimer) {
        setDisplayedTime(currentTime);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [displayStopwatch, displayTimer]);

  // Stopwatch useEffect
  useEffect(() => {
    let interval = null;
    if (isStopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchTime((prevTime) => prevTime + 1);
        setDisplayedTime(formatTime(stopwatchTime + 1));
      }, 1000);
    } else if (!isStopwatchRunning && stopwatchTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isStopwatchRunning, stopwatchTime]);

  // Timer useEffect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerTime > 0) {
      interval = setInterval(() => {
        setTimerTime((prevTime) => prevTime - 1);
        setDisplayedTime(formatTime(timerTime - 1));
      }, 1000);
    } else if (timerTime === 0 && isTimerRunning) {
      clearInterval(interval);
      setIsTimerRunning(false);
      alert("Time's up!");
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerTime]);

  // Format time in HH:MM:SS format
  function formatTime(seconds) {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  }

  function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  const numArray = displayedTime
    .split("")
    .map(Number)
    .filter((n) => !isNaN(n));

  // Function to handle timer input
  const handleTimerInputChange = (e) => {
    setTimerInput(e.target.value);
  };

  const startTimer = () => {
    const timeInSeconds = parseInt(timerInput) * 60;
    setTimerTime(timeInSeconds);
    setIsTimerRunning(true);
    setDisplayedTime(formatTime(timeInSeconds)); // Update the displayed time to timer value
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setTimerTime(0);
    setIsTimerRunning(false);
    setDisplayedTime(formatTime(0)); // Reset display to 00:00:00
  };

  return (
    <div>
      <div className="in">
        <button className="clockBT" onClick={() => {setDisplayStopwatch(false); setDisplayTimer(false);}}>Clock</button>
        <button onClick={() => {setDisplayStopwatch(true); setDisplayTimer(false); setDisplayedTime(formatTime(stopwatchTime)); document.title = 'Stopwatch'}}>Stopwatch</button>
        <button className="timerBT" onClick={() => {setDisplayTimer(true); setDisplayStopwatch(false); setDisplayedTime(formatTime(timerTime)); document.title = 'Timer'}}>Timer</button>
      </div>
      <div className="numberbox colen">
        <div>:</div> <div>:</div>
      </div>
      
      {/* Time Display */}
      <NoCounter num={numArray} />

      {/* Stopwatch */}
      {displayStopwatch && (
        <div className="stopwatch">
          <h2>Stopwatch {formatTime(stopwatchTime)}</h2>
          <div className="btbox">
            <button onClick={() => {setIsStopwatchRunning(true); resetTimer()}}>Start</button>
            <button onClick={() => setIsStopwatchRunning(false)}>Pause</button>
            <button onClick={() => {setStopwatchTime(0); setIsStopwatchRunning(false); setDisplayedTime(formatTime(0));}}>Reset</button>
          </div>
        </div>
      )}

      {/* Timer */}
      {displayTimer && (
        <div className="timer">
          <h2>Timer {formatTime(timerTime)}</h2>
          <input
          className="timerinput"
            type="text"
            placeholder="Time in minutes"
            value={timerInput}
            onChange={handleTimerInputChange}
          />
          <div className="btbox">
            <button onClick={() => {startTimer(); setStopwatchTime(0); setIsStopwatchRunning(false); setDisplayedTime(formatTime(0));}}>Start</button>
            <button onClick={pauseTimer}>Pause</button>
            <button onClick={resetTimer}>Reset</button>
          </div>
        </div>
      )}
    </div>
  );
}
