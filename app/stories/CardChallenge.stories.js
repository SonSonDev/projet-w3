import React from 'react';
import CardChallenge from '../components/organismes/CardChallenge';

export default {
  title: 'CardChallenge',
  component: CardChallenge,
};

export const isToday = () => (
  <CardChallenge isToday>
  </CardChallenge>
);

export const notToday = () => (
  <CardChallenge>
  </CardChallenge>
);