const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();

app.use(cors())

const username = process.env.MDBUSER;
const password = process.env.MDBPW;

mongoose.connect(`mongodb+srv://${username}:${password}@learn-graph-ql.dnskp7r.mongodb.net/?retryWrites=true&w=majority&appName=learn-graph-ql`)
mongoose.connection.once('open', () => {
    console.log('connected to mongodb instance')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Now listening for requests on port ${PORT}`);
})

