const {UserList} = require('../FakeData')

const resolvers = {
    Query : { // same name/structure as in type-defs.js
        users() {
            return UserList;
        }
    }
}

module.exports = {resolvers};