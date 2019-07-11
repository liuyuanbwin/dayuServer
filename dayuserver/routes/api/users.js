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

router.post('/register', async(ctx, next) => {
   console.log(ctx.request.body + ' **** ' + ctx.request.body.name)
   const user = new User({
       name:ctx.request.body.name,
       email:ctx.request.body.email,
       password:ctx.request.body.password,
       identity:ctx.request.body.identity
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