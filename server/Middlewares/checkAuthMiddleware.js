function checkAuthMiddleware(request, response, next) {
    const { authorization } = request.headers;
    if (!authorization) {
        return response
            .status(401)
            .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
    }
    
    // const [token]   = authorization.split(' ');
    const token = request.headers.authorization.split(' ')[1];
    
    if (!token) {
        return response
            .status(401)
            .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
    }
    try {
        const decoded = jwt.verify(token, 'supersecret');
        request.user = decoded.sub;
        return next();
    } catch (err) {
        return response
            .status(401)
            .json({ error: true, code: 'token.expired', message: 'Sessão expirada. Realize login novamente! :)' })
    }
}

module.exports = checkAuthMiddleware