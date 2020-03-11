module.exports = {
    isValidEmail(email) {
        const reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);

        return !reg.test(email) ? false : true;
    },

    isValidToken(authHeader) {

        const tokenSplit = authHeader.split(' ');

        if (!tokenSplit.lenght === 2)
            return false;

        const [schema, token] = tokenSplit;

        if (!/^Bearer$/i.test(schema))
            return false

        return true;
    }
}
