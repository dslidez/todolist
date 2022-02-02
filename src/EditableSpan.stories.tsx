import React from "react";
import {action} from '@storybook/addon-actions'
import { EditableSpan } from './EditableSpan';

export default {
  title: "EditableSpan Component",
  component: EditableSpan,
};

const changeCallback =  action("value changed")

export const EditableSpanFormExample = () => {
  return <>
  <EditableSpan title={'Start Vaule'} onChange={changeCallback} />
</>
};
