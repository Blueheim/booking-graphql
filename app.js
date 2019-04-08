const express = require('express');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200);
//   }
//   next();
// });

app.use(express.json());

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-yzxq8.mongodb.net/${
      process.env.MONGO_DB
    }?retryWrites=true`
  )
  .then(() => {
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
  });
