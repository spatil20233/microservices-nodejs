import models from 'shared-models-service'
const Product = models.ProductModel()

const fetchElementById = async (req, res) => {
  const getObject = await Product.find()
  res.status(200).json({data:getObject})
}

export const createNewElement = async (req, res) => {
  try {
    console.log('strated')
    const body = new Product(req.body)
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
    const editElement = await Product.findOneAndUpdate(filter, update, {
          new: true
    });
     
    return res.status(200).json({data:editElement})
   } catch (error) {
    return res.status(500).json({error: error});
   }
}

export const deleteElement = async (req, res) => {
  try {
    const condition = { _id: req.params.id }
    const removeElement = await Product.deleteOne(condition);
    return res.status(200).json({data:removeElement})
  } catch (error) {
    return res.status(500).json({error: error});
  }
}


export default fetchElementById