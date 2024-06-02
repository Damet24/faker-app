const httpStatus = require('http-status');

class AuthController {
    constructor(crdentialService) {
        this.service = crdentialService;
    }

    async signup(request, response, next) {
        try {
            await this.service.create(request.body);
            response.status(httpStatus.CREATED).json({ message: httpStatus[httpStatus.CREATED] });
        } catch (error) {
            next(error);
        }
    }

    async login(request, response, next) {
        try {
            const { token } = await this.service.login(request.body);
            response.status(httpStatus.OK).json({ token });
        } catch (error) {
            next(error);
        }
    }

    async validateToken(request, response, next) {
        try {
            const decoded = await this.service.validateToken(request.body);
            response.status(httpStatus.OK).json({ email: decoded.email });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthController