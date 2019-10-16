import {ActionType, createStandardAction} from "typesafe-actions";

export const selectTrip = createStandardAction('bus-schedule/SELECT_TRIP')
    .map((busId: number, tripId: number) => ({
        payload: {
            busId,
            tripId,
        }
    }));

export const changeBus = createStandardAction('bus-schedule/CHANGE_BUS')
    .map((busId: number) => ({
        payload: {
            busId,
        }
    }));

export type BusScheduleActions = ActionType<typeof selectTrip | typeof changeBus>;
