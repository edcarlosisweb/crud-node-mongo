const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = {
    //GERA O TOKEN JWT
    //O MÉTODO SIGN PODE RECEBER PARAMETROS PARA SEREM VINCULADOS AO TOKEN E DEVE RECEBER UM HASH
    //EXPIRESIN ARMAZENA O TEMPO DE VALIDADE DO TOKEN EM SEGUNDOS
    GetToken(params = {}) {
        return jwt.sign(params, authConfig.secret, {
            expiresIn: 86400
        })
    },

}


