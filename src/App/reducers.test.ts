import {changeBus, selectTrip} from "./actions";
import {groupedTrips} from "./reducers";
import {GroupedTrips} from "./selectors";


describe('bus schedule reducer', () => {
    describe('#groupedTrips', () => {
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
        describe('when action selectTrip', () => {
            it('toggles the selected trip', () => {
                const busId = "1";
                const tripId = 1;
                const action = selectTrip(busId, tripId);
                const updatedTrips = initialGroupedTrips[busId].map(trip => {
                    if (trip.id === tripId) {
                        return {...trip, selected: true};
                    }
                    return trip;
                });
                const expected = {...initialGroupedTrips, [busId]: updatedTrips, "10": [] };
                const result = groupedTrips(initialGroupedTrips, action);
                expect(result).toEqual(expected);
                const toggleResult = groupedTrips(result, action);
                expect(toggleResult).toEqual({...initialGroupedTrips, "10": [] });
            });
            it('updates the other trips to not selected', () => {
                const selectedBusId = "1";
                const tripId = 1;
                const action = selectTrip(selectedBusId, tripId);
                const initialState = Object.keys(initialGroupedTrips)
                    .reduce((acc, busId) => {
                        const initialBus = initialGroupedTrips[busId];
                        acc[busId] = initialBus.map(trip => {
                            if (trip.id !== tripId) {
                                // all other trips are selected
                                return {...trip, selected: true}
                            }
                            return trip;
                        });
                        return acc;
                    }, {} as GroupedTrips);
                const expectedBus =  initialGroupedTrips[selectedBusId].map(trip => {
                    if (trip.id === tripId) {
                        return {...trip, selected: true};
                    }
                    return trip;
                });
                const expected = {...initialGroupedTrips, [selectedBusId]: expectedBus, "10": [] };
                const result = groupedTrips(initialState, action);
                expect(result).toEqual(expected);
            });
            it('adds a new bus', () => {
                const busId = "1";
                const tripId = 1;
                const action = selectTrip(busId, tripId);
                const result = groupedTrips(initialGroupedTrips, action);
                expect(result["10"]).toEqual([]);
            });
        });
        describe('when action changeBus', () => {
            const createInitialState = (busId: string, tripId: number) => {
                const updatedBus = initialGroupedTrips[busId].map(trip => {
                    if (trip.id === tripId) {
                        return {...trip, selected: true};
                    }
                    return trip;
                });
                return {...initialGroupedTrips, [busId]: updatedBus};
            };
            it('moves trip to specified bus', () => {
                const tripId = 3;
                const currentBusId = tripId.toString();
                const toBusId = "1";
                const action = changeBus(toBusId);
                const tripToMove = initialGroupedTrips[currentBusId].find(trip => trip.id === tripId);
                const toBus = initialGroupedTrips[toBusId];
                const updatedBus = tripToMove ? [...toBus, tripToMove] : toBus;
                const initialState = createInitialState(currentBusId, tripId);
                const result = groupedTrips(initialState, action);
                expect(result[toBusId]).toEqual(updatedBus);
            });
            it('resets selected bus to not selected', () => {
                const tripId = 3;
                const currentBusId = tripId.toString();
                const toBusId = "1";
                const action = changeBus(toBusId);
                const initialState = createInitialState(currentBusId, tripId);
                const result = groupedTrips(initialState, action);
                const previouslySelectedTrip = result[toBusId]
                    .find(trip => trip.id === tripId);
                expect(previouslySelectedTrip).toEqual({...previouslySelectedTrip, selected: false });
            });
            it('does not move trip when a trip overlaps start and end time', () => {
                const tripId = 4;
                const busId = "1";
                const action = changeBus(busId);
                const initialState = createInitialState(busId, tripId);
                const result = groupedTrips(initialState, action);
                expect(result).toEqual(initialGroupedTrips);
            });
            it('removes any empty bus routes', () => {
                const tripId = 3;
                const currentBusId = tripId.toString();
                const busId = "1";
                const action = changeBus(busId);
                const initialState = {...createInitialState(currentBusId, tripId), "10": []};
                const result = groupedTrips(initialState, action);
                expect(result[currentBusId]).toEqual(undefined);
                expect(result["10"]).toEqual(undefined);
            });
            it('moves a trip to the provisioned bus route', () => {
                const tripId = 7;
                const currentBusId = tripId.toString();
                const busId = "10";
                const action = changeBus(busId);
                const initialState = createInitialState(currentBusId, tripId);
                const result = groupedTrips(initialState, action);
                const trip = initialState[currentBusId]
                    .find(trip => trip.id === tripId);
                expect(result[busId]).toEqual([{...trip, selected: false}])
            });
        });
    });
});