const https = require('https');

const endpoints = {
    frontEnd: process.env.FRONT_END,
    backEnd: process.env.BACK_END
};

//Default handler is index.handler
exports.handler = async function(event, context) {
  
   const backEndGET = new Promise((resolve, reject) => {
    https.get(endpoints.backEnd, (res) => {
        resolve(res.statusCode)
      }).on('error', (e) => {
        reject(Error(e))
      })
    })

    const frontEndGET = new Promise((resolve, reject) => {
    https.get(endpoints.frontEnd, (res) => {
        resolve(res.statusCode)
      }).on('error', (e) => {
        reject(Error(e))
      })
    })

    const result = Promise.all([backEndGET, frontEndGET]).then(([backEnd, frontEnd]) => {
        return {
            backEnd: backEnd == 200 ? `ONLINE (200)` : `OFFLINE (${backEnd})`,
            frontEnd: frontEnd == 200 ? `ONLINE (200)` : `OFFLINE (${frontEnd})`}
    })
    
  return result
}