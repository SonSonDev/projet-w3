import React, { useState } from 'react';
import { Text, View, TouchableHighlight, FlatList } from 'react-native';

import * as s from '../../styles/index';

interface FilterInterface {
  filterList: any,
  setFilterList: Function;
  numbColumns: any;
}

const Filter = ({ filterList, setFilterList, numbColumns }: FilterInterface): React.ReactElement => {

  const updateState = (index: number) => {
    const newList = [...filterList]
    newList[index].selected = !filterList[index].selected
    if (filterList[index].selected) {
      newList.map((item: any, i: number) => {
        if (i !== index && (item.isUnique || newList[index].isUnique)) {
          item.selected = false
        }
        return item
      })
    }
    setFilterList(newList)
  }

  return (
    <FlatList
      style={[ s.flex ]}
      data={filterList}
      numColumns={numbColumns}
      ItemSeparatorComponent={() => <View style={[ s.pt1 ]}></View>}
      renderItem={({ item, index }) => (
        <TouchableHighlight onPress={() => updateState(index)} underlayColor="transparent" style={[ index % numbColumns !== 0 && s.pl1, s.flex ]}>
          <View style={[ { minHeight: s.s12, borderColor: '#949E9E', borderWidth: item.selected ? 0 : 1, borderRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: item.selected ? '#BA5A40' : 'transparent' }, s.flex ]}>
            <Text style={{ color: item.selected ? '#FFFFFF' : '#949E9E', fontSize: 16, textAlign: 'center' }}>{item.label}</Text>
          </View>
        </TouchableHighlight>
      )}
      keyExtractor={item => item.label}
    />
  )
}

export default Filter;
