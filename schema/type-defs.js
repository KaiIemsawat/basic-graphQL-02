const {gql} = require("apollo-server");

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: String!
    }
    type Query {
        users: [User]!
    }
`
// In general, first level is Query type

module.exports = {typeDefs}