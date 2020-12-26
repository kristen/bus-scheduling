import React, {MouseEventHandler} from 'react';
import "./index.css";

interface Props {
    busId: number;
    startTime: number;
    endTime: number;
    children?: React.ReactNode;
    // onClick: MouseEventHandler<HTMLDivElement>;
}

const MINUTES_IN_HOUR = 60;

const Bus: React.FC<Props> = ({busId, startTime, endTime, children}) => {
    const formatTime = (time: number) => {
        const minutes = Math.floor(time % MINUTES_IN_HOUR).toString().padEnd(2, '0');
        const hours = Math.floor(time / MINUTES_IN_HOUR);
        return `${hours}:${minutes}`;
    };
    const isNewBus = startTime === Infinity;
    const scheduleTime = isNewBus ? '' : `${formatTime(startTime)} - ${formatTime(endTime)}`;
    if (isNewBus) {
        return (
            <div className="bus new-bus">
                <div className="bus-id">New Bus</div>
                <div className="trips">{children}</div>
            </div>
        )
    }
    return (
        <div className="bus existing-bus">
            <div className="bus-id">Bus {busId+1}</div>
            <div className="schedule-time">
                {scheduleTime}
            </div>
            <div className="trips">{children}</div>
        </div>
    )
};

export default Bus;
