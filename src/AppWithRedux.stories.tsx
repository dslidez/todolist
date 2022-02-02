import React from "react";
import {action} from '@storybook/addon-actions'
import { AppWithRedux } from './AppWithRedux';
import { store } from "./state/store";
import { Provider } from "react-redux";

export default {
  title: "AppWithRedux Component",
  component: AppWithRedux,
};


export const AppWithReduxFormExample = () => {
  return <>
  <Provider store={store}>
  <AppWithRedux />
  </Provider>
</>
};
