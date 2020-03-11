const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/iswebdb', 
    {
        useNewUrlParser: true, 
        promiseLibrary: global.Promise,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });

module.exports = mongoose;