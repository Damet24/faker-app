const bcrypt = require('bcrypt');
const { HttpStatusError } = require('../errors');
const httpStatus = require('http-status');

class CredentialService {
    constructor(crdentialRepository, tokenService, salt) {
        this.crdentialRepository = crdentialRepository;
        this.tokenService = tokenService;
        this.salt = salt;
    }

    async create({ email, password }) {
        const crdential = await this.findByEmail(email);
        if (crdential)
            throw new HttpStatusError('Crdential already exists', httpStatus.BAD_REQUEST);
        const passwordHash = bcrypt.hashSync(password, this.salt);
        const post = new this.crdentialRepository({ email, passwordHash });
        await post.save({ email, passwordHash })
        return post;
    }

    async findByEmail(email) {
        return this.crdentialRepository.findOne({ email });
    }

    async validate({ email, password }) {
        const crdential = await this.findByEmail(email);
        if (!crdential)
            throw new HttpStatusError('Invalid credential', httpStatus.BAD_REQUEST);
        const isValid = bcrypt.compareSync(password, crdential.passwordHash);
        if (!isValid)
            throw new HttpStatusError('Invalid credential', httpStatus.BAD_REQUEST);
        return crdential;
    }

    async login({ email, password }) {
        await this.validate({ email, password });
        return { token: this.tokenService.sign({ email }) };
    }

    async signup({ email, password }) {
        await this.create({ email, password });
        return { token: this.tokenService.sign({ email }) };
    }

    async validateToken({ token }) {
        const decoded = await this.tokenService.verify(token);
        if (!decoded)
            throw new HttpStatusError('Unauthorized', httpStatus.UNAUTHORIZED);
        return decoded;
    }
}

module.exports = CredentialService;