const mongoose=require('mongoose')
var kvSchema = new mongoose.Schema({
  'key':{
    type:String,
    required:true,
    unique:true
  },
  'value':{
    type:String
  }
});

const kv = mongoose.model('kv',kvSchema);
module.exports=kv
