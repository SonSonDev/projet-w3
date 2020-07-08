import React, { useState, useRef } from 'react'
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native'

import Icon from "../../components/atoms/Icon"
import * as s from '../../styles'


export default function TagList ({ tags, setTags }) {
  const scrollViewRef = useRef(null)
  
  return (
    <ScrollView
      style={[ s.row, s.mb05, s.pb1 ]}
      contentContainerStyle={[ s.px2 ]}
      horizontal
      showsHorizontalScrollIndicator={false}
      ref={scrollViewRef}
      // onContentSizeChange={() => scrollViewRef.current.scrollToEnd()}
    >
      {Object.entries(tags).map(([ parent, children ]) => (
        children.map(label => (
          <TouchableOpacity
            style={[ s.row, s.itemsCenter, s.mr05, s.mb05, s.round2, s.backgroundPrimary, s.pl1 ]}
            onPress={() => setTags({ ...tags, [parent]: tags[parent].filter(tag => tag !== label) })}
            activeOpacity={1}
            key={label}
          >
            <Text style={[ s.body2, s.white ]}>{label}</Text>
            <View style={[ s.p1, s.pl05 ]}>
              <Icon name='close-line' size={16} color='white' />
            </View>
          </TouchableOpacity>
        ))
      ))}
    </ScrollView>
  )
}