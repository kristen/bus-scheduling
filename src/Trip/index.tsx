import React, {MouseEventHandler} from 'react';
import "./index.css";
import {TripDetails} from "../App/reducers";

interface OwnProps {
    onClick: MouseEventHandler<HTMLDivElement>
}

type Props = TripDetails & OwnProps;

const Trip: React.FC<Props> = ({id, startTime, endTime, selected, onClick}) => {
    const styles = {
        width: `${endTime - startTime}px`,
        left: `${startTime}px`,
    };
    const classNames = `trip ${selected ? 'selected' : ''}`;
    return (
        <div className={classNames}
             onClick={onClick}
             style={styles}>
            {id}
        </div>
    )
};

export default Trip;
