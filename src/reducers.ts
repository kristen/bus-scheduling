import {combineReducers} from "redux";
import {BusSchedule} from "./App/reducers";
import schedule from './App/reducers';

export interface RootState {
    schedule: BusSchedule;
}

export default combineReducers<RootState>({
    schedule,
});
