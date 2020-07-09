import gql from "graphql-tag"

const articleFragment = gql`
  fragment ArticleFragment on Article {
    id
    title
    content
    theme
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

const rewardFragment = gql`
  fragment RewardFragment on Reward {
    id
    type
    value
    article {
      ...ArticleFragment
    }
    winners {
      id
    }
  }
  ${articleFragment}
`

export const GET_REWARDS = gql`
  query GetRewards {
    getRewards {
      ...RewardFragment
    }
  }
  ${rewardFragment}
`

export const GET_REWARD = gql`
  query GetReward($id: ID!) {
    getReward(id: $id) {
      ...RewardFragment
    }
  }
  ${rewardFragment}
`

export const CREATE_REWARD = gql`
  mutation CreateReward (
    $type: RewardType!
    $value: Int!
    $article: ArticleInput!
  ) {
    createReward(
      type: $type
      value: $value
      article: $article
    ) {
      ...RewardFragment
    }
  }
  ${rewardFragment}
`

export const UPDATE_REWARD = gql`
  mutation UpdateReward (
    $id: ID!
    $type: RewardType!
    $value: Int!
    $article: ArticleInput!
  ) {
    updateReward(
      id: $id
      type: $type
      value: $value
      article: $article
    ) {
      ...RewardFragment
    }
  }
  ${rewardFragment}
`

export const DELETE_REWARD = gql`
  mutation DeleteReward (
    $id: ID!
  ) {
    deleteReward(
      id: $id
    ) {
      id
    }
  }
`
