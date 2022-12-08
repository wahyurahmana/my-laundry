module.exports = (req, res, next) => {
  if(req.user.username === 'admin'){
    next()
  }else{
    next({status : 403, message : 'You Are Not Admin'})
  }
}