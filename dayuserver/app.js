const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa-cors')
const mongoose = require('mongoose')

const index = require('./src/routes/index')
const users = require('./src/routes/api/users')
const vehicle = require('./src/routes/api/vehicles')
const keyword = require('./src/routes/api/keywordReply')
const login = require('./src/routes/api/login')
const handle = require('./src/routes/wx/handle')
const WeChat = require('./src/helpers/wechat')



const xmlParse = require('./src/middleware/xmlParse')
const xlogger = require('./src/middleware/logger')
const msgReply = require('./src/middleware/msgReply')

// error handler
onerror(app)

new WeChat()
//config
const db = require('./config/keys').mongoURI

mongoose
.connect(db, { useNewUrlParser: true })
.then(()=>{
  console.log('Mongodb Connected ...')
})
.catch(err => {
  console.log(err)
})

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))




app.use(cors())
app.use(xlogger())


app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(vehicle.routes(), vehicle.allowedMethods())
app.use(keyword.routes(), keyword.allowedMethods())
app.use(login.routes(), login.allowedMethods())
app.use(handle.routes(), handle.allowedMethods())
app.use(xmlParse())
//app.use(msgReply())




// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
