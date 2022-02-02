import { Provider } from 'react-redux';
import { store } from './../state/store';
import React from "react";


export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return (
        <Provider store={store}>
            {storyFn()}
        </Provider>
    )
}