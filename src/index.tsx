import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { App } from './modules/app/views';
import { RootStoreContext } from './contexts';
import { RootStore } from './stores';
import { CliDriver } from './drivers';

const rootStore = RootStore.make();

CliDriver.make(rootStore);

const element = document.getElementById('root');

if (!element) {
    throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(element);

root.render(
    <React.StrictMode>
        <RootStoreContext.Provider value={rootStore}>
            <App />
        </RootStoreContext.Provider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
