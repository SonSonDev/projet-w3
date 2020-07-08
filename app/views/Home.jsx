import React from "react";
import { View, ScrollView, FlatList, Text, TouchableOpacity } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { GET_PLACES } from "../graphql/place";
import { GET_ARTICLES } from "../graphql/article";
import CardAddress, {
  CardAddressSkeleton,
} from "../components/organismes/CardAddress";
import CardPost from "../components/organismes/CardPost";
import IllustrationChallenges from "../assets/img/illu-challenges.svg"
import VectChallenges from "../assets/img/vect-challenges.svg"
import * as s from "../styles";
import { CHECK_AUTH } from '../graphql/auth';
import { GET_TAGS } from '../graphql/tag';

/* Page d'accueil */
export default function Home({ navigation }) {

  /* Informations de l'utilisateur */
  const { data: { checkAuthApp: userData } = {} } = useQuery(CHECK_AUTH)

  const { data: { getTags = [] } = {} } = useQuery(GET_TAGS, { variables: { where: { root: true } } })

  /* Liste des adresses à afficher */
  const { data: { getPlaces = [] } = {}, loading, error } = useQuery(
    GET_PLACES,
    {
      skip: !userData?.company.address.location || !getTags.length,
      onError: (error) => console.log(error.message),
      variables: {
        where: {
          category: "FOOD",
          tags: Object.values(
            getTags.reduce((acc, { id, label: parent, children }) => ({ ...acc, [parent]: userData?.tags.filter(tag => children.some(({ label }) => tag === label)) }), {})
          ).filter(t => t?.length).map(label_in => ({ label_in }))
        },
        nearby: {
          coordinates: userData?.company.address.location?.coordinates
        },
      },
    }
  );

  /* Liste des articles à afficher */
  const { data: { getArticles = [] } = {} } = useQuery(GET_ARTICLES, {
    skip: !getPlaces.length,
    onError: (error) => console.log(error.message),
  });

  return (
    <ScrollView style={[s.flex, s.backgroundPale]} stickyHeaderIndices={[0]}>
      <View style={[ s.backgroundPale ]}>
        <Text style={[s.body2, s.px2, s.pt3]}>Bonjour {userData?.firstName}</Text>
        <Text style={[s.heading4, s.px2, s.mb2]}>
          C’est l’heure du déjeuner !
        </Text>
      </View>

      <View style={[ s.row, s.mt2, s.px2, s.mb05, s.itemsEnd ]}>
        <Text style={[s.heading5, s.flex, s.mr1 ]} numberOfLines={1}>
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

      <View style={[ s.flex, s.round3, s.mx2, s.p2, s.mt1, s.mb3, {backgroundColor: '#FBEAE9', overflow: 'hidden'}]}>
        <IllustrationChallenges style={[ s.absolute, {bottom: -48, right: -32}]} />
        <VectChallenges style={[s.absolute, s.bottom, s.left]} />
        <Text style={[s.heading2, {color:'#B4543A'}]}>Faites du tri</Text>
        <Text style={[s.mt05, s.mb2, s.body2, {width: '60%'}]}>Débarassez-vous du superflu en adoptant des méthodes de tri responsables</Text>
        <TouchableOpacity style={[ s.mtAuto, s.backgroundPrimary, s.px2, s.py1, s.selfStart, s.round2 ]} onPress={() => navigation.navigate('Challenges')} activeOpacity={1}>
          <Text style={[ s.heading6, s.white, s.py05 ]}>Je participe</Text>
        </TouchableOpacity>
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
