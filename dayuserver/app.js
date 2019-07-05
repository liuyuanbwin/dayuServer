const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa-cors')
const mongoose = require('mongoose')

const index = require('./routes/index')
//const users = require('./routes/users')
//const bills = require('./routes/bills')
const users = require('./routes/api/users')

// error handler
onerror(app)

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
//app.use(cors())

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


app.use(cors())

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
//app.use(bills.routes(), bills.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
