import { combineReducers } from "redux";
import board, {BoardState} from './board/reducers';
import {schedule, TripDetails} from "./App/reducers";

export interface RootState {
    board: BoardState;
    schedule: TripDetails[];
}

export default combineReducers<RootState>({
    board,
    schedule
});
