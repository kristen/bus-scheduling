import * as actions from "./actions";
import {BusScheduleActions} from "./actions";
import {getType} from "typesafe-actions";
import {combineReducers} from "redux";

export interface BusSchedule {
    groupedTrips: TripDetails[][];
}

export enum TripType {
    ACTUAL = "ACTUAL",
    PLACEMENT = "PLACEMENT",
}

export interface TripDetails {
    id: number;        // an identifier for this trip
    type: TripType;    // "placement" vs "trip"
    startTime: number; // the number of minutes after midnight that this trip starts
    endTime: number;   // the number of minutes after midnight that this trip ends
    selected: boolean;
}

// export interface PlacementTripDetails {
//     startTime: number;
//     endTime: number;
// }

const initialGroupedTrips: TripDetails[][] = [
    { "id": 1, "startTime": 30, "endTime": 150 },
    { "id": 2, "startTime": 180, "endTime": 300 },
    { "id": 3, "startTime": 330, "endTime": 450 },
    { "id": 4, "startTime": 40, "endTime": 130 },
    { "id": 5, "startTime": 160, "endTime": 250 },
    { "id": 6, "startTime": 280, "endTime": 370 },
    { "id": 7, "startTime": 400, "endTime": 490 },
    { "id": 8, "startTime": 80, "endTime": 240 },
    { "id": 9, "startTime": 280, "endTime": 430 }
].reduce((acc, trip) => {
    acc.push([{...trip, type: TripType.ACTUAL, selected: false}]);
    return acc;
}, [] as TripDetails[][]);

const canMoveTrip = (bus: TripDetails[], trip: TripDetails) => bus.every(({type, startTime, endTime}) => {
    return trip.startTime > endTime || trip.endTime < startTime || type === TripType.PLACEMENT;
});

const selectTripForBus = (state: TripDetails[][], busId: number, tripId: number): TripDetails[][] => {
    const {updatedState, isTripSelected, updatedTrip} = state.reduce((acc, schedule, index) => {
        acc.updatedState[index] = state[index].map(trip => {
            if (trip.id === tripId) {
                const updatedTrip = {...trip, selected: !trip.selected};
                acc.isTripSelected = updatedTrip.selected;

                acc.updatedTrip = updatedTrip;

                return updatedTrip;
            }
            return {...trip, selected: false};
        });
        return acc;
    }, { updatedState: [] as TripDetails[][], isTripSelected: false, updatedTrip: undefined as TripDetails|undefined });

    if (updatedTrip && updatedState.every(schedule => schedule.every(trip => trip.type !== TripType.PLACEMENT))) {
        // if a trip is selected & no other empty bus schedule, add another bus route
        // todo add placement trip
        // figure out "placement" trips
        return ([...updatedState, []]).map((tripDetails: TripDetails[], index: number) => {
            if (canMoveTrip(tripDetails, updatedTrip)) {
                const placement = {...updatedTrip, type: TripType.PLACEMENT, selected: false};
                return [...tripDetails, placement];
            }
            return tripDetails;
        });
    } else {
        return updatedState
            .map(schedule => {
                const filteredSchedule = schedule.filter(trip => trip.type === TripType.ACTUAL)
                return filteredSchedule;
            })
            .filter(schedule => schedule &&  schedule.length);
        // return updatedState.filter(schedule => schedule &&  schedule.length);
    }
};

const changeToBus = (state: TripDetails[][], toBusId: number): TripDetails[][] => {
    // remove bus from original location
    const {selectedTrip, updatedSchedule} = state.reduce((acc, schedule, index) => {
        // find selected trip
        const selectedTrip = schedule.find(trip => trip.selected);
        console.log("selected trip", selectedTrip);

        if (selectedTrip && canMoveTrip(state[toBusId], selectedTrip)) {
            acc.selectedTrip = {...selectedTrip, selected: false};
            // take it out of current bus
            const updatedSchedule = schedule.filter(trip => trip.id !== selectedTrip.id);
            // make sure updatedSchedule has length before putting in acc
            if (updatedSchedule.length) {
                acc.updatedSchedule[index] = updatedSchedule;
            }
            return acc
        } else {
            acc.updatedSchedule[index] = schedule.map(trip => ({...trip, selected: false}));
        }
        return acc;
    }, {selectedTrip: undefined as TripDetails|undefined, updatedSchedule: [] as TripDetails[][]});

    // insert it into new bus and flatten out empty bus schedules
    if (selectedTrip) updatedSchedule[toBusId].push(selectedTrip);
    return updatedSchedule.map(schedule => {
        const filteredSchedule = schedule.filter(trip => trip.type === TripType.ACTUAL)
        return filteredSchedule;
    }).filter(schedule => schedule && schedule.length);
};

export const groupedTrips = (state: TripDetails[][] = initialGroupedTrips, action: BusScheduleActions): TripDetails[][] => {
    switch (action.type) {
        case getType(actions.selectTrip):
            return selectTripForBus(state, action.payload.busId, action.payload.tripId);
        case getType(actions.changeBus):
            return changeToBus(state, action.payload.busId);
        default:
            return state;
    }
};

export default combineReducers({
    groupedTrips,
})