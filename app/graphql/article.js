import gql from "graphql-tag"

const articleFragment = gql`
  fragment ArticleFragment on Article {
    id
    title
    theme
    content
    photo {
      uri
    }
    videoUrl
    quiz {
      question
      choices
      answer
      value
    }
    date
  }
`

export const GET_ARTICLES = gql`
  query GetArticles($where: ArticleInput) {
    getArticles(where: $where) {
      ...ArticleFragment
    }
  }
  ${articleFragment}
`

export const GET_ARTICLE = gql`
  query GetArticle($where: ArticleInputUnique) {
    getArticle(where: $where) {
      ...ArticleFragment
    }
  }
  ${articleFragment}
`

export const CREATE_ARTICLE = gql`
  mutation CreateArticle ($data: ArticleInput) {
    createArticle(data: $data) {
      ...ArticleFragment
    }
  }
  ${articleFragment}
`

export const UPDATE_ARTICLE = gql`
  mutation UpdateArticle ($where: ArticleInputUnique!, $data: ArticleInput!) {
    updateArticle(where: $where, data: $data) {
      ...ArticleFragment
    }
  }
  ${articleFragment}
`

export const DELETE_ARTICLE = gql`
  mutation DeleteArticle ($where: ArticleInputUnique!) {
    deleteArticle(where: $where) {
      id
      title
    }
  }
`
