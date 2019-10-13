import React, {DragEventHandler, MouseEventHandler} from 'react';
import "./index.css";
import {TripDetails} from "../App/reducers";

interface OwnProps {
    onClick: MouseEventHandler<HTMLDivElement>;
    onDragStart: DragEventHandler<HTMLDivElement>;
}

type Props = TripDetails & OwnProps;

const Trip: React.FC<Props> = ({id, startTime, endTime, selected, onClick, onDragStart}) => {
    const styles = {
        width: `${endTime - startTime}px`,
        left: `${startTime}px`,
    };
    const classNames = `trip ${selected ? 'selected' : ''}`;
    return (
        <div className={classNames}
             draggable
             onClick={onClick}
             onDragStart={onDragStart}
             style={styles}>
            {id}
        </div>
    )
};

export default Trip;
