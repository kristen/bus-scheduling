import {ActionType, createStandardAction} from "typesafe-actions";

export const selectTrip = createStandardAction('bus-schedule/SELECT_TRIP')
    .map((tripId: number) => ({
        payload: {
            tripId,
        }
    }));

export const moveTrip = createStandardAction('bus-schedule/MOVE_TRIP')
    .map((tripId: number) => ({
        payload: {
            tripId,
        }
    }));

export const changeBus = createStandardAction('bus-schedule/CHANGE_BUS')
    .map((tripId: number, busId: string) => ({
        payload: {
            tripId,
            busId,
        }
    }));

export type BusScheduleActions = ActionType<typeof selectTrip | typeof moveTrip | typeof changeBus>;
