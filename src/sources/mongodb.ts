import mongoose from 'mongoose'
import { FastifyInstance } from 'fastify'

function log(message: string, fastify?: FastifyInstance) {
	if (fastify) {
		fastify.log.info(message);
	} else {
		console.log(message)
	}
}

export default async function(fastify?: FastifyInstance): Promise<boolean>{
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
        log(`Mongoose connected to ${process.env.DATABASE} ✅`, fastify);
        // Here we send the ready signal to PM2
        if (process && process.send) {
            process.send('ready');
        }
    });

    // If the connection throws an error
    mongoose.connection.on("error", (err: any) => {
        log(`Mongoose connection error: ${err} 🚨`, fastify);
    });

    // When the connection is disconnected
    mongoose.connection.on("disconnected", () => {
        log(`Mongoose connection disconnected`, fastify);
    });

    // If the Node process ends, close the Mongoose connection
    process.on("SIGINT", () => {
        mongoose.connection.close(() => {
            log("Mongoose connection disconnected through app termination", fastify);
            process.exit(0);
        });
    });
    return true;
};