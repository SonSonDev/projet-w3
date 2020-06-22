import React, { useState } from 'react';
import { View } from 'react-native';

import * as s from '../../styles/index'

interface StepsInterface {
  length: number;
  currentStep: number;
}

const Steps = ({ length, currentStep, style }: StepsInterface): React.ReactElement => {
  
  return (
    <View style={[ s.row, s.justifyCenter, style ]}>
      {new Array(length).fill(true).map((el, i)=>{
        return <View style={[{ height: 4, width: 24, borderRadius: 1, backgroundColor:s.c.p100, opacity: i >= currentStep ? 0.3 : 1}, i !== length-1 && { marginRight: 8 } ]} key={i}></View>
      })}
    </View>
  )
}

export default Steps;
