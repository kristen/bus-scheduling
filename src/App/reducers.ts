import * as actions from "./actions";
import {BusScheduleActions} from "./actions";
import {getType} from "typesafe-actions";
import {combineReducers} from "redux";
import {GroupedTrips} from "./selectors";

export interface BusSchedule {
    groupedTrips: GroupedTrips;
}

export interface TripDetails {
    id: number;
    startTime: number;
    endTime: number;
    selected: boolean;
}

const initialGroupedTrips: GroupedTrips = [
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
    acc[trip.id] = [{...trip, selected: false}];
    return acc;
}, {} as GroupedTrips);

const selectTripForBus = (state: GroupedTrips, busId: string, tripId: number): GroupedTrips => {
    const {updatedState, isTripSelected} = Object.keys(state).reduce((acc, busId) => {
        acc.updatedState[busId] = state[busId].map(trip => {
            if (trip.id === tripId) {
                return {...trip, selected: !trip.selected};
            }
            return {...trip, selected: false};
        });
        if (!acc.isTripSelected) {
            acc.isTripSelected = acc.updatedState[busId].some(trip => trip.selected)
        }
        return acc;
    }, { updatedState: {} as GroupedTrips, isTripSelected: false });
    if (isTripSelected) {
        // if a trip is selected, add another bus route
        const busIds = Object.keys(state).map(busId => parseInt(busId)).sort((a, b) => a - b);
        const largestBusId = busIds[busIds.length - 1];
        const provisionedBusId = (largestBusId ? largestBusId : 0) + 1;
        return {...updatedState, [provisionedBusId]: [] };
    } else {
        return {...updatedState };
    }
};

const changeToBus = (state: GroupedTrips, toBusId: string): GroupedTrips => {
    const tripsOnBus = state[toBusId] || [];
    const {currentBusId, selectedTrip, canMoveTrip} = Object.keys(state)
        .reduce<{currentBusId: string|undefined, selectedTrip: TripDetails|undefined, canMoveTrip: boolean}>((acc, busId) => {
        const selectedTrip = state[busId].find(trip => trip.selected);
        if (selectedTrip) {
            const canMoveTrip = tripsOnBus.every(({startTime, endTime}) => {
                return selectedTrip.startTime > endTime || selectedTrip.endTime < startTime;
            });
            return { currentBusId: busId, selectedTrip, canMoveTrip };
        }
        return acc;
    }, {currentBusId: undefined, selectedTrip: undefined, canMoveTrip: false});

    if (currentBusId && selectedTrip && canMoveTrip) {
        // make sure trip doesn't collide with trip already on bus
        const updatedTrip = {...selectedTrip, selected: false };
        const updatedToBus = [...tripsOnBus, updatedTrip];
        const updatedCurrentBus = state[currentBusId].filter(trip => trip.id !== selectedTrip.id);
        return Object.keys(state).reduce((acc, busId) => {
            if (busId === currentBusId) {
                if (updatedCurrentBus.length) {
                    acc[busId] = updatedCurrentBus;
                }
            } else if (busId !== toBusId && state[busId].length) {
                acc[busId] = state[busId];
            }
            return acc;
        }, {[toBusId]: updatedToBus} as GroupedTrips);
    } else {
        return state;
    }
};

export const groupedTrips = (state: GroupedTrips = initialGroupedTrips, action: BusScheduleActions): GroupedTrips => {
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