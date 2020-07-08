import React, { useState, useRef }  from "react";
import { View, ScrollView, Text, Image, FlatList, StatusBar, Animated } from "react-native";
import { useQuery, useMutation } from "@apollo/react-hooks"
import { useApolloClient } from "@apollo/react-hooks"

import * as s from "../styles";
import { GET_ARTICLE, GET_ARTICLES } from "../graphql/article";
import Button from "../components/atoms/Button";
import CardPost from "../components/organismes/CardPost";
import { CardAddressSkeleton } from "../components/organismes/CardAddress";
import CardQuizz from '../components/organismes/CardQuizz.jsx';
import { themes } from '../utils/wording';
import { VALIDATE_QUIZ } from "../graphql/user"
import { CHECK_AUTH } from "../graphql/auth"


let started = false

export default function Article({ route: { params: { article } }, navigation }) {
  const client = useApolloClient()

  /* Détail de l'article */
  const { id, theme, title, content, photo } = article

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
      setQuizMessage(quiz.bounty ? `Bonne réponse ! ${quiz.bounty} points !` : "Dommage ! Mauvaise réponse.")
      client.writeData({ data: {
        toast: quiz.bounty
          ? `SUCCESS::Bonne réponse ! Tu gagnes __${quiz.bounty} points__ dans ta cagnotte de la semaine !::${Date.now()}`
          : `FAIL::Mauvaise réponse ! Continue de lire le blog et retente ta chance::${Date.now()}`
      } })
      // client.writeData({
      //   query: CHECK_AUTH,
      //   data: { checkAuthApp: validateQuiz },
      // })
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

  const animated = useRef(new Animated.Value(-100 - s.s2)).current

  return (
    <View style={[ s.backgroundPale, s.flex ]}>
      <StatusBar hidden animated />
      <Image source={photo} style={[ s.absolute, s.fill, { height: 300 }]} />

      <View style={[ s.absolute, s.p1, { zIndex: 3 } ]}>
        <Button btnStyle="icon" iconName="arrow-left-line" onPress={navigation.goBack} />
      </View>
      <Animated.View style={[ s.absolute, s.pt2, s.left, s.right, s.backgroundWhite, s.pb1, s.px4, s.borderBottom, { zIndex: 2 },
        { transform: [
          { translateY: animated }
        ] }
      ]}>
        <Animated.Text style={[ s.heading6, s.center, s.pt2, s.pb1, {  }, { 
        } ]} numberOfLines={1}>{title}</Animated.Text>
      </Animated.View>
      
      <ScrollView
        style={[]}
        contentContainerStyle={[ { paddingTop: 220 } ]}
        onScroll={({ nativeEvent: { contentOffset: { y } } }) => {
          if (started) return
          // console.log(y)
          if (y <= 200) {
            started = true
            Animated.spring(animated, {
              toValue: -100 - s.s2,
              useNativeDriver: true,
            }).start(() => started = false)
          } else {
            started = true
            Animated.spring(animated, {
              toValue: -s.s2,
              useNativeDriver: true,
            }).start(() => started = false)
          }
        }}
        scrollEventThrottle={100}
      >
        <View
          style={[s.px2, s.py3, s.roundTop3, s.backgroundPale, { marginTop: -16 }]}
        >
          <Text style={[s.body2, s.mb1]}>{themes[theme]}</Text>
          <Text style={[s.heading1, s.mb3]}>{title}</Text>
          <Text style={[s.body1, s.mb1]}>{content}</Text>
        </View>
  
        {/* Section QUIZ */}
        {hasQuiz && 
          <View style={[s.px2, s.pb3, s.backgroundPale]}>
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
        <View style={[ s.backgroundPale ]}>
          <Text style={[s.heading5, s.px2]}>Articles similaires</Text>
          <View>
            <FlatList
              style={[ s.mb4 ]}
              contentContainerStyle={[s.px2, s.py1]}
              data={getArticles.filter(a => a.id !== id)}
              renderItem={({ item: article, index }) => (
                <CardPost
                  {...article}
                  small
                  onPress={() => {
                    navigation.replace("Article", { article });
                  }}
                />
              )}
              ItemSeparatorComponent={() => <View style={[s.mr2]} />}
              ListEmptyComponent={() => <CardAddressSkeleton />}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
