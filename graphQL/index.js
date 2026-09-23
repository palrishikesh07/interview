import {ApolloServer} from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// Importing the typeDefs and resolvers
import {typeDefs} from "./schema.js";

// DB
import db from "./_db.js";


const resolvers={
    Query:{
        games(){
            return db.games;
        },
        authors(){
            return db.authors;
        },
        reviews(){
            return db.reviews;
        },
        review(parent, args, context, info){
            return db.reviews.find((review)=> review.id === args.id);
        },
        game(parent, args, context, info){
            return db.games.find((game)=> game.id === args.id);
        },
        author(parent, args, context, info){
            return db.authors.find((author)=> author.id === args.id);
        }
    },
    Game:{
        reviews(parent){
            return db.reviews.filter((review)=> review.game_id === parent.id);
        }
    },
    Author:{
        reviews(parent){
            return db.reviews.filter((review)=> review.author_id === parent.id);
        }
    },
    Review:{
        author(parent){
            return db.authors.find((author)=> author.id === parent.author_id);
        },
        game(parent){
            return db.games.find((game)=> game.id === parent.game_id);
        }
    },
    Mutation:{
        deleteGame(parent,args){
            db.games = db.games.filter((g)=>g.id != args.id);
            return db.games;
        },
        addGame(_,args){
            let game={
                ...args.game,
                id:Math.floor(Math.random()*1000).toString()
            }
            db.games.push(game)
            return game
        },
        updateGame(_,args){
            db.game = db.games.map((g)=>{
                if(g.id == args.id){
                    return {...g, ...args.edits}
                }

                return g
            })

            return db.games.find((g)=>g.id === args.id)
        }

    }
}



// Server Setup
const server = new ApolloServer({
    typeDefs,
    resolvers
}); 


const {url} = await startStandaloneServer(server,{
    listen: {port: 4000}
});

console.log(`Server is running at 40000, visit ${url} to access the GraphQL playground`);