import React, { useState } from 'react';
import { Text, View, TouchableHighlight, FlatList } from 'react-native';

import * as s from '../../styles/index';

const Radio = ({ filterList, setFilterList, numbColumns, style }) => {

  const updateState = (index) => {
    const newList = [...filterList]
    newList[index].selected = !filterList[index].selected
    if (filterList[index].selected) {
      newList.map((item, i) => {
        if (i !== index) {
          item.selected = false
        }
        return item
      })
    }
    setFilterList(newList)
  }

  return (
    <View style={style}>
      <FlatList
        style={[ ]}
        data={filterList}
        numColumns={numbColumns}
        ItemSeparatorComponent={() => <View style={[ s.pt2 ]}></View>}
        renderItem={({ item, index }) => (
          <TouchableHighlight onPress={() => updateState(index)} underlayColor="transparent" style={[ index % numbColumns !== 0 && s.pl1, s.flex ]}>
            <View style={[ { minHeight: 64, borderColor: '#E8AEA2', borderWidth: item.selected ? 0 : 1, borderRadius: 8, justifyContent: 'center', backgroundColor: item.selected ? '#BA5A40' : 'transparent' }, s.p1, [{paddingLeft:24}] ]}>
              <Text style={{ color: item.selected ? '#FFFFFF' : '#181B1B', fontSize: 16}}>{item.label}</Text>
            </View>
          </TouchableHighlight>
        )}
        keyExtractor={item => item.label}
      />
    </View>
  )
}

export default Radio;
