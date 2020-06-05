import React, { useState } from 'react';
import { TextInput } from 'react-native';

const Input = (): React.ReactElement => {
  const [borderColor, setBorderColor] = useState('#E4E6E6');

  const onFocus = () => {
    setBorderColor('#181B1B');
  }

  const onBlur= () => {
    setBorderColor('#E4E6E6');
  }

  return (
    <TextInput style={{
      height: 56,
      // width: 'calc(100% - 48px)',
      backgroundColor: '#FFFFFF',
      borderRadius: 4,
      borderColor: borderColor,
      borderWidth: 1,
      paddingLeft: 16,
      fontSize: 16
    }} onFocus={onFocus} onBlur={onBlur} underlineColorAndroid='transparent'>
    </TextInput>
  )
}

export default Input;
