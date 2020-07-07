import React, { useState }  from "react";
import { View, ScrollView, Text, Image, FlatList, StatusBar } from "react-native";
import { useQuery, useMutation } from "@apollo/react-hooks"

import * as s from "../styles";
import { GET_ARTICLE, GET_ARTICLES } from "../graphql/article";
import Button from "../components/atoms/Button";
import CardPost from "../components/organismes/CardPost";
import { CardAddressSkeleton } from "../components/organismes/CardAddress";
import CardQuizz from '../components/organismes/CardQuizz.jsx';
import { themes } from '../utils/wording';
import { VALIDATE_QUIZ } from "../graphql/user"
import { CHECK_AUTH } from "../graphql/auth"

export default function Article({ route: { params: { article } }, navigation }) {

  /* Détail de l'article */
  const { theme, title, content, photo } = article

  /* Liste des articles en bas de page */
  const { data: { getArticles = [] } = {} } = useQuery(GET_ARTICLES, {
    onError: (error) => console.log(error.message),
  });
  const hasQuiz = !!article.quiz

  const { data: { checkAuthApp: userData } = {} } = useQuery(CHECK_AUTH)

  const [quizMessage, setQuizMessage] = useState("")

  const [validateQuiz] = useMutation(VALIDATE_QUIZ, {
    async update (cache, { data: { validateQuiz } }) {
      const quiz = validateQuiz.history.find(item => item.originId === article.id)
      setQuizMessage(quiz.bounty ? `Bonne réponse ! ${article.quiz.value} points !` : "Raté")
      client.writeData({
        query: CHECK_AUTH,
        data: { checkAuthApp: validateQuiz },
      })
    },
    onError: error => console.log(error.message),
  })

  const [answerList, setAnswerList] = article.quiz ? useState(article.quiz.choices.map(choice => ({
    label: choice,
    selected: false,
  }))) : []

  const updateState = (index) => {
    const newList = [...answerList]
    newList[index].selected = !answerList[index].selected
    if (answerList[index].selected) {
      newList.map((item, i) => {
        if (i !== index) {
          item.selected = false
        }
        return item
      })
    }
    setAnswerList(newList)
  }

  const isAnswered = userData?.history?.find(item => item.originId === article.id) || false

  const onSubmitQuiz = () => {
    const choice = answerList.find(item => item.selected)?.label
    if (choice && !isAnswered) {
      validateQuiz({
        variables: {
          articleId: article.id,
          answer: choice,
        }
      })
    }
  }

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

      {/* Section QUIZ */}
      {hasQuiz && 
        <View style={[s.px2, s.py3, s.mb3]}>
          <CardQuizz onSubmit={onSubmitQuiz}
                     isAnswered={isAnswered}
                     updateState={updateState}
                     question={article.quiz.question}
                     answerList={answerList}
                     answer={article.quiz.answer}
                     quizMessage={quizMessage}
          />
        </View>
      }

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
