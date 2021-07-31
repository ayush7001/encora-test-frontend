import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import store from "./store/store";
import App from './App';
import ErrorBoundary from './error-boundary';
const Root = (props) => {
    return <React.Fragment>
            <BrowserRouter>
                <Provider store={store}>
                    <ErrorBoundary>
                        <App />
                    </ErrorBoundary>
                </Provider>
            </BrowserRouter>
    </React.Fragment>
}

export default Root;