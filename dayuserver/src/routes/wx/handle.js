const router = require('koa-router')()
const controller = require('../../controller')

router.get('/wx/handle', controller.gethandle)
      .post('/wx/handle', controller.postHandle)
      .get('/webHandle',controller.webHandle)

module.exports = router