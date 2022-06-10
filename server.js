const dotenv = require('dotenv').config();
const express = require('express');
const  expressGraphQL  = require('express-graphql').graphqlHTTP;
const schema = require('./schema.js');

const app = express();
app.use('/graphql', expressGraphQL({
    schema:schema,
    graphiql:true
}));

const server = app.listen(process.env.PORT, () => {console.log(`Order Service is operating at :${process.env.PORT}`)});