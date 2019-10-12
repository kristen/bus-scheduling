import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Store} from "redux";
import {RootState} from "./reducers";
import App from "./App";

interface Props {
    store: Store<RootState>;
}

const Root: React.FC<Props> = props => {
    return (
        <Provider store={props.store}>
            <App />
        </Provider>
    )
};

ReactDOM.render(
    <Root store={configureStore()}/>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
