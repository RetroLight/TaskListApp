import React from "react";
import './timer.styles.scss';

import {useState} from "react";


const Timer = ({taskStatus, taskTimer}) => {
    const [timer, setTimer] = useState({hours: taskTimer.hours, minutes: taskTimer.minutes})

    const timerHandler = () => {
        if(taskStatus === 1) {
            setTimeout(() => {
                if(timer.minutes !== 59) {
                    setTimer(prevTimer => ({
                        ...prevTimer,
                        hours: prevTimer.hours,
                        minutes: prevTimer.minutes + 1
                    }))
                } else {
                    setTimer(prevTimer => ({
                        ...prevTimer,
                        hours: prevTimer.hours + 1,
                        minutes: 0
                    }))
                }
            }, 1000)
        }
        return;
    }

    timerHandler()

    return (
        <div className='timer_container'>
            <span>В работе</span>
            <div className='timer_content'>
                {`${timer.hours < 10 ? '0' + timer.hours : timer.hours }`}
                <span className='blinking'>:</span>
                {`${timer.minutes < 10 ? '0' + timer.minutes : timer.minutes }`}
            </div>
        </div>
    )
};

export default Timer;
