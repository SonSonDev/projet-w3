import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

interface TabInterface {
  icon?: string | null;
  title: string;
  id: number;
  isActive: boolean;
  cb: any;
}

const Tab = ({ title, id, isActive, cb }: TabInterface): React.ReactElement => {
  const styles = StyleSheet.create({
    container: {
      position: "relative",
      top: 2,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      borderBottomColor: isActive ? "#2C463C" : "#9E9794",
      borderBottomWidth: 2,
      boxSizing: "border-box",
    },
    text: {
      color: isActive ? "#2C463C" : "#9E9794",
    }
  });

  return (
    <TouchableWithoutFeedback onPress={() => cb(id)}>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const NavTab = () => {
  const [isActive, setIsActive] = useState<Number>(0);

  const tabs = [
    { title: "Classement" },
    { title: "Historique" },
    { title: "Que gagner ?" },
  ];

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      width: "100%",
      height: 40,
      borderBottomWidth: 1,
      borderBottomColor: "#E7E5E4",
      marginBottom: 5,
    },
  });

  return (
    <View style={styles.container}>
      {tabs.map(({ title }, index) => <Tab id={index} title={title} isActive={index === isActive} cb={setIsActive} key={`navTab-${index}`}/>)}
    </View>
  )
}

export default NavTab;
