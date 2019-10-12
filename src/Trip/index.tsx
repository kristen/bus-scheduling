import React from 'react';
import "./index.css";
import {TripDetails} from "../App/reducers";


const Trip: React.FC<TripDetails> = ({id, startTime, endTime}) => {
    return (
        <div className="trip"
            style={
                {
                    width: `${endTime - startTime}px`,
                    left: `${startTime}px`
                }
            }>
            {id}
        </div>
    )
};

export default Trip;
