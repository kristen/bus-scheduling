import {ActionType, createStandardAction} from "typesafe-actions";

export const selectTrip = createStandardAction('bus-schedule/SELECT_TRIP')
    .map((tripId: number) => ({
        payload: {
            tripId,
        }
    }));

export const changeBus = createStandardAction('bus-schedule/CHANGE_BUS')
    .map((busId: string) => ({
        payload: {
            busId,
        }
    }));

export type BusScheduleActions = ActionType<typeof selectTrip | typeof changeBus>;
