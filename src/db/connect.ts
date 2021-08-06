import mongoose from 'mongoose'
import { FastifyInstance } from 'fastify'

export default async function(fastify: FastifyInstance): Promise<boolean>{
    // Database
    mongoose.Promise = global.Promise;

    const options = {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAlive: true,
        useFindAndModify: false
    };

    const uri = process.env.DATABASE?.toString() || '';
    mongoose.connect(uri, options);

    // CONNECTION EVENTS
    // When successfully connected
    mongoose.connection.on('connected', () => {
        fastify.log.info(`Mongoose connected to ${process.env.DATABASE} 🤖 ✅`);
        // Here we send the ready signal to PM2
        if (process && process.send) {
            process.send('ready');
        }
    });

    // If the connection throws an error
    mongoose.connection.on("error", (err: any) => {
        fastify.log.error(`Mongoose connection error: ${err} 🚨`);
    });

    // When the connection is disconnected
    mongoose.connection.on("disconnected", () => {
        fastify.log.info(`Mongoose connection disconnected`);
    });

    // If the Node process ends, close the Mongoose connection
    process.on("SIGINT", () => {
        mongoose.connection.close(() => {
            fastify.log.info("Mongoose connection disconnected through app termination");
            process.exit(0);
        });
    });
    return true;
};