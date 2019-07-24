const router = require('koa-router')()
const User = require('../../models/user')

router.prefix('/api/users')

router.get('/', async(ctx, next) => {

    let token = ctx.request.header.authorization 

    if(token){
        let res = proving(token)

        if(res){
            console.log('判定通过')
        }else{
            console.log('判定没通过')
        }

        if(!res){
            ctx.status = 401
            ctx.body = {
                message:'token 不是token 无效'
            }
            return
        }

        if(res && res.exp <= new Date()/1000){

            ctx.status = 401
            ctx.body = {
                messag:'token 过期 无效'
            }
            
           
        }else{
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
        }
    }else{
        ctx.status = 401
            ctx.body = {
                messag:'token 没有 无效'
            }
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

router.delete('/delete',async(ctx,next) => {
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