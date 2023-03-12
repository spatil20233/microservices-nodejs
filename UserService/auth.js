import jwt from 'jsonwebtoken'
import models from 'shared-models-service'
const User = models.UserModel() 
import { ValidationError } from './customError.js'

export const verifyToken = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-api-key"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, 'my-secret-key');

    const user = decoded._id ? await User.findOne({ _id: decoded._id }) : null
    
    if (!user) {
      return res.status(404).send({message:"User Not Found !"}); 
    }
    req.user = user;
  } catch (err) {
    return res.status(401).send({error: new ValidationError('401'), message:err.message});
  }

  return next();

}
