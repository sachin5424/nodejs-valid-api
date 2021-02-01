
var jwt = require('jsonwebtoken');

module.exports  =  (req,res,next)=>{
  try {
       var bearer = req.headers.authentication.split(" ");
       token = bearer[1];
    //    jwt.verify(token, 'sagar', function (err, decoded){
    //     console.log("22222");
    //     if (err){
    //         console.log(err);
    //         req.authenticated = false;
    //         req.decoded = null;
    //     } else {
    //         console.log("33333");
    //         req.decoded = decoded;
    //         req.authenticated = true;
    //     }
    // });
    var decode = jwt.verify(token,'sagar')
    req.userDe=decode
      next()
  } catch (error) {
      res.status(401).json({
          message:"invalid token"
      }) 
  }
}