import {applyMiddleware, createStore, Store} from "redux";
import thunk from 'redux-thunk';
import rootReducer, {RootState} from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = (): Store<RootState> => {
    return createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk)),
    )
};

export default configureStore;
