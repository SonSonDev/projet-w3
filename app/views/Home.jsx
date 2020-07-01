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

  const { data: { getArticles = [] } = {} } = useQuery(GET_ARTICLES, {
    onError: (error) => console.log(error.message),
  });

  const { data: { getArticles = [] } = {} } = useQuery(GET_ARTICLES, {
    onError: (error) => console.log(error.message),
  });

  console.log("article", getArticles);
  console.log("photo", getArticles[0]?.photo?.uri);

  return (
    <ScrollView style={[s.flex, s.backgroundPale]}>
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
          renderItem={({ item: place, index }) => (
            <CardAddress
              place={place}
              onPress={() => navigation.navigate("Place", { place })}
            />
          )}
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
          renderItem={({ item: { title, theme, photo, id }, index }) => (
            <CardPost
              style={[s.mb2]}
              title={title}
              theme={theme}
              photos={photo}
              large={!index}
              medium={!!index}
              onPress={() => {
                navigation.navigate("Article", { id });
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
