const Server = require('./server');
const { mongoConnection } = require('./database/mongo')

function loadcongfig() {
    const enviroment = process.env.NODE_ENV || 'dev';
    const config = require(`./config/enviroment.${enviroment}`);
    return config;
}

async function start(config) {
    await mongoConnection(config.database.mongo.url);
    const server = new Server(config);
    server.start();
}

start(loadcongfig());
