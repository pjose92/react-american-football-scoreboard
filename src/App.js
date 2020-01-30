//TODO: STEP 1 - Import the useState hook.
import React from "react";
import "./App.css";
import BottomRow from "./BottomRow";
import { useState, useEffect } from "react";

function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.

// set state for teams 
const [homeScore, setHomeScore] = useState(0);
const [visitorScore, setVisitorScore] = useState(0);


//Set state for timer
// const [timer, setTimer] = useState(0);
// const [isActive, setIsActive] = useState(false);
const [seconds, setSeconds] = useState(0);
const [thenthSeconds,setTenthSeconds] = useState(0)
const [minute, setMinute] = useState(0);
const [isActive, setIsActive] = useState(false);


// scoring points 
const homeTouchDown = () => {
  setHomeScore(homeScore + 7);
}

const homeFieldScore = () => {
  setHomeScore(homeScore + 3);
}

const awayTouchDown = () => {
  setVisitorScore(homeScore + 7);
}

const awayFieldScore = () => {
  setVisitorScore(homeScore + 3);
}

// setTimeout( () => {  
//   setTimer(timer + 1);
// }, 1000);


// function reset () {
//   setTimer (0)
//   setIsActive(false);
// }

// function toggle() {
//   setIsActive(!isActive);
// }

//Toggle function is here
function toggle() {
  setIsActive(!isActive);
}

//Reset function is here
function reset() {
  setMinute(0)
  setTenthSeconds(0)
  setSeconds(0);
  setIsActive(false);
}
  
//Minute counter
let min = useEffect(() => {
  let interval = null;
  if (isActive) {
    interval = setInterval(() => {
      setMinute((minute) =>  (minute < 9) ? minute + 1 : minute = 0 );
    }, 60000);
  } else if (!isActive && minute !== 0) {
    clearInterval(interval);
  }
  return () => clearInterval(interval);
}, [isActive, minute]);
    

//Tenth-place Second counter
let tenthsec = useEffect(() => {
  let interval = null;
  if (isActive) {
    interval = setInterval(() => {
      setTenthSeconds((thenthSeconds) =>  
      (thenthSeconds < 5) ? thenthSeconds +1 : thenthSeconds = 0 );
    }, 10000);
  } else if (!isActive && thenthSeconds !== 0) {
    clearInterval(interval);
  }
    return () => clearInterval(interval);
}, [isActive, thenthSeconds]);


//One-place second counter
let sec = useEffect(() => {
  let interval = null;
  if (isActive) {
    interval = setInterval(() => {
      setSeconds((seconds) =>  { 
        if (seconds < 9) { return seconds +1 
        } else {  return seconds = 0} } );
    }, 1000);
  } else if (!isActive && seconds !== 0) {
    clearInterval(interval);
  }
  return () => clearInterval(interval);
}, [isActive, seconds]);


  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">Lions</h2>

            {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}

            <div className="home__score">{homeScore}</div>
          </div>
          <div className="timer">{minute}:{thenthSeconds}{seconds}</div>
          <button className="start-button"  onClick={() => toggle()}>Start/Stop</button>
          <button className="reset-button"  onClick={() => reset()}>Reset</button>
          <div className="away">
            <h2 className="away__name">Tigers</h2>
            <div className="away__score">{visitorScore}</div>
          </div>
        </div>
        <BottomRow />
      </section>
      <section className="buttons">
        <div className="homeButtons">
          {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
          <button onClick = {homeTouchDown} className="homeButtons__touchdown">Home Touchdown</button>
          <button onClick = {homeFieldScore} className="homeButtons__fieldGoal">Home Field Goal</button>
        </div>
        <div className="awayButtons">
          <button onClick = {awayTouchDown} className="awayButtons__touchdown">Away Touchdown</button>
          <button onClick = {awayFieldScore} className="awayButtons__fieldGoal">Away Field Goal</button>
        </div>
      </section>
    </div>
  );
}

export default App;
