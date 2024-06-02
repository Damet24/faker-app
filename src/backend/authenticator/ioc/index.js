const {ContainerBuilder, Reference, Definition} = require('node-dependency-injection');
const CredentialService = require('../services/credentialService');

const container = new ContainerBuilder();

// Repositories
const {Credential} = require('../database/mongo')
container.setDefinition('credential-repository', new Definition(CredentialService, [Credential, new Reference('token-service'), 'salt']))

const TokenService = require('../services/tokenService');
container.setDefinition('token-service', new Definition(TokenService, ['secret']))

// Controllers
const AuthController = require('../controllers/authController')
container.setDefinition('auth-controller', new Definition(AuthController, [new Reference('credential-repository')]))

module.exports = container;