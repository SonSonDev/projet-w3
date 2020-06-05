import React from 'react';
import { action } from '@storybook/addon-actions';
import Steps from '../components/atoms/Steps';

export default {
  title: 'Steps',
  component: Steps,
};

export const Primary = () => (
  <Steps length={3} currentStep={2} >
  </Steps>
);