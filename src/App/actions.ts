import {ActionType, createStandardAction} from "typesafe-actions";

export const selectTrip = createStandardAction('bus-schedule/SELECT_TRIP').map((id: number) => ({
    payload: {
        tripId: id,
    }
}));

export type BusScheduleActions = ActionType<typeof selectTrip>;
