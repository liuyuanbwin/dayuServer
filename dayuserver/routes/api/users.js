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

router.post('/add', async(ctx, next) => {
   console.log(ctx.request.body + ' **** ' + ctx.request.body.name)
   const user = new User({
       name:ctx.request.body.name,
       sex:ctx.request.body.sex,
       tel:ctx.request.body.tel,
       address:ctx.request.body.address,
       role:ctx.request.body.role
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

router.delete('/delete/:id',async(ctx,next) => {
    console.log('要删除的是 ' + ctx.params.id)
    let code = 0
    try {
        await User.deleteOne({_id:ctx.params.id},function(err,doc){
        
        })
        code = 0
    } catch (error) {
        code = -1
    }
     ctx.body= {
         code
     }
})

module.exports= router