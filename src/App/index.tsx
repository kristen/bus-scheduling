import React from 'react';
import Bus from "../Bus";
import {connect} from "react-redux";
import {RootState} from "../reducers";
import {getSchedule} from "./selectors";
import Trip from "../Trip";
import {TripDetails} from "./reducers";
import "./index.css";
import {Dispatch} from "redux";
import {selectTrip} from "./actions";

interface OwnProps {
    schedule: TripDetails[];
}

type Props = OwnProps & ReturnType<typeof mapDispatchToProps>;

const App: React.FC<Props> = ({schedule, selectTrip}) => {
    return (
        <div>
            <h1>Bus Scheduling</h1>
            {schedule.map(trip => {
                return (
                    <Bus>
                        <Trip {...trip} onClick={() => selectTrip(trip.id)} />
                    </Bus>
                )
            })}
        </div>
    )
};

const mapStateToProps = (state: RootState) => ({
    schedule: getSchedule(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    selectTrip: (id: number) => dispatch(selectTrip(id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

