import React from 'react';
import "./index.css";
import {TripDetails} from "../App/reducers";

interface OwnProps {
    onClick: Function;
}

type Props = TripDetails & OwnProps;

const Trip: React.FC<Props> = ({id, startTime, endTime, selected, onClick}) => {
    const styles = {
        width: `${endTime - startTime}px`,
        left: `${startTime}px`,
    };
    return (
        <div className={`trip ${selected ? 'selected' : ''}`}
             onClick={event => {
                 event.stopPropagation();
                 onClick();
             }}
             style={styles}>
            {id}
        </div>
    )
};

export default Trip;
