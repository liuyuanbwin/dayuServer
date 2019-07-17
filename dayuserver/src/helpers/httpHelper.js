var request = require('request')



exports.POST = function(url, data) {
    return new Promise((resolve, reject) => {
        request({
            url,
            method: "post",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body:data
        },function (error, response, body){
            if(error){
                reject(error)
            }
            resolve(response)
        })
    })
}