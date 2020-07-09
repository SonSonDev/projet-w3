import gql from "graphql-tag"

export const rewardFragment = gql`
  fragment RewardFragment on Reward {
    id
    type
    value
    article
    winners
  }
`

export const GET_REWARDS = gql`
  query GetRewards {
    getRewards {
      ...RewardFragment
    }
  }
  ${rewardFragment}
`