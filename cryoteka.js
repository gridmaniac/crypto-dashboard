require('./interop')

const fs = require('fs'),
      moment = require('moment')

const Pug = require('koa-pug')

const Koa = require('koa'),
      app = new Koa()

app
    .use(require('koa-bodyparser')())
    .use(require('koa-json')())
    .use(require('koa-static')(__dirname + '/web'))


const pug = new Pug({
      viewPath: './pug',
      noCache: true,
      app
})

const config = summon('get-config')()

const mongoose = require('mongoose')
      mongoose.Promise = require('bluebird')

mongoose.connect(
    `mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.db}`, {
        useMongoClient: true
})

const router = require('./routes')
app
    .use(router.routes())

const manager = summon('manager')


app.listen(12200)