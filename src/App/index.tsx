import React from 'react';
import Bus from "../Bus";
import {connect} from "react-redux";
import {RootState} from "../reducers";
import {getGroupedTrips, GroupedTrips} from "./selectors";
import Trip from "../Trip";
import "./index.css";
import {Dispatch} from "redux";
import {changeBus, selectTrip} from "./actions";

interface OwnProps {
    groupedTrips: GroupedTrips;
}

type Props = OwnProps & ReturnType<typeof mapDispatchToProps>;

const App: React.FC<Props> = ({groupedTrips, selectTrip, changeBus}) => {
    return (<div>
        <h1>Bus Scheduling</h1>
        {Object.keys(groupedTrips).map(busId =>
            <Bus key={busId}
                 onClick={() => changeBus(busId)}>
                {groupedTrips[busId].map(trip =>
                    <Trip {...trip}
                          key={trip.id}
                          onClick={() => selectTrip(trip.id)} />
                )}
            </Bus>
        )}
    </div>)
};

const mapStateToProps = (state: RootState) => ({
    groupedTrips: getGroupedTrips(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    selectTrip: (tripId: number) => dispatch(selectTrip(tripId)),
    changeBus: (busId: string) => dispatch(changeBus(busId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

