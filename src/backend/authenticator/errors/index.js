
class HttpStatusError extends Error {
    constructor(message, status, canShow = true) {
        super(message);
        this.status = status;
        this.canShow = canShow;
    }
}

module.exports = {
    HttpStatusError
}