const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

const handleErrors = async (err) => {
  if(err.status >= 400 && err.status < 600){
    const errRes = await err.json();
    const { errors } = errRes;
    if(erros && Array.isArray(errors)){
      
    }
  }
}

module.exports = {
  asyncHandler,
}