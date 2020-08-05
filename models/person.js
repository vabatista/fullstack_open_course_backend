//const mongoUrl = `mongodb+srv://fullstack:${password}@cluster0.mfj3m.azure.mongodb.net/phonebook?retryWrites=true&w=majority`
const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

require('dotenv').config()

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const schema = new mongoose.Schema({
    name: {type: String, required: true, unique: true, minlength: 3},
    phone: {type: String, required: true, minlength: 5}
})

schema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('persons', schema)