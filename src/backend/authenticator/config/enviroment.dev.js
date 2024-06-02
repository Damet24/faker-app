module.exports = {
    port: 3000,
    database: {
        mongo: {
            url: 'mongodb://admin:admin@localhost:27017',
            connectionRertry: 3
        }
    },
    token: {
        secret: 'secret'
    }
}