const router = require('koa-router')()
const User = require('../../models/user')

router.prefix('/api/users')

router.get('/', async(ctx, next) => {
    const result = await User.findOne({
        name:ctx.params.name
    })

    const results = await User.find({
    
    })

    console.log(result)

    ctx.body = {
        code: 0,
        result,
        results
    }
})

router.post('/', async(ctx, next) => {
    console.log(ctx.request.body + ' **** ' + ctx.request.body.name)
   const user = new User({
       name:ctx.request.body.name,
       sex:ctx.request.body.sex,
       state:ctx.request.body.state,
       hobby:ctx.request.body.hobby,
       marriage:ctx.request.body.marriage,
       birthday:ctx.request.body.birthday,
       address:ctx.request.body.address
   })

   let code = 0

   try{
       await user.save()
       code = 0
   }catch(e){
       console.log(e)
       code = -1
   }

   ctx.body = {
       code
   }
})

module.exports= router