import React from "react";
import {action} from '@storybook/addon-actions'
import { AppWithRedux } from '../app/AppWithRedux';
import { store } from "../state/store";
import { Provider } from "react-redux";
import { ReduxStoreProviderDecorator } from './ReduxStoreProviderDecorator';

export default {
  title: "AppWithRedux Component",
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator]
};


export const AppWithReduxFormExample = () => {
  return <>
  <AppWithRedux />
</>
};
