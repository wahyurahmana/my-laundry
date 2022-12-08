module.exports = (err, req, res, next) => {
  console.error(err)
  let message = err.message
  let status = err.status || 500
  if(err.name === 'SequelizeUniqueConstraintError' || err.name === 'ValidationError'){
    status = 400.
    message = err.errors[0].message
  }
  res.status(status).json({message : message})
}