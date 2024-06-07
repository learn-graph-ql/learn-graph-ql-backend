const graphql = require('graphql');
const lodash = require('lodash');
const Book = require('../models/book')
const Author = require('../models/author')

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                console.log(parent)
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        born: {type: GraphQLInt},
        age: {
            type: GraphQLInt,
            resolve(parent) {
                const currentYear = new Date().getFullYear();
                return currentYear - parent.born;
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                console.log(parent)
                return Book.find({authorId:parent.id})
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: {type:GraphQLID}},
            resolve(parent, args){
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList (BookType),
            resolve(parent, args){
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList (AuthorType),
            resolve(parent, args){
                return Author.find({})
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull (GraphQLString)},
                born: {type: new GraphQLNonNull (GraphQLInt)}
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    born: args.born
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: new GraphQLNonNull (GraphQLString)},
                genre: {type: new GraphQLNonNull (GraphQLString)},
                authorId: {type: new GraphQLNonNull (GraphQLID)}
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        },
    }
})

module.exports = new GraphQLSchema ({
    query: RootQuery,
    mutation: Mutation
})