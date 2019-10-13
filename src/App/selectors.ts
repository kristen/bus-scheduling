import {RootState} from "../reducers";
import {createSelector} from "reselect";
import {BusSchedule, TripDetails} from "./reducers";

export type GroupedTrips = {[busId: string]: TripDetails[]};

const getSchedule = (state: RootState) => state.schedule;
export const getGroupedTrips = createSelector(getSchedule, (schedule: BusSchedule) => schedule.groupedTrips);
