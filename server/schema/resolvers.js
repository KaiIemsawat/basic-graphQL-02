// access to FakeData
const { UserList, MovieList } = require("../FakeData");
const _ = require("lodash");

const resolvers = {
    Query: {
        /* USER RESOLVERS */
        // same name/structure as in type-defs.js

        // users() {
        //     return UserList;
        // },
        // Could use either 'users() {}' OR 'users: () => {}'
        users: (parent, args, context, info) => {
            // using context. Could be the most useful beside args
            // console.log(context.req.headers);
            // info
            console.log(info);
            return UserList;
        },
        user: (parent, args, constext, info) => {
            // 'args' - an object that contains whatever data the user passes and the argument of the query
            const id = args.id;
            const user = _.find(UserList, { id: Number(id) });
            // Basically, GraphQL type 'ID' could be either 'String' or 'Number'
            // But '_' converts it to String while actual id in database is still Number
            // So, we need to convert back to 'Number'
            return user;
        },
        /* MOVIE RESOLVERS */
        movies: () => {
            return MovieList;
        },
        movie: (parent, args) => {
            const name = args.name;
            const movie = _.find(MovieList, { name });
            return movie;
        },
    },
    User: {
        favoriteMovies: (parent) => {
            // using parent
            // console.log(parent);
            return _.filter(
                MovieList,
                (movie) =>
                    movie.yearOfRelease >= 2000 && movie.yearOfRelease <= 2010
            );
        },
    },
    Mutation: {
        createUser: (parent, args) => {
            // To refer what is in 'args', we can look into type-defs. In this case, there is 'input' as an argument for createUser
            // type Mutation {
            //     createUser(input: CreateUserInput!): User!
            // }
            const user = args.input;

            // in this case where using 'fake database'
            const lastId = UserList[UserList.length - 1].id;
            user.id = lastId + 1;
            UserList.push(user);
            return user;
        },
        updateUsername: (parent, args) => {
            // const id = args.input.id;
            // const newUsername = args.input.newUsername
            // the two lines above can be replaced with a line below
            const { id, newUsername } = args.input;
            let updatedUser;
            UserList.forEach((user) => {
                if (user.id === Number(id)) {
                    user.username = newUsername;
                    updatedUser = user;
                }
            });
            return updatedUser;
        },
        deleteUser: (parent, args) => {
            const id = args.id;
            _.remove(UserList, (user) => user.id === Number(id));
            return null;
        },
    },
};

module.exports = { resolvers };
