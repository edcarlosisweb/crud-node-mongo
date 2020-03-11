const app = require('./config/custom-express');
const bodyParser = require('body-parser'); 
const routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false }));
app.use(routes);


app.listen(3000);