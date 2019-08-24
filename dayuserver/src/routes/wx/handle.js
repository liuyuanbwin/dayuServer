const router = require('koa-router')()
const controller = require('../../controller')

router.get('/wx/handle', controller.gethandle)
      .post('/wx/handle', controller.postHandle)
      .get('/wx/jsSign', controller.getSign)
      .get('/wx/share',controller.share)
      .get('/wx/success', controller.success)
      .post('/wx/registClient', controller.registClient)
      .get('/wx/shareret', controller.shareret)
      .get('/wx/weather', controller.weather)
      .get('/wx/weathercount', controller.weatherCount)
      .get('/wx/upload',controller.uploadMeterail)
module.exports = router
