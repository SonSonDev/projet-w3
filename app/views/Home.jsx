import React from "react";
import { View, ScrollView, FlatList, Text } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { GET_PLACES } from "../graphql/place";
import { GET_ARTICLES } from "../graphql/article";
import CardAddress, {
  CardAddressSkeleton,
} from "../components/organismes/CardAddress";
import CardPost from "../components/organismes/CardPost";
import * as s from "../styles";
import { CHECK_AUTH } from '../graphql/auth';

export default function Home({ navigation }) {
  const { data: { checkAuthApp: userData } = {} } = useQuery(CHECK_AUTH)
  const { data: { getPlaces = [] } = {}, loading, error } = useQuery(
    GET_PLACES,
    {
      skip: !userData?.company.address.location,
      onError: (error) => console.log(error.message),
      variables: {
        where: { category: "FOOD" },
        nearby: {
          coordinates: userData?.company.address.location?.coordinates
        },
      },
    }
  );

  const { data: { getArticles = [] } = {} } = useQuery(GET_ARTICLES, {
    skip: !getPlaces.length,
    onError: (error) => console.log(error.message),
  });

  return (
    <ScrollView style={[s.flex, s.backgroundPale]} stickyHeaderIndices={[0]}>
      <View style={[ s.backgroundPale ]}>
        <Text style={[s.body2, s.grey, s.px2, s.pt3]}>Bonjour {userData?.firstName}</Text>
        <Text style={[s.heading4, s.px2, s.mb2]}>
          C’est l’heure du déjeuner !
        </Text>
      </View>

      <View style={[ s.row, s.mt2, s.px2, s.mb05, s.itemsEnd ]}>
        <Text style={[s.heading5 ]}>
          À proximité de <Text style={[s.primary]}>{userData?.company.name}</Text>
        </Text>
        <Text style={[s.body1, s.bold, s.mlAuto ]} onPress={() => navigation.navigate('Explore')}>
          Voir tout
        </Text>
      </View>
      <View style={[ s.mb2 ]}>
        <FlatList
          style={[]}
          contentContainerStyle={[s.px2, s.py1]}
          data={getPlaces.slice(0, 5)}
          renderItem={({ item: place, index }) => (
            <CardAddress
              place={place}
              onPress={() => navigation.navigate("Place", { place })}
            />
          )}
          ItemSeparatorComponent={() => <View style={[s.mr2]} />}
          ListEmptyComponent={() => <CardAddressSkeleton />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <Text style={[s.heading5, s.px2, s.mb05]}>
        Le blog de Madu
      </Text>
      <View>
        <FlatList
          style={[]}
          contentContainerStyle={[s.px2, s.py1]}
          data={getArticles}
          renderItem={({ item: article, index }) => (
            <CardPost
              style={[s.mb2]}
              {...article}
              large={!index}
              medium={!!index}
              onPress={() => {
                navigation.navigate("Article", { article });
              }}
            />
          )}
          ItemSeparatorComponent={() => <View style={[s.mr2]} />}
          ListEmptyComponent={() => <CardAddressSkeleton />}
          vertical
        />
      </View>
    </ScrollView>
  );
}
