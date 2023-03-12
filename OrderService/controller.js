import axios from 'axios'
import models from 'shared-models-service'
import { getRequest } from './external.js'

const Order = models.OrderModel()

const fetchElementById = async (req, res) => {
  
  const productExist = await getRequest('http://localhost:4002/product-proxy/products', req.headers)
  if (!productExist.data.length) {
   return res.status(400).json({ message: 'Product not found.'})
  }

  const getObject = await Order.find().populate('userId').populate('productId')
  return res.status(200).json({data:getObject})
}

export const createNewElement = async (req, res) => {
  try {
    const body = new Order(req.body)
    const insertElement = await body.save(body)
    return res.status(201).json({data:insertElement})
  } catch (error) {
    return res.status(500).json({error: error});
  }
}

export const updateElement = async (req, res) => {
   try {
    const filter = { _id: req.body._id }
    const update = req.body
    const editElement = await Order.findOneAndUpdate(filter, update, {
          new: true
      });
     return res.status(204).json({data:editElement})
   } catch (error) {
     return res.status(500).json({error: error});
   }
}

export const deleteElement = async (req, res) => {
  try {
    const condition = { _id: req.params.id }
    const removeElement = await Order.deleteOne(condition);
    return res.status(200).json({data:removeElement})
  } catch (error) {
    return res.status(500).json({error: error});
  }
}


export default fetchElementById