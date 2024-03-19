const config =  require('../env/config.js');
const routes =  require('./controller/routes.js');
var express = require('express')
var api = express()

api.use(express.json())
api.use(routes);

api.post('/users', function(req, res) {
  res.sendStatus(200)
  res.json({ mensaje: 'metodo post' })   
})

api.listen(config.PORT, config.HOST, () => {
  console.log(`HARRY POTTER API LISTENING ON http://${config.HOST}:${config.PORT}`);
})

module.exports = api
