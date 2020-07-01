import React from 'react';
import { StyleSheet, View } from 'react-native';

interface SpacerInterface {
  spacing: number;
}

const Spacer = ({ spacing }: SpacerInterface): React.ReactElement => {
  const styles = StyleSheet.create({
    container: {
      marginTop: spacing,
    }
  });

  return (
    <View style={styles.container} />
  )
}

export default Spacer;
