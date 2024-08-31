const mongoose = require('mongoose')

const Schema = mongoose.Schema

const budgetSchema = new Schema({
    user_id:{
        type: String,
        required: true,
    },
    Name:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    expenses:{
        type:[
            {
              Name: String,
              Amount: Number,
              createdAt: {
                type: Date,
                default: Date.now, 
              }
            }
          ],
        default: [],
    }
})


module.exports= mongoose.model('Budget', budgetSchema)