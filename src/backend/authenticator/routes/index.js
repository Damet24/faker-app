const {Router} = require('express')
const z = require('zod');
const validateRequest = require('../middlewares/validateRequest');
const container = require('../ioc');

const createCredentialSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const validateTokenSchema = z.object({
  token: z.string(),
});

const authController = container.get('auth-controller');
const routes = Router();

routes.post('/signup', validateRequest(createCredentialSchema), authController.signup.bind(authController));
routes.post('/login', validateRequest(createCredentialSchema), authController.login.bind(authController));
routes.get('/validate', validateRequest(validateTokenSchema), authController.validateToken.bind(authController));

module.exports = routes;