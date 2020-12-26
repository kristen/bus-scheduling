import React from 'react';
import "./index.css";
import {TripDetails} from "../App/reducers";

interface OwnProps {
    onClick: Function;
}

type Props = TripDetails & OwnProps;

const PlacementTrip: React.FC<Props> = ({id, startTime, endTime, onClick}) => {
    const styles = {
        width: `${endTime - startTime}px`,
        left: `${startTime}px`,
    };
    return (
        <div className="trip placement"
             onClick={event => {
                 event.stopPropagation();
                 console.log("placement clicked");
                 onClick();
             }}
             style={styles}>
            +
        </div>
    )
};

export default PlacementTrip;
