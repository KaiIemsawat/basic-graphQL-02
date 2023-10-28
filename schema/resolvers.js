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
        users: () => {
            return UserList;
        },
        user: (parent, args) => {
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
        favoriteMovies: () => {
            return _.filter(
                MovieList,
                (movie) =>
                    movie.yearOfRelease >= 2000 && movie.yearOfRelease <= 2010
            );
        },
    },
};

module.exports = { resolvers };
