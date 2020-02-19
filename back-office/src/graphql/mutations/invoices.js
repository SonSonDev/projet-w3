import gql from "graphql-tag"

export const CREATE_STRIPE_INVOICE = gql`
  mutation CreateStripeInvoice ($stripeCustomerId: String!) {
    createStripeInvoice (stripeCustomerId: $stripeCustomerId)
  }
`