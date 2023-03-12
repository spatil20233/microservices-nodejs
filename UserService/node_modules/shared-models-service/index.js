const mongoose = require('mongoose')

let userDatabase 
try {
  userDatabase = mongoose.createConnection('mongodb+srv://sameer_patil:LetMePass123@cluster1.7bv0fjh.mongodb.net/testUser?retryWrites=true&w=majority');
} catch (error) {
  throw Error('Error while connection testUser Database')
}

let productDatabase 
try {
  productDatabase = mongoose.createConnection('mongodb+srv://sameer_patil:LetMePass123@cluster1.7bv0fjh.mongodb.net/testProduct?retryWrites=true&w=majority');
} catch (error) {
  throw Error('Error while connection testProduct Database')
}

let orderDatabase 
try {
  orderDatabase = mongoose.createConnection('mongodb+srv://sameer_patil:LetMePass123@cluster1.7bv0fjh.mongodb.net/testOrder?retryWrites=true&w=majority');
} catch (error) {
  throw Error('Error while connection testOrder Database')
}

process.on('querySrv ECONNREFUSED', (error, source) => {
  console.log('errr:', error)
  throw Error('Error while connection Database', error.message)
});

const userSchema = new mongoose.Schema({ 
  name:   { type: String , required:true , unique:true }, 
  email:   { type: String , required:true , unique:true }, 
  password:  { type: String , required:true, select:false }, 
  age:  { type: Number,required:true },
  dob:  { type: Date , required:true , unique:true }
});

const User = userDatabase.model('User', userSchema);
 

const productSchema = new mongoose.Schema({ 
  name:   { type: String , required:true , unique:true}, 
  description:  {type: String,required:true , unique:true},
});

const Product = productDatabase.model('Product', productSchema);


const orderSchema = new mongoose.Schema({ 
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref : User
  }, 
  qty: { type: Number, required: true, unique: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref : Product
  }
});

const Order = orderDatabase.model('Order', orderSchema);

module.exports = {
  UserModel: function () {
     return User
  },
  ProductModel: function () {
     return Product
  },
  OrderModel: function () {
     return Order
  },
}

