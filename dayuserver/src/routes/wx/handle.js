const router = require('koa-router')()
const controller = require('../../controller')

router.get('/wx/handle', controller.gethandle)
      .post('/wx/handle', controller.postHandle)
      .get('/wx/jsSign', controller.getSign)
      .get('/wx/share',controller.share)
      .post('/wx/registClient', controller.registClient)

module.exports = router
