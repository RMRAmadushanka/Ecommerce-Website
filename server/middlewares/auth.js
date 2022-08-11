const admin  = require('../firebase')

exports.authValidate = async(req,res,next) =>{
    try {
        const firbaseUser = await admin.auth().verifyIdToken(req.headers.authtoken)
       
        req.user = firbaseUser
        next()
    } catch (error) {
console.log(error);
        res.status(401).json({
            error:"Invalid or Expired token"
        })
    }
}