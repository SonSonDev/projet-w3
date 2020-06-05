import gql from "graphql-tag"

export const CREATE_STRIPE_INVOICE = gql`
  mutation CreateStripeInvoice($stripeCustomerId: String!) {
    createStripeInvoice(stripeCustomerId: $stripeCustomerId) {
      id
      created
      customer
      customer_email
      customer_name
      hosted_invoice_url
      status
      subscription
      total
    }
  }
`

export const GET_STRIPE_INVOICES_BY_COMPANY = gql`
  query GetStripeInvoicesByCompany($id: ID!) {
    getStripeInvoicesByCompany(id: $id) {
      id
      created
      customer
      customer_email
      customer_name
      hosted_invoice_url
      status
      subscription
      total
    }
  }
`