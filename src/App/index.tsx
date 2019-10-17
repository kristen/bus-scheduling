import React from 'react';
import Bus from "../Bus";
import {connect} from "react-redux";
import {RootState} from "../reducers";
import {getGroupedTrips,} from "./selectors";
import Trip from "../Trip";
import {Dispatch} from "redux";
import {changeBus, selectTrip} from "./actions";
import {TripDetails} from "./reducers";

interface OwnProps {
    groupedTrips: TripDetails[][];
}
interface ScheduleTimes {
    startTime: number;
    endTime: number;
}

type Props = OwnProps & ReturnType<typeof mapDispatchToProps>;
const getScheduleTimes = (schedule: TripDetails[]): ScheduleTimes => {
    const {startTimes, endTimes} = schedule.reduce((acc, {startTime, endTime}) => {
        acc.startTimes.push(startTime);
        acc.endTimes.push(endTime);
        return acc;
    }, {startTimes: [] as number[], endTimes: [] as number[]});
    return {startTime: Math.min(...startTimes), endTime: Math.max(...endTimes)}
};

const App: React.FC<Props> = ({groupedTrips, selectTrip, changeBus}) => {
    return (<div>
        <h1>Bus Scheduling</h1>
        {groupedTrips.map((schedule, index) =>
            <Bus key={index}
                 busId={index}
                 {...getScheduleTimes(schedule)}
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

