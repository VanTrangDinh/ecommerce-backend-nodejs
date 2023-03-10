'use strict'

const {Schema, model, Types} = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = 'apiKey'
const COLLECTION_NAME = 'apiKeys'
// Declare the Schema of the Mongo model
const apiKeySchema = new Schema({
    key:{
        type:String,
        required:true,
        unique:true,
       
    },
    status:{
        type:Boolean,
        default: true
    },
    permissions:{
        type:[String],
        default:true,
        enum: ['0000', '1111', '2222']
    },
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

//Export the model
module.exports = model(COLLECTION_NAME, apiKeySchema);






















// 'use strict'

// const {model, Schema, Types} = require('mongoose'); // Erase if already required
// const DOCUMENT_NAME = 'Apikey'
// const COLLECTION_NAME = 'Apikeys'
// // Declare the Schema of the Mongo model
// const apiKeySchema = new Schema({
//     key:{
//         type:String,
//         required:true,
//         unique:true,
        
//     },
//     status:{
//         type: Boolean,
//        default: true
//     },
//     permissions:{
//         type:[String],
//         required:true,
//         enum: ['0000', '1111', '2222']
//     },
  
// }, {
//     collection: COLLECTION_NAME,
//     timestamps: true,

// });

// //Export the model
// module.exports = model(COLLECTION_NAME, apiKeySchema);