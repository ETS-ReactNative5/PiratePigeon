import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';  
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Reducer from './Source/Redux/Reducer/index';
const store = createStore(Reducer, compose(applyMiddleware(thunk)));


const RNRedux = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};
AppRegistry.registerComponent(appName, () => RNRedux);