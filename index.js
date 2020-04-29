import { ApolloServer } from 'apollo-server';
import gql from 'graphql-tag';
import mongoose from 'mongoose'
import { MONGODB } from './config';

const typeDefs = gql`
  type Query{
      test:String!
  }

`
const resolvers = {
    Query:{
        test:()=>'testing graphql'
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect(MONGODB,{ useNewUrlParser:true})
.then(()=>{
    console.log('mongodb connected')
    return server.listen({port:5000})
}).then((res)=>{
    console.log(`server listening at port 5000`)
});
