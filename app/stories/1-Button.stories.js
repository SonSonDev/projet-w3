import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from '../components/atoms/Button';

export default {
  title: 'Button',
  component: Button,
};

export const Primary = () => (
  <Button btnStyle='primary' label='Bonjour' >
  </Button>
);

export const Secondary = () => (
  <Button btnStyle='secondary' label='Je suis le deux' >
  </Button>
);

export const Icon = () => (
  <Button btnStyle='icon' >
  </Button>
);