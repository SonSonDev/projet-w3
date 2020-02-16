module.exports = {
        typeDefs: // Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

/* GraphQL */ `type Address {
  street: String
  zipCode: String
  city: String
}

input AddressCreateInput {
  street: String
  zipCode: String
  city: String
}

input AddressCreateOneInput {
  create: AddressCreateInput
}

input AddressUpdateDataInput {
  street: String
  zipCode: String
  city: String
}

input AddressUpdateOneInput {
  create: AddressCreateInput
  update: AddressUpdateDataInput
  upsert: AddressUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
}

input AddressUpsertNestedInput {
  update: AddressUpdateDataInput!
  create: AddressCreateInput!
}

input AddressWhereInput {
  street: String
  street_not: String
  street_in: [String!]
  street_not_in: [String!]
  street_lt: String
  street_lte: String
  street_gt: String
  street_gte: String
  street_contains: String
  street_not_contains: String
  street_starts_with: String
  street_not_starts_with: String
  street_ends_with: String
  street_not_ends_with: String
  zipCode: String
  zipCode_not: String
  zipCode_in: [String!]
  zipCode_not_in: [String!]
  zipCode_lt: String
  zipCode_lte: String
  zipCode_gt: String
  zipCode_gte: String
  zipCode_contains: String
  zipCode_not_contains: String
  zipCode_starts_with: String
  zipCode_not_starts_with: String
  zipCode_ends_with: String
  zipCode_not_ends_with: String
  city: String
  city_not: String
  city_in: [String!]
  city_not_in: [String!]
  city_lt: String
  city_lte: String
  city_gt: String
  city_gte: String
  city_contains: String
  city_not_contains: String
  city_starts_with: String
  city_not_starts_with: String
  city_ends_with: String
  city_not_ends_with: String
  AND: [AddressWhereInput!]
}

type AggregateCompany {
  count: Int!
}

type AggregatePlace {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

enum Category {
  FOOD
  SHOP
  ACTIVITY
}

type Company {
  id: ID!
  name: String
  type: CompanyType
  address: Address
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
}

type CompanyConnection {
  pageInfo: PageInfo!
  edges: [CompanyEdge]!
  aggregate: AggregateCompany!
}

input CompanyCreateInput {
  id: ID
  name: String
  type: CompanyType
  address: AddressCreateOneInput
  users: UserCreateManyWithoutCompanyInput
}

input CompanyCreateOneWithoutUsersInput {
  create: CompanyCreateWithoutUsersInput
  connect: CompanyWhereUniqueInput
}

input CompanyCreateWithoutUsersInput {
  id: ID
  name: String
  type: CompanyType
  address: AddressCreateOneInput
}

type CompanyEdge {
  node: Company!
  cursor: String!
}

enum CompanyOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  type_ASC
  type_DESC
}

type CompanyPreviousValues {
  id: ID!
  name: String
  type: CompanyType
}

type CompanySubscriptionPayload {
  mutation: MutationType!
  node: Company
  updatedFields: [String!]
  previousValues: CompanyPreviousValues
}

input CompanySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CompanyWhereInput
  AND: [CompanySubscriptionWhereInput!]
}

enum CompanyType {
  COMPANY
  SCHOOL
  PLACE
  COWORKING
}

input CompanyUpdateInput {
  name: String
  type: CompanyType
  address: AddressUpdateOneInput
  users: UserUpdateManyWithoutCompanyInput
}

input CompanyUpdateManyMutationInput {
  name: String
  type: CompanyType
}

input CompanyUpdateOneWithoutUsersInput {
  create: CompanyCreateWithoutUsersInput
  update: CompanyUpdateWithoutUsersDataInput
  upsert: CompanyUpsertWithoutUsersInput
  delete: Boolean
  disconnect: Boolean
  connect: CompanyWhereUniqueInput
}

input CompanyUpdateWithoutUsersDataInput {
  name: String
  type: CompanyType
  address: AddressUpdateOneInput
}

input CompanyUpsertWithoutUsersInput {
  update: CompanyUpdateWithoutUsersDataInput!
  create: CompanyCreateWithoutUsersInput!
}

input CompanyWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  type: CompanyType
  type_not: CompanyType
  type_in: [CompanyType!]
  type_not_in: [CompanyType!]
  address: AddressWhereInput
  users_some: UserWhereInput
  AND: [CompanyWhereInput!]
}

input CompanyWhereUniqueInput {
  id: ID
}

enum Day {
  MONDAY
  TUESDAY
  WEDNESDAY
  THURSDAY
  FRIDAY
  SATURDAY
  SUNDAY
}

type Hour {
  day: Day
  start: String
  end: String
}

input HourCreateInput {
  day: Day
  start: String
  end: String
}

input HourCreateManyInput {
  create: [HourCreateInput!]
}

input HourRestrictedWhereInput {
  day: Day
  day_not: Day
  day_in: [Day!]
  day_not_in: [Day!]
  start: String
  start_not: String
  start_in: [String!]
  start_not_in: [String!]
  start_lt: String
  start_lte: String
  start_gt: String
  start_gte: String
  start_contains: String
  start_not_contains: String
  start_starts_with: String
  start_not_starts_with: String
  start_ends_with: String
  start_not_ends_with: String
  end: String
  end_not: String
  end_in: [String!]
  end_not_in: [String!]
  end_lt: String
  end_lte: String
  end_gt: String
  end_gte: String
  end_contains: String
  end_not_contains: String
  end_starts_with: String
  end_not_starts_with: String
  end_ends_with: String
  end_not_ends_with: String
  AND: [HourRestrictedWhereInput!]
}

input HourScalarWhereInput {
  day: Day
  day_not: Day
  day_in: [Day!]
  day_not_in: [Day!]
  start: String
  start_not: String
  start_in: [String!]
  start_not_in: [String!]
  start_lt: String
  start_lte: String
  start_gt: String
  start_gte: String
  start_contains: String
  start_not_contains: String
  start_starts_with: String
  start_not_starts_with: String
  start_ends_with: String
  start_not_ends_with: String
  end: String
  end_not: String
  end_in: [String!]
  end_not_in: [String!]
  end_lt: String
  end_lte: String
  end_gt: String
  end_gte: String
  end_contains: String
  end_not_contains: String
  end_starts_with: String
  end_not_starts_with: String
  end_ends_with: String
  end_not_ends_with: String
  AND: [HourScalarWhereInput!]
  OR: [HourScalarWhereInput!]
  NOT: [HourScalarWhereInput!]
}

input HourUpdateManyDataInput {
  day: Day
  start: String
  end: String
}

input HourUpdateManyInput {
  create: [HourCreateInput!]
  deleteMany: [HourScalarWhereInput!]
  updateMany: [HourUpdateManyWithWhereNestedInput!]
}

input HourUpdateManyWithWhereNestedInput {
  where: HourScalarWhereInput!
  data: HourUpdateManyDataInput!
}

input HourWhereInput {
  day: Day
  day_not: Day
  day_in: [Day!]
  day_not_in: [Day!]
  start: String
  start_not: String
  start_in: [String!]
  start_not_in: [String!]
  start_lt: String
  start_lte: String
  start_gt: String
  start_gte: String
  start_contains: String
  start_not_contains: String
  start_starts_with: String
  start_not_starts_with: String
  start_ends_with: String
  start_not_ends_with: String
  end: String
  end_not: String
  end_in: [String!]
  end_not_in: [String!]
  end_lt: String
  end_lte: String
  end_gt: String
  end_gte: String
  end_contains: String
  end_not_contains: String
  end_starts_with: String
  end_not_starts_with: String
  end_ends_with: String
  end_not_ends_with: String
  AND: [HourWhereInput!]
}

scalar Long

type Mutation {
  createCompany(data: CompanyCreateInput!): Company!
  updateCompany(data: CompanyUpdateInput!, where: CompanyWhereUniqueInput!): Company
  updateManyCompanies(data: CompanyUpdateManyMutationInput!, where: CompanyWhereInput): BatchPayload!
  upsertCompany(where: CompanyWhereUniqueInput!, create: CompanyCreateInput!, update: CompanyUpdateInput!): Company!
  deleteCompany(where: CompanyWhereUniqueInput!): Company
  deleteManyCompanies(where: CompanyWhereInput): BatchPayload!
  createPlace(data: PlaceCreateInput!): Place!
  updatePlace(data: PlaceUpdateInput!, where: PlaceWhereUniqueInput!): Place
  updateManyPlaces(data: PlaceUpdateManyMutationInput!, where: PlaceWhereInput): BatchPayload!
  upsertPlace(where: PlaceWhereUniqueInput!, create: PlaceCreateInput!, update: PlaceUpdateInput!): Place!
  deletePlace(where: PlaceWhereUniqueInput!): Place
  deleteManyPlaces(where: PlaceWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Place {
  id: ID!
  name: String
  address: Address
  hours: [Hour!]
  keywords: [String!]!
  category: Category
  type: String
}

type PlaceConnection {
  pageInfo: PageInfo!
  edges: [PlaceEdge]!
  aggregate: AggregatePlace!
}

input PlaceCreateInput {
  id: ID
  name: String
  address: AddressCreateOneInput
  hours: HourCreateManyInput
  keywords: PlaceCreatekeywordsInput
  category: Category
  type: String
}

input PlaceCreatekeywordsInput {
  set: [String!]
}

type PlaceEdge {
  node: Place!
  cursor: String!
}

enum PlaceOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  category_ASC
  category_DESC
  type_ASC
  type_DESC
}

type PlacePreviousValues {
  id: ID!
  name: String
  keywords: [String!]!
  category: Category
  type: String
}

type PlaceSubscriptionPayload {
  mutation: MutationType!
  node: Place
  updatedFields: [String!]
  previousValues: PlacePreviousValues
}

input PlaceSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PlaceWhereInput
  AND: [PlaceSubscriptionWhereInput!]
}

input PlaceUpdateInput {
  name: String
  address: AddressUpdateOneInput
  hours: HourUpdateManyInput
  keywords: PlaceUpdatekeywordsInput
  category: Category
  type: String
}

input PlaceUpdatekeywordsInput {
  set: [String!]
}

input PlaceUpdateManyMutationInput {
  name: String
  keywords: PlaceUpdatekeywordsInput
  category: Category
  type: String
}

input PlaceWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  address: AddressWhereInput
  hours_some: HourWhereInput
  hours_every: HourRestrictedWhereInput
  hours_none: HourRestrictedWhereInput
  category: Category
  category_not: Category
  category_in: [Category!]
  category_not_in: [Category!]
  type: String
  type_not: String
  type_in: [String!]
  type_not_in: [String!]
  type_lt: String
  type_lte: String
  type_gt: String
  type_gte: String
  type_contains: String
  type_not_contains: String
  type_starts_with: String
  type_not_starts_with: String
  type_ends_with: String
  type_not_ends_with: String
  AND: [PlaceWhereInput!]
}

input PlaceWhereUniqueInput {
  id: ID
}

type Query {
  company(where: CompanyWhereUniqueInput!): Company
  companies(where: CompanyWhereInput, orderBy: CompanyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Company]!
  companiesConnection(where: CompanyWhereInput, orderBy: CompanyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CompanyConnection!
  place(where: PlaceWhereUniqueInput!): Place
  places(where: PlaceWhereInput, orderBy: PlaceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Place]!
  placesConnection(where: PlaceWhereInput, orderBy: PlaceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PlaceConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

enum Role {
  SUPER_ADMIN
  ADMIN
  MODERATOR
  USER
}

type Subscription {
  company(where: CompanySubscriptionWhereInput): CompanySubscriptionPayload
  place(where: PlaceSubscriptionWhereInput): PlaceSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  firstName: String
  lastName: String
  email: String
  phone: String
  password: String
  role: Role
  isRepresentative: Boolean
  company: Company
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  firstName: String
  lastName: String
  email: String
  phone: String
  password: String
  role: Role
  isRepresentative: Boolean
  company: CompanyCreateOneWithoutUsersInput
}

input UserCreateManyWithoutCompanyInput {
  create: [UserCreateWithoutCompanyInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateWithoutCompanyInput {
  id: ID
  firstName: String
  lastName: String
  email: String
  phone: String
  password: String
  role: Role
  isRepresentative: Boolean
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  firstName_ASC
  firstName_DESC
  lastName_ASC
  lastName_DESC
  email_ASC
  email_DESC
  phone_ASC
  phone_DESC
  password_ASC
  password_DESC
  role_ASC
  role_DESC
  isRepresentative_ASC
  isRepresentative_DESC
}

type UserPreviousValues {
  id: ID!
  firstName: String
  lastName: String
  email: String
  phone: String
  password: String
  role: Role
  isRepresentative: Boolean
}

input UserScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  firstName: String
  firstName_not: String
  firstName_in: [String!]
  firstName_not_in: [String!]
  firstName_lt: String
  firstName_lte: String
  firstName_gt: String
  firstName_gte: String
  firstName_contains: String
  firstName_not_contains: String
  firstName_starts_with: String
  firstName_not_starts_with: String
  firstName_ends_with: String
  firstName_not_ends_with: String
  lastName: String
  lastName_not: String
  lastName_in: [String!]
  lastName_not_in: [String!]
  lastName_lt: String
  lastName_lte: String
  lastName_gt: String
  lastName_gte: String
  lastName_contains: String
  lastName_not_contains: String
  lastName_starts_with: String
  lastName_not_starts_with: String
  lastName_ends_with: String
  lastName_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  phone: String
  phone_not: String
  phone_in: [String!]
  phone_not_in: [String!]
  phone_lt: String
  phone_lte: String
  phone_gt: String
  phone_gte: String
  phone_contains: String
  phone_not_contains: String
  phone_starts_with: String
  phone_not_starts_with: String
  phone_ends_with: String
  phone_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  role: Role
  role_not: Role
  role_in: [Role!]
  role_not_in: [Role!]
  isRepresentative: Boolean
  isRepresentative_not: Boolean
  AND: [UserScalarWhereInput!]
  OR: [UserScalarWhereInput!]
  NOT: [UserScalarWhereInput!]
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  firstName: String
  lastName: String
  email: String
  phone: String
  password: String
  role: Role
  isRepresentative: Boolean
  company: CompanyUpdateOneWithoutUsersInput
}

input UserUpdateManyDataInput {
  firstName: String
  lastName: String
  email: String
  phone: String
  password: String
  role: Role
  isRepresentative: Boolean
}

input UserUpdateManyMutationInput {
  firstName: String
  lastName: String
  email: String
  phone: String
  password: String
  role: Role
  isRepresentative: Boolean
}

input UserUpdateManyWithoutCompanyInput {
  create: [UserCreateWithoutCompanyInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  set: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutCompanyInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutCompanyInput!]
  deleteMany: [UserScalarWhereInput!]
  updateMany: [UserUpdateManyWithWhereNestedInput!]
}

input UserUpdateManyWithWhereNestedInput {
  where: UserScalarWhereInput!
  data: UserUpdateManyDataInput!
}

input UserUpdateWithoutCompanyDataInput {
  firstName: String
  lastName: String
  email: String
  phone: String
  password: String
  role: Role
  isRepresentative: Boolean
}

input UserUpdateWithWhereUniqueWithoutCompanyInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutCompanyDataInput!
}

input UserUpsertWithWhereUniqueWithoutCompanyInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutCompanyDataInput!
  create: UserCreateWithoutCompanyInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  firstName: String
  firstName_not: String
  firstName_in: [String!]
  firstName_not_in: [String!]
  firstName_lt: String
  firstName_lte: String
  firstName_gt: String
  firstName_gte: String
  firstName_contains: String
  firstName_not_contains: String
  firstName_starts_with: String
  firstName_not_starts_with: String
  firstName_ends_with: String
  firstName_not_ends_with: String
  lastName: String
  lastName_not: String
  lastName_in: [String!]
  lastName_not_in: [String!]
  lastName_lt: String
  lastName_lte: String
  lastName_gt: String
  lastName_gte: String
  lastName_contains: String
  lastName_not_contains: String
  lastName_starts_with: String
  lastName_not_starts_with: String
  lastName_ends_with: String
  lastName_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  phone: String
  phone_not: String
  phone_in: [String!]
  phone_not_in: [String!]
  phone_lt: String
  phone_lte: String
  phone_gt: String
  phone_gte: String
  phone_contains: String
  phone_not_contains: String
  phone_starts_with: String
  phone_not_starts_with: String
  phone_ends_with: String
  phone_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  role: Role
  role_not: Role
  role_in: [Role!]
  role_not_in: [Role!]
  isRepresentative: Boolean
  isRepresentative_not: Boolean
  company: CompanyWhereInput
  AND: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`,
      }
    