import {changeBus, selectTrip} from "./actions";
import {groupedTrips, TripDetails} from "./reducers";


describe('bus schedule reducer', () => {
    describe('#groupedTrips', () => {
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
            acc.push([{...trip, selected: false}]);
            return acc;
        }, [] as TripDetails[][]);
        describe('when action selectTrip', () => {
            it('toggles the selected trip', () => {
                const busId = 1;
                const tripId = 1;
                const action = selectTrip(busId, tripId);
                const expected: TripDetails[][] = [...initialGroupedTrips, []].map(schedule => schedule.map(trip => {
                    if (trip.id === tripId) {
                        return {...trip, selected: true};
                    }
                    return trip;
                }));
                const result = groupedTrips(initialGroupedTrips, action);
                expect(result).toEqual(expected);
            });
            it('updates the other trips to not selected', () => {
                const selectedBusId = 1;
                const tripId = 1;
                const action = selectTrip(selectedBusId, tripId);
                const initialState = [...initialGroupedTrips, []].map(schedule => schedule.map(trip => {
                    if (trip.id !== tripId) {
                        return {...trip, selected: true};
                    }
                    return trip;
                }));
                const expected = [...initialGroupedTrips, []].map(schedule => schedule.map(trip => {
                    if (trip.id === tripId) {
                        return {...trip, selected: true};
                    }
                    return trip;
                }));
                const result = groupedTrips(initialState, action);
                expect(result).toEqual(expected);
            });
            it('adds a new bus', () => {
                const busId = 1;
                const tripId = 1;
                const action = selectTrip(busId, tripId);
                const result = groupedTrips(initialGroupedTrips, action);
                expect(result.length).toEqual(initialGroupedTrips.length + 1);
            });
        });
        describe('when action changeBus', () => {
            const preSelectTrip = (tripId: number) => {
                return [...initialGroupedTrips].map(schedule => [...schedule.map(trip => {
                    if (trip.id === tripId) {
                        return {...trip, selected: true};
                    }
                    return trip;
                })]);
            };
            it('moves trip to specified bus', () => {
                const tripId = 3;
                const toBusId = 0;
                const action = changeBus(toBusId);
                const tripToMove = initialGroupedTrips[tripId-1].find(trip => trip.id === tripId);
                const toBus = initialGroupedTrips[toBusId];
                const updatedBus = tripToMove ? [...toBus, tripToMove] : toBus;
                const initialState = preSelectTrip(tripId);
                const result = groupedTrips(initialState, action);
                expect(result[toBusId]).toEqual(updatedBus);
                expect(result.length).toEqual(initialState.length - 1);
            });
            it('resets selected bus to not selected', () => {
                const tripId = 3;
                const toBusId = 0;
                const action = changeBus(toBusId);
                const initialState = preSelectTrip(tripId);
                const previouslySelectedTrip = initialState[tripId-1]
                    .find(trip => trip.id === tripId);
                const result = groupedTrips(initialState, action);
                const updatedTrip = result[toBusId]
                    .find(trip => trip.id === tripId);
                expect(updatedTrip).toEqual({...previouslySelectedTrip, selected: false });
            });
            it('does not move trip when a trip overlaps start and end time', () => {
                const tripId = 4;
                const busId = 0;
                const action = changeBus(busId);
                const initialState = preSelectTrip(tripId);
                const result = groupedTrips(initialState, action);
                expect(result).toEqual(initialGroupedTrips);
            });
            it('removes any empty bus routes', () => {
                const tripId = 3;
                const busId = 0;
                const action = changeBus(busId);
                const initialState = [...preSelectTrip(tripId), []];
                expect(initialState.length).toEqual(10);
                const result = groupedTrips(initialState, action);
                expect(result.length).toEqual(initialState.length - 2);
                expect(result.every(schedule => schedule.length)).toEqual(true);
            });
            it('moves a trip to the provisioned bus route', () => {
                const tripId = 7;
                const busId = 9;
                const action = changeBus(busId);
                const initialState = [...preSelectTrip(tripId), []];
                const result = groupedTrips(initialState, action);
                const trip = initialState[tripId-1].find(trip => trip.id === tripId);
                expect(result[result.length-1]).toEqual([{...trip, selected: false}])
            });
        });
    });
});