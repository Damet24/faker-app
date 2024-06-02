const express = require('express');
const httpStatus = require('http-status');
const routes = require('./routes');
const errors = require('./errors');

class Server {
    constructor(config) {
        this.config = config;
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.configRoutes();
    }

    configRoutes() {
        this.app.use(routes);
        this.app.use((error, req, res, next) => {
            if (error instanceof errors.HttpStatusError && error.canShow)
                return res.status(error.status).json({ error: error.message });
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: httpStatus[httpStatus.INTERNAL_SERVER_ERROR] });
        })
        this.app.use((req, res, next) => {
            res.status(httpStatus.NOT_FOUND).json({ error: httpStatus[httpStatus.NOT_FOUND] });
        });
    }

    start() {
        return this.app.listen(this.config.port, () => {
            console.log(`Server is running on port ${this.config.port}`);
        });
    }
}

module.exports = Server;