const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

const authenticate = (req, res, next) => {
    let decoded = verifyToken(req.headers.access_token)
    // console.log(decoded, '   <<< decoded')
    User.findOne({
        where: { id: decoded.id, email: decoded.email }
    })
        .then(user => {
            req.currentUser = { id: user.id, username: user.username, roles: user.roles }
            next()
        })
        .catch(err => {
            next({
                code: 401,
                message: "Unathorize"
            })
        })
}

const hrAuthorize=(req,res,next)=>{
    // console.log(req.currentUser.roles)
    if(req.currentUser.roles !== 'hr'){
        console.log(req.currentUser.roles)
        next({
            code:401,
            message: "HR only",
          });
    }
    else{
        next()
    }
}

const vendorAuthorize=(req,res,next)=>{
    // console.log(req.currentUser.roles)
    if(req.currentUser.roles === 'vendor'){
        // console.log('masuk cus auth')
        // console.log(req.currentUser)
        next()
    }
    else{
        next({
            code:401,
            message: "You must login first",
          });
    }
}

module.exports = {
    authenticate,
    hrAuthorize,
    vendorAuthorize
}