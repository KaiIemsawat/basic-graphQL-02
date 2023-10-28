const { gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: String!
        friends: [User]
        favoriteMovies: [Movie]
    }

    type Movie {
        id: ID!
        name: String!
        yearOfRelease: Int!
        isInTheaters: Boolean!
    }

    type Query {
        users: [User]!
        user(id: ID!): User!
        movies: [Movie!]!
        movie(name: String!): Movie!
    }

    enum Nationality {
        CANADA
        BRAZIL
        INDIA
        GERMANY
        CHILE
    }
`;
// - In general, first level to concern is Query type
// - Since general practice for 'enum' is all uppercase, the countries will need to be capitalized as well

// - 'user(id: ID!): User!' means that this field needs argument 'id'
module.exports = { typeDefs };
