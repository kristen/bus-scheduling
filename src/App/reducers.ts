import * as actions from "./actions";
import {BusScheduleActions} from "./actions";
import {getType} from "typesafe-actions";
import {combineReducers} from "redux";

export interface BusSchedule {
    trips: TripDetails[];
}

export interface TripDetails {
    id: number;
    startTime: number;
    endTime: number;
    selected: boolean;
    busId: string;
}

const initialTripDetails: TripDetails[] = [
    { "id": 1, "startTime": 30, "endTime": 150 },
    { "id": 2, "startTime": 180, "endTime": 300 },
    { "id": 3, "startTime": 330, "endTime": 450 },
    { "id": 4, "startTime": 40, "endTime": 130 },
    { "id": 5, "startTime": 160, "endTime": 250 },
    { "id": 6, "startTime": 280, "endTime": 370 },
    { "id": 7, "startTime": 400, "endTime": 490 },
    { "id": 8, "startTime": 80, "endTime": 240 },
    { "id": 9, "startTime": 280, "endTime": 430 }
].map(trip => ({...trip, selected: false, busId: trip.id.toString()}));

export const trips = (state: TripDetails[] = initialTripDetails, action: BusScheduleActions): TripDetails[] => {
    switch (action.type) {
        case getType(actions.selectTrip):
            return state.map(trip => {
                if (trip.id === action.payload.tripId) {
                    return {...trip, selected: !trip.selected};
                }
                return {...trip, selected: false};
            });
        case getType(actions.moveTrip):
            return state.map(trip => {
                if (trip.id === action.payload.tripId) {
                    return {...trip, selected: true};
                }
                return {...trip, selected: false};
            });
        case getType(actions.changeBus):
            const {busId} = action.payload;
            const tripsOnBus = state.filter(trip => trip.busId === busId);
            return state.map(trip => {
                if (trip.id === action.payload.tripId) {
                    // make sure trip doesn't collide with trip already on bus
                    const isNotOverlap = ({startTime, endTime}: TripDetails) => {
                        return trip.startTime > endTime || trip.endTime < startTime;
                    };
                    if (tripsOnBus.every(isNotOverlap)) {
                        return {...trip, selected: false, busId };
                    }
                }
                return {...trip, selected: false};
            });
        default:
            return state;
    }
};

export default combineReducers({
    trips,
})