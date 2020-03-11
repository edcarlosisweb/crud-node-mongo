const mongooose = require('../../database');
const bcript = require('../../../node_modules/bcryptjs');

const UserSchema = new mongooose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required:true,
        select: false,
    },
    createdAt: {
        type: Date, 
        default: Date.now,
    },

});

//Função executada no pre save
UserSchema.pre('save', async function(next){
    const hash = await bcript.hash(this.password, 10);
    this.password = hash;
     
    next();
});

const User = mongooose.model('User', UserSchema);

module.exports = User;