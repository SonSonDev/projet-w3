import gql from "graphql-tag"
import { articleFragment } from './article'

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
