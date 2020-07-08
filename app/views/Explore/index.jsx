import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView, Text, FlatList, Platform, RefreshControl } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useQuery, useMutation } from "@apollo/react-hooks"
import BottomSheet from 'reanimated-bottom-sheet'

import { GET_PLACES, DELETE_PLACE, UPSERT_PLACES } from "../../graphql/place"
import { CHECK_AUTH } from "../../graphql/auth"
import { categories, categoryIcons } from '../../utils/wording'
import { GET_TAGS } from '../../graphql/tag'

import Button from "../../components/atoms/Button"
import Input from "../../components/atoms/Input"
import Icon from "../../components/atoms/Icon"
import CardAddress, { CardAddressSkeleton } from "../../components/organismes/CardAddress"
import TagList from "../../components/organismes/TagList"
import * as s from '../../styles'


export default function Explore ({ navigation }) {
  /* Information de l'utilisateur */
  const { data: { checkAuthApp: userData } = {} } = useQuery(CHECK_AUTH)

  const { data: { getTags = [] } = {} } = useQuery(GET_TAGS, { variables: { where: { root: true } } })

  const [ category, setCategory ] = useState('FOOD')
  const [ tags, setTags ] = useState(getTags.reduce((acc, { id, label: parent, children }) => ({ ...acc, [parent]: userData?.tags.filter(tag => children.some(({ label }) => tag === label)) }), {}))

  /* Information de la liste d'adresses */
  const { data: { getPlaces = [] } = {}, loading, error } = useQuery(GET_PLACES, {
    skip: !userData?.company.address.location || !getTags.length,
    onError: error => console.log(error.message),
    variables: {
      where: {
        category,
        tags: Object.values(tags).filter(t => t.length).map(label_in => ({ label_in })),
      },
      nearby: {
        coordinates: userData?.company.address.location?.coordinates,
      }
    },
  })

  const allTags = category
    ? getTags.filter(t => t.category === category).filter(({ label }) => label !== 'Engagements')
    : getTags.slice(0, 2)

  return (
    <View style={[ s.flex, s.backgroundPale ]}>
      <FlatList
        ListHeaderComponent={() => (
          <View style={[ s.backgroundPale, s.p2, s.pt3 ]}>
            <Text style={[ s.body2, s.grey ]}>Adresses</Text>
            <Text style={[ s.heading4 ]} numberOfLines={1}>
              À proximité de <Text style={[ s.primary ]}>{userData?.company.name}</Text>
            </Text>
          </View>
        )}
        stickyHeaderIndices={[0]}
        data={loading ? [] : getPlaces}
        renderItem={({ item, index }) => (
          <>
            {!index && <TagList tags={tags} setTags={setTags} />}
            <CardAddress full place={item} style={[ s.mx2, s.mb2 ]} onPress={() => navigation.navigate('Place', { place: item })} />
          </>
        )}
        ListEmptyComponent={() => (
          <>
            <TagList tags={tags} setTags={setTags} />
            {loading
              ? <CardAddressSkeleton full style={[ s.mx2 ]} />
              : <View style={[ s.mx2, s.backgroundWhite, s.p2, s.py3, s.round3 ]}>
                  <Text style={[ s.body1, s.grey, s.center ]}>Aucune adresse trouvée.</Text>
                  <Text style={[ s.body1, s.grey, s.center ]}>Réessayez avec d’autres filtres !</Text>
                </View>}
          </>
        )}
        ListFooterComponent={() => <View style={[ { height: 80 } ]} />}
        keyExtractor={item => item.id}
      />
      <BottomSheet
        snapPoints={[400, 54]}
        initialSnap={1}
        renderHeader={() => (
          <View style={[ s.backgroundWhite, s.pt1, { borderTopLeftRadius: 16, borderTopRightRadius: 16 } ]}>
            <View style={[ s.backgroundBlack, { width: 32, height: 2 }, s.round1, s.selfCenter ]} />
            <ScrollView horizontal style={[ s.py1, { borderBottomWidth: 1, borderColor: s.c.bg } ]} contentContainerStyle={[ s.px2 ]} scrollEnabled={true} showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={[ s.row, s.itemsCenter, s.my05 ]} onPress={() => setTags({}) || setCategory()} activeOpacity={1}>
                <Text style={[ s.body1, s.bold, !category && s.primary, s.mr2 ]}>Tout</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[ s.row, s.itemsCenter, s.my05 ]} onPress={() => setTags({}) || setCategory('FOOD')} activeOpacity={1}>
                <Icon name={categoryIcons['FOOD']} size={16} color={category === 'FOOD' ? s.primary.color : s.black.color} style={[ s.mr05 ]} />
                <Text style={[ s.body1, s.bold, category === 'FOOD' && s.primary, s.mr2 ]}>{categories['FOOD']}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[ s.row, s.itemsCenter, s.my05 ]} onPress={() => setTags({}) || setCategory('SHOP')} activeOpacity={1}>
                <Icon name={categoryIcons['SHOP']} size={16} color={category === 'SHOP' ? s.primary.color : s.black.color} style={[ s.mr05 ]} />
                <Text style={[ s.body1, s.bold, category === 'SHOP' && s.primary, s.mr2 ]}>{categories['SHOP']}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[ s.row, s.itemsCenter, s.my05 ]} onPress={() => setTags({}) || setCategory('ACTIVITY')} activeOpacity={1}>
                <Icon name={categoryIcons['ACTIVITY']} size={16} color={category === 'ACTIVITY' ? s.primary.color : s.black.color} style={[ s.mr05 ]} />
                <Text style={[ s.body1, s.bold, category === 'ACTIVITY' && s.primary ]}>{categories['ACTIVITY']}</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
        renderContent={() => (
          <View style={[ s.backgroundWhite, { minHeight: 348 } ]}>
            {allTags.map(({ id, label: parent, children }) => (
              <View key={id} style={[ s.p2, s.borderBottom, { borderColor: s.c.bg } ]}>
                <Text style={[ s.body2, s.bold, s.mb1 ]}>{parent}</Text>
                <View style={[ s.row, { flexWrap: 'wrap' } ]}>
                  {children.map(({ id, label }) => (
                    <TouchableOpacity
                      style={[
                        s.border, s.px2, s.py1, s.mr05, s.mb05, s.round2,
                        tags[parent]?.includes(label) && [ s.backgroundPrimary, { borderColor: s.primary.color } ],
                      ]}
                      activeOpacity={1} key={id}
                      onPress={() => setTags({
                        ...tags,
                        [parent]: tags[parent]?.includes(label)
                          ? tags[parent].filter(tag => tag !== label)
                          : [ ...tags[parent] || [], label ],
                      })}
                    >
                      <Text style={[ s.body1, s.bold, tags[parent]?.includes(label) ? s.white : s.grey ]}>{label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  )
}
