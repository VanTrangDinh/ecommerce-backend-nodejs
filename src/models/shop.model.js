'use strict'

const {model, Schema,type } = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = 'Shop'
const COLLECTION_NAME ='Shops'
// Declare the Schema of the Mongo model
var shopSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim: true,
        maxlenght: 150
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim: true
    },
    password:{
        type:String,
        required:true,
    },
    //trạng thái hoạt động của shop
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    //nếu shop đăng kí bán thành công thì ok
    verify: {
        type: Schema.Types.Boolean,
        default: false
    },
    roles: {
        type: Array,
        default: []
    },

}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

//Export the model
module.exports = model(COLLECTION_NAME, shopSchema);