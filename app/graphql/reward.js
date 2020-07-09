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
