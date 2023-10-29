const { gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: Nationality!
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

    input CreateUserInput {
        name: String!
        username: String!
        age: Int
        nationality: Nationality = BRAZIL
    }

    input UpdateUsernameInput {
        id: ID!
        newUsername: String!
    }

    type Mutation {
        createUser(input: CreateUserInput!): User
        updateUsername(input: UpdateUsernameInput!): User
        deleteUser(id: ID!): User
    }

    enum Nationality {
        CANADA
        BRAZIL
        INDIA
        GERMANY
        CHILE
        THAI
    }
`;
// - In general, first level to concern is Query type
// - Since general practice for 'enum' is all uppercase, the countries will need to be capitalized as well

// - 'user(id: ID!): User!' means that this field needs argument 'id'

// - to make a default value for field, use '= value' as in 'nationality: Nationality = BRAZIL'
// input CreateUserInput {
//     name: String!
//     username: String!
//     age: Int
//     nationality: Nationality = BRAZIL
// }

module.exports = { typeDefs };
