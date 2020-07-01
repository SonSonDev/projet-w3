import React from "react";
import { View, ScrollView, Text, Image, FlatList, StatusBar } from "react-native";
import * as s from "../styles";
import { useQuery } from "@apollo/react-hooks";
import { GET_ARTICLE, GET_ARTICLES } from "../graphql/article";
import Button from "../components/atoms/Button";
import CardPost from "../components/organismes/CardPost";
import { CardAddressSkeleton } from "../components/organismes/CardAddress";
import { themes } from '../utils/wording';

export default function Article({ route: { params: { article } }, navigation }) {
  // const {
  //   data: { getArticle: { theme, title, content, photo } = {} } = {},
  // } = useQuery(GET_ARTICLE, {
  //   variables: { where: { id } },
  // });
  const { theme, title, content, photo } = article

  const { data: { getArticles = [] } = {} } = useQuery(GET_ARTICLES, {
    onError: (error) => console.log(error.message),
  });

  return (
    <ScrollView style={[s.flex, s.backgroundPale]}>
      <StatusBar hidden animated />
      <Image style={[s.p0]} source={photo} style={{ height: 308 }} />
      <View style={[ s.absolute, s.p2, { paddingTop: s.s2, zIndex: 2 } ]}>
        <Button
          btnStyle="icon"
          iconName="arrow-left-line"
          onPress={navigation.goBack}
        />
      </View>
      <View
        style={[s.px2, s.py3, s.round3, s.backgroundPale, { marginTop: -16 }]}
      >
        <Text style={[s.body2, s.mb1]}>{themes[theme]}</Text>
        <Text style={[s.heading1, s.mb3]}>{title}</Text>
        <Text style={[s.body1, s.mb1]}>{content}</Text>
      </View>
      <Text style={[s.heading5, s.px2]}>Articles similaires</Text>
      <View>
        <FlatList
          style={[ s.mb3 ]}
          contentContainerStyle={[s.px2, s.py1]}
          data={getArticles}
          renderItem={({ item: { title, theme, photo, id }, index }) => (
            <CardPost
              title={title}
              theme={theme}
              photo={photo}
              small
              onPress={() => {
                navigation.navigate("Article", { id });
              }}
            />
          )}
          ItemSeparatorComponent={() => <View style={[s.mr2]} />}
          ListEmptyComponent={() => <CardAddressSkeleton />}
          horizontal
        />
      </View>
    </ScrollView>
  );
}
