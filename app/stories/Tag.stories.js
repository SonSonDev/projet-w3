import React from 'react';
import RoundButton from '../components/atoms/RoundButton';
import Icon from '../components/atoms/Icon'

export default {
  title: 'Tag',
  component: RoundButton,
};

export const Primary = () => (
  <RoundButton backgroundColor="#DAEEE6" icon={<Icon name="leaf-fill" size={20} color="#44A881" />}/>
);