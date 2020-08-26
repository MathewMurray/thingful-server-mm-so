/* eslint-disable strict */
const AuthService = require('../auth/auth-service');
function BasicAuth (req,res,next) {
  const authToken = req.get('Authorization');

  let basicToken;
  if(!authToken.toLowerCase().startsWith('basic ')) {
    return res.status(401).json({error:'missing basic token'});
  } else {
    basicToken = authToken.slice('basic '.length, authToken.length);
  }
  const [tokenUserName,tokenPassword] = Buffer
    .from(basicToken, 'base64')
    .toString()
    .split(':');
  if(!tokenUserName || !tokenPassword){
    return res.status(401).json({error: 'Unauthorized request'});
  }
  AuthService.getUserWithUserName(
    req.app.get('db'),
    tokenUserName
  )
    .then(user => {
      if(!user || user.password !== tokenPassword){
        return res.status(401).json({error: 'Unauthorized request'});
      }
      req.user = user;
      next();
    })
    .catch(next);
}
module.exports = {
  BasicAuth
};