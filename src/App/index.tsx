import React from 'react';
import Bus from "../Bus";
import {connect} from "react-redux";
import {RootState} from "../reducers";
import {getSchedule} from "./selectors";
import Trip from "../Trip";
import {TripDetails} from "./reducers";
import "./index.css";

interface Props {
    schedule: TripDetails[];
}

const App: React.FC<Props> = ({schedule}) => {
    return (
        <div>
            <h1>Bus Scheduling</h1>
            {schedule.map(trip => {
                return (
                    <Bus>
                        <Trip {...trip} />
                    </Bus>
                )
            })}
        </div>
    )
};

const mapStateToProps = (state: RootState) => ({
    schedule: getSchedule(state),
});

export default connect(
    mapStateToProps
)(App);

