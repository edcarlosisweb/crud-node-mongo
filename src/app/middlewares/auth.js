const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

const erros = require('../../utils/errors');
const validate = require('../../utils/validate');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    //VERIFICA O TOKEN ENVIADO VIA HEADER
    if (!authHeader)
        return res.status(400).send(erros.TokenFailed());

    //SEPARA AS INFORMAÇOES DO TOKEN ENTRE BREARER E HASH
    const [schema, token] = authHeader.split(' ')

    //VALIDA SE O TOKEN ESTÁ NO FORMATO CORRETO
    if (!validate.isValidToken(authHeader))
        return res.status(400).send(erros.TokenFailed());

    //TESTA A VALIDADE DO TOKEN
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send(erros.InvalidToken());
        req.userId = decoded.id;

        //PERMITE A REQUISICÁO DE CHEGAR NA ROTA DEFINIDA
        return next();
    });

}