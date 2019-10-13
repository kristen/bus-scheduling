import {BusScheduleActions} from "./actions";
import {getType} from "typesafe-actions";
import * as actions from './actions';

export interface TripDetails {
    id: number;
    startTime: number;
    endTime: number;
    selected?: boolean;
}

const initialSchedule: TripDetails[] = [
    { "id": 1, "startTime": 30, "endTime": 150 },
    { "id": 2, "startTime": 180, "endTime": 300 },
    { "id": 3, "startTime": 330, "endTime": 450 },
    { "id": 4, "startTime": 40, "endTime": 130 },
    { "id": 5, "startTime": 160, "endTime": 250 },
    { "id": 6, "startTime": 280, "endTime": 370 },
    { "id": 7, "startTime": 400, "endTime": 490 },
    { "id": 8, "startTime": 80, "endTime": 240 },
    { "id": 9, "startTime": 280, "endTime": 430 }
];

export const schedule = (state: TripDetails[] = initialSchedule, action: BusScheduleActions): TripDetails[] => {
    switch (action.type) {
        case getType(actions.selectTrip):
            const {tripId} = action.payload;
            return state.map(trip => {
                if (trip.id === tripId) {
                    return {...trip, selected: !trip.selected};
                }
                return {...trip, selected: false};
            });
        default:
            return state;
    }
};
