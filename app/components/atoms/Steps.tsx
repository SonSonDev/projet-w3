import React, { useState } from 'react';
import { View } from 'react-native';

import * as s from '../../styles/index'

interface StepsInterface {
  length: number;
  currentStep: number;
}

const Steps = ({ length, currentStep }: StepsInterface): React.ReactElement => {
  
  return (
    <View style={{display: 'flex', flexDirection: 'row'}}>
      {new Array(length).fill(true).map((el, i)=>{
        return <View style={[{height:4, width:24, marginRight: 8, borderRadius: 1, backgroundColor:s.c.p100, opacity: i >= currentStep ? 0.3 : 1}]}></View>
      })}
    </View>
  )
}

export default Steps;
