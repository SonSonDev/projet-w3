import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  FlatList,
  Platform,
} from "react-native";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { GET_PLACES, DELETE_PLACE, UPSERT_PLACES } from "../graphql/place";
import { GET_ARTICLES } from "../graphql/article";

import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";
import CardAddress, {
  CardAddressSkeleton,
} from "../components/organismes/CardAddress";
import CardPost from "../components/organismes/CardPost";
import * as s from "../styles";

export default function Home({ navigation }) {
  const { data: { getPlaces = [] } = {}, loading, error } = useQuery(
    GET_PLACES,
    {
      onError: (error) => console.log(error.message),
      variables: {
        where: { category: "FOOD" },
        nearby: {
          coordinates: [48.8518269, 2.4204598], // HETIC
        },
      },
    }
  );
  // console.log(getPlaces)

  const { data: { getArticles = [] } = {} } = useQuery(GET_ARTICLES, {
    onError: (error) => console.log(error.message),
  });

  console.log("article", getArticles);
  console.log("photo", getArticles[0]?.photo?.uri);

  return (
    <View style={[s.flex, s.backgroundPale]}>
      <Text style={[s.body2, s.grey, s.px2, s.pt3]}>Bonjour Utilisateur</Text>
      <Text style={[s.heading4, s.px2, s.mb2]}>
        C’est l’heure du déjeuner !
      </Text>

      <Text style={[s.heading5, s.px2]}>
        À proximité de <Text style={[s.primary]}>Hetic</Text>
      </Text>
      <View>
        <FlatList
          style={[]}
          contentContainerStyle={[s.px2, s.py1]}
          data={getPlaces.slice(0, 5)}
          renderItem={({ item, index }) => <CardAddress place={item} />}
          ItemSeparatorComponent={() => <View style={[s.mr2]} />}
          ListEmptyComponent={() => <CardAddressSkeleton />}
          horizontal
        />
      </View>
      <View>
        <FlatList
          style={[]}
          contentContainerStyle={[s.px2, s.py1]}
          data={getArticles}
          renderItem={({ item, index }) => (
            <CardPost
              post={item}
              cardStyle="small"
              onPress={() => {
                navigation.navigate("Article", { itemId: id });
              }}
            />
          )}
          ItemSeparatorComponent={() => <View style={[s.mr2]} />}
          ListEmptyComponent={() => <CardAddressSkeleton />}
          vertical
        />
      </View>
      <View style={[ s.px2, s.py1 ]}>
        <CardPost
          title="Parfumer son intérieur sans péter"
          subtitle="Maison"
          photos="https://www.glenat.com/sites/default/files/images/livres/couv/9782344024393-001-T.jpeg"
          large
        />
      </View>
    </View>
  );
}
