import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose'
import { MONGODB } from '../config';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>({req})
}) 

mongoose.connect(MONGODB,{ useNewUrlParser:true})
.then(()=>{
    console.log('mongodb connected')
    return server.listen({port:5000})
}).then((res)=>{
    console.log(`server listening at port 5000`)
});