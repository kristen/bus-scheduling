import React from 'react';
import Bus from "../Bus";
import {connect} from "react-redux";
import {RootState} from "../reducers";
import {getGroupedTrips} from "./selectors";
import Trip from "../Trip";
import "./index.css";
import {Dispatch} from "redux";
import {changeBus, selectTrip} from "./actions";
import {TripDetails} from "./reducers";

interface OwnProps {
    groupedTrips: TripDetails[][];
}

type Props = OwnProps & ReturnType<typeof mapDispatchToProps>;

const App: React.FC<Props> = ({groupedTrips, selectTrip, changeBus}) => {
    return (<div>
        <h1>Bus Scheduling</h1>
        {groupedTrips.map((schedule, index) =>
            <Bus key={index}
                 onClick={() => changeBus(index)}>
                {schedule.map(trip =>
                    <Trip {...trip}
                          key={trip.id}
                          onClick={() => selectTrip(index, trip.id)} />
                )}
            </Bus>
        )}
    </div>)
};

const mapStateToProps = (state: RootState) => ({
    groupedTrips: getGroupedTrips(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    selectTrip: (busId: number, tripId: number) => dispatch(selectTrip(busId, tripId)),
    changeBus: (busId: number) => dispatch(changeBus(busId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

