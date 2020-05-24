import gql from "graphql-tag"


export const CREATE_ARTICLE = gql`
  mutation createArticle (
    $title: String!
    $content: String!
    $quizQuestion: String!
    $quizAnswer: String!
    $quizChoices: [String!]!
    $quizValue: Int!
  ) {
    createArticle(
      title: $title,
      content: $content,
      quizQuestion: $quizQuestion,
      quizAnswer: $quizAnswer,
      quizChoices: $quizChoices,
      quizValue: $quizValue
    ) {
      id
      title
      content
      picture
      video
      quiz {
        question
        choices
        answer
        value
      }
      date
    }
  }
`

export const UPDATE_ARTICLE = gql`
  mutation updateArticle (
    $id: ID!
    $title: String!
    $content: String!
    $quizQuestion: String!
    $quizAnswer: String!
    $quizChoices: [String!]
    $quizValue: Int!
  ) {
    updateArticle(
      id: $id,
      title: $title,
      content: $content,
      quizQuestion: $quizQuestion,
      quizAnswer: $quizAnswer,
      quizChoices: $quizChoices,
      quizValue: $quizValue
    ) {
      id
      title
      content
      picture
      video
      quiz {
        question
        choices
        answer
        value
      }
      date
    }
  }
`

export const DELETE_ARTICLE = gql`
  mutation DeleteArticle ($id: ID!) {
    deleteArticle(id: $id) {
      id
      title
    }
  }
`
