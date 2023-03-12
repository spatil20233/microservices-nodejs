import models from 'shared-models-service'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const User = models.UserModel()

const fetchElementById = async (req, res) => {
  return res.status(200).json({ data:req.user })
}

export const register = async (req, res) => {
  try {
    const body = new User(req.body)
    console.log(' body:  ', body)
    if (!(req.body.email && req.body.password)) {
      res.status(400).send("All input is required");
    }

    const encryptedPassword = await bcrypt.hash(req.body.password, 8);
    body.password = encryptedPassword
    const insertElement = await body.save(body)
    const token = jwt.sign(
      {
        _id: req.body._id
      },
      'my-secret-key',
      {
        expiresIn: "2h",
      }
    );
    const data = { result:insertElement , token: token }
    return res.status(201).json({ data:data })
  } catch (error) {
    console.log(error)
    return res.status(500).json({error: error.message});
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ email: email }).select('password email age dob')
    console.log(user)
    if (!user) {
      return res.status(404).json({ message:'User Not Found !' })
    }

    const encryptedPassword = await bcrypt.hash(user.password, 8);
    if (email !== user.email && password !== encryptedPassword ) {
       return res.status(401).json({ message:'Password or Email Not Matching !' })
    }
  
    const token = jwt.sign(
      {
        _id: user._id
      },
      'my-secret-key',
      {
        expiresIn: "2h",
      }
    );
    const data = { result: { email:user.email , age:user.age , dob:user.dob } , token: token }
    return res.status(201).json({ data:data })
  } catch (error) {
    console.log(error)
    return res.status(500).json({error: error});
  }
}

export const updateElement = async (req, res) => {
   try {
    // const filter = { _id: req.body._id }
    const filter = { _id: req.user._id }
    const update = req.body
    const editElement = await User.findOneAndUpdate(filter, update, {
          new: true
    });
    return res.status(200).json({ data : editElement })
   } catch (error) {
    return res.status(500).json({error: error});
   }
}

export const deleteElement = async (req, res) => {
  try {
    // const condition = { _id: req.params.id }
    const condition = { _id: req.user._id }
    const removeElement = await User.deleteOne(condition);
    return  res.status(200).json({ data:removeElement })
  } catch (error) {
    console.log(error)
    return res.status(500).json({error: error.message});
  }
}

export const logout = async (req, res) => {
  try {
    const token = jwt.destroy(req.headers['x-api-key']);
    return res.status(201).json({ data:token })
  } catch (error) {
    console.log(error)
    return res.status(500).json({error: error.message});
  }
}


export default fetchElementById