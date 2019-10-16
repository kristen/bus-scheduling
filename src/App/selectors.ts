import {RootState} from "../reducers";
import {createSelector} from "reselect";
import {BusSchedule} from "./reducers";

const getSchedule = (state: RootState) => state.schedule;
export const getGroupedTrips = createSelector(getSchedule, (schedule: BusSchedule) => schedule.groupedTrips);
