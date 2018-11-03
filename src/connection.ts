import * as mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);

const connect = () => {
    mongoose.connect(process.env.MONGO_DB, {
        useNewUrlParser: true,
        user: process.env.MONGO_USERNAME,
        pass: process.env.MONGO_PASSWORD
    });
};
connect();

const db = mongoose.connection;

let retry = 0;
db.on('error', event => {
    console.error(`Connection error: ${event}`);
    process.exit(1);
});

db.once('open', () => {
    console.log('Connection to mongodb open');
    retry = 0;
});

db.on('disconnected', () => {
    console.error('Connection to mongodb disconnected');
    if (retry >= 5) {
        process.exit(1);
    }

    setTimeout(() => {
        retry += 1;
        console.log(`Attempting to reconnect. Retry: ${retry}`);
        connect();
    }, 5000);
});