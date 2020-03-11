const bcrypy = require('bcryptjs');

const User = require('../../app/model/user');
const errors = require('../../utils/errors');
const token = require('../../utils/token');
const validate = require('../../utils/validate');

module.exports = {

    async register(req, res) {
        try {
            const { email } = req.body;

            if (!validate.isValidEmail(email)) {
                return res.status(400).send(errors.EmailRequired());
            }

            if (await User.findOne({ email }))
                return res.status(400).send(errors.AlreadyUser());

            const user = await User.create(req.body);
            user.password = undefined;

            return res.send({
                user,
                token: token.GetToken({ id: user.id }),
            });

        } catch (err) {
            return res.status(400).send(errors.RegistrationFailed())
        }
    },

    async authenticate(req, res) {
        try {

            const { email, password } = req.body;

            //O password foi definido da model para select = false, abaixo segue exemplo para retornar o passaword em uma consulta
            const user = await User.findOne({ email }).select('+password');

            if (!user) {
                return res.status(400).send(errors.InvalidUserOrPassword());
            }

            if (!await bcrypy.compare(password, user.password)) {
                return res.status(400).send(errors.InvalidUserOrPassword());

            }
            user.password = undefined;

            return res.send({
                user,
                token: token.GetToken({ id: user.id }),
            });


        } catch (err) {
            return res.status(400).send(errors.LoginFailed())
        }


    }
}