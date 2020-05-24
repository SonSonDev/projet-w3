import gql from "graphql-tag"

export const GET_ARTICLE = gql`
  query GetArticle ($id: ID!) {
    getArticle(id: $id) {
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

export const GET_ARTICLES = gql`
  query GetArticles {
    getArticles {
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
