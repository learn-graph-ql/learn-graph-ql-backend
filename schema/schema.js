const graphql = require('graphql');
const lodash = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
var books = [
{ name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
{ name: 'The Final Empire', genre: 'Fantasy', id: '2' },
{ name: 'The Long Earth', genre: 'Sci-Fi', id: '3' }
];


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: {type:GraphQLString}},
            resolve(parent, args){
                // Code to get data from db/other source
                return lodash.find(books, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema ({
    query: RootQuery
})