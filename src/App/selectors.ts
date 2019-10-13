import {RootState} from "../reducers";
import {createSelector} from "reselect";
import {BusSchedule, TripDetails} from "./reducers";

export type GroupedTrips = {[busId: string]: TripDetails[]};

const getSchedule = (state: RootState) => state.schedule;
export const getGroupedTrips = createSelector(getSchedule, (schedule: BusSchedule) => {
   return schedule.trips.reduce((acc, trip) => {
       const bus: TripDetails[] = acc[trip.busId] || [];
       bus.push(trip);
       acc[trip.busId] = bus;
       return acc;
   }, {} as GroupedTrips);
});
