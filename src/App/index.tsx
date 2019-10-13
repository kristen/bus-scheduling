import React, {DragEvent} from 'react';
import Bus from "../Bus";
import {connect} from "react-redux";
import {RootState} from "../reducers";
import {getGroupedTrips, GroupedTrips} from "./selectors";
import Trip from "../Trip";
import "./index.css";
import {Dispatch} from "redux";
import {changeBus, moveTrip, selectTrip} from "./actions";

interface OwnProps {
    groupedTrips: GroupedTrips;
}

type Props = OwnProps & ReturnType<typeof mapDispatchToProps>;

const App: React.FC<Props> = ({groupedTrips, selectTrip, moveTrip, changeBus}) => {
    const DRAG_EVENT_DATA = 'tripId';
    const handleDragStart = (event: DragEvent<HTMLDivElement>, tripId: number) => {
        event.dataTransfer.setData(DRAG_EVENT_DATA, tripId.toString());
        moveTrip(tripId);
    };
    const handleDrop = (event: DragEvent<HTMLDivElement>, busId: string) => {
        const tripId = event.dataTransfer.getData(DRAG_EVENT_DATA);
        changeBus(parseInt(tripId), busId);
    };
    return (<div>
        <h1>Bus Scheduling</h1>
        {Object.keys(groupedTrips).map(busId =>
            <Bus key={busId}
                 onDrop={event => handleDrop(event, busId)}>
                {groupedTrips[busId].map(trip =>
                    <Trip {...trip}
                          key={trip.id}
                          onClick={() => selectTrip(trip.id)}
                          onDragStart={event => handleDragStart(event, trip.id)} />
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
    moveTrip: (tripId: number) => dispatch(moveTrip(tripId)),
    changeBus: (tripId: number, busId: string) => dispatch(changeBus(tripId, busId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

