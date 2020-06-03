import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

interface TabInterface {
  icon?: string | null;
  title: string;
  id: number;
  isActive: boolean;
  cb: any;
}

const Tab = ({ icon, title, id, isActive, cb }: TabInterface): React.ReactElement => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: isActive ? "#F98560" : "#9E9794",
    }
  });

  return (
    <TouchableWithoutFeedback onPress={() => cb(id)}>
      <View style={styles.container}>
        {icon}
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const NavBottom = () => {
  const [isActive, setIsActive] = useState<Number>(0);

  const tabs = [
    { icon: null, title: "Découvrir" },
    { icon: null, title: "Favoris" },
    { icon: null, title: "Points" },
    { icon: null, title: "Profil" },
  ];

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      width: "100%",
      height: 60,
      borderTopWidth: 1,
      borderTopColor: "#E7E5E4",
      marginTop: 5,
    },
  });

  return (
    <View style={styles.container}>
      {tabs.map(({ icon, title }, index) => <Tab id={index} icon={icon} title={title} isActive={index === isActive} cb={setIsActive} key={`navBottom-${index}`} />)}
    </View>
  )
}

export default NavBottom;