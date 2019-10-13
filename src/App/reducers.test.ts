import {changeBus, moveTrip, selectTrip} from "./actions";
import {TripDetails, trips} from "./reducers";

const mockTripDetails: TripDetails[] = [
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

describe('#trips', () => {
    describe('when action selectTrip', () => {
        it('toggles the selected trip', () => {
            const tripId = 1;
            const action = selectTrip(tripId);
            const expected = mockTripDetails.map(trip => {
                if (trip.id === tripId) {
                    return {...trip, selected: true};
                }
                return trip;
            });
            const result = trips(mockTripDetails, action);
            expect(result).toEqual(expected);
            const toggleResult = trips(result, action);
            expect(toggleResult).toEqual(mockTripDetails);
        });
        it('updates the other trips to not selected', () => {
            const tripId = 1;
            const action = selectTrip(tripId);
            const initialState = mockTripDetails.map(trip => {
                if (trip.id === tripId + 1) {
                    return {...trip, selected: true};
                }
                return trip;
            });
            const expected = mockTripDetails.map(trip => {
                if (trip.id === tripId) {
                    return {...trip, selected: true};
                }
                return trip;
            });
            const result = trips(initialState, action);
            expect(result).toEqual(expected);
        });
    });
    describe('when action moveTrip', () => {
        it('updates selected to true for the specified trip', () => {
            const tripId = 1;
            const action = moveTrip(tripId);
            const expected = mockTripDetails.map(trip => {
                if (trip.id === tripId) {
                    return {...trip, selected: true};
                }
                return trip;
            });
            const result = trips(mockTripDetails, action);
            expect(result).toEqual(expected);
        });
        it('updates selected to false for all other trips', () => {
            const tripId = 1;
            const action = moveTrip(tripId);
            const result = trips(mockTripDetails, action);
            const allOtherTrips = result.filter(trip => trip.id !== tripId);
            expect(allOtherTrips.every(trip => !trip.selected)).toBe(true)
        })
    });
    describe('when action changeBus', () => {
       it('moves trip to specified bus', () => {
           const tripId = 3;
           const busId = "1";
           const action = changeBus(tripId, busId);
           const expected = mockTripDetails.map(trip => {
               if (trip.id === tripId) {
                   return {...trip, busId}
               }
               return trip;
           });
           const result = trips(mockTripDetails, action);
           expect(result).toEqual(expected);
       });
       it('does not move trip when a trip overlaps start and end time', () => {
           const tripId = 4;
           const busId = "1";
           const action = changeBus(tripId, busId);
           const result = trips(mockTripDetails, action);
           expect(result).toEqual(mockTripDetails);
       });
    });
});
