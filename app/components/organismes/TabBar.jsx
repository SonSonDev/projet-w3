import React from "react"
import { View, Text, TouchableOpacity } from 'react-native'

import Icon from '../atoms/Icon'
import * as s from '../../styles'


function TabBar ({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={[ s.shadow1, s.backgroundWhite, s.row, s.justifyCenter, s.p1 ]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const { icon } = options

        return (
          <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={[ s.row, s.justifyCenter, isFocused && { width: 120 } ]}
            key={label}
          >
            <View style={[ s.row, s.justifyCenter, s.itemsCenter, s.py1, s.px2, s.my05, s.mx1, isFocused && s.backgroundPrimaryPale, s.round2, s.overflow ]}>
              <Icon name={icon} size={22} color={isFocused ? s.c.p100 : s.c.g100} />
              {isFocused && (
                <Text style={[ s.body2, s.bold, s.primary, s.ml05 ]}>{label}</Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default TabBar