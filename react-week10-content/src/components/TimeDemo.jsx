import {useState, useEffect} from 'react';

function TimeDemo() {
    // state variables
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const timer = () => {
        let intervalId;
        if (isActive) {
            intervalId = setInterval(() => {
                setSeconds((prev) => prev + 1)
            }, 1000)
        }
        return () => { // clean up
            clearInterval(intervalId);
            console.log("cleanup function triggered, timer stopped")
        }
    }

    // useEffect(<side-effect>, <dependancy-array>)
    // useEffect(timer, []) // side effect will trigger onmount.
    useEffect(timer, [isActive]) // side effect will trigger onmount + with every state change
    // useEffect(timer) // abrupt continuous triggering of side effect X


   
    const resetTimer = () => {
        setSeconds(0);
        setIsActive(false);
    }

    return (
        <div>
            <h2>Timer: {seconds} seconds</h2>

            <div>
                <button onClick={() => setIsActive(true)} disabled={isActive}>Start</button>
                <button onClick={() => setIsActive(false)} disabled={!isActive}>Pause</button>
                <button onClick={resetTimer}>Reset</button>
            </div>

        </div>
    )

}

export default TimeDemo