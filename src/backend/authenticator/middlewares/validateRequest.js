const httpStatus = require('http-status');
const {ZodError} = require('zod');

function validateRequest(schema) {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((issue) => ({
                    message: `${issue.path.join('.')} is ${issue.message}`,
                }))
                res.status(httpStatus.BAD_REQUEST).json({ error: 'Invalid data', details: errorMessages });
            } else {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
            }
        }
    }
}

module.exports = validateRequest;