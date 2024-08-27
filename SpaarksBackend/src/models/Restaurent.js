const { default: mongoose } = require('mongoose')
const mogoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
  name:{type:String, required:true},
  description:  {type:String,required :true},
  location : {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  },
  ratings :[{type:Number}]

})

restaurantSchema.index({ location: '2dsphere' });  //Indexing: The location field is indexed as a 2dsphere, allowing for efficient geospatial queries


const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;

