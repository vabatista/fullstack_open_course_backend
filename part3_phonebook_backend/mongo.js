//MongoDB URI: mongodb+srv://fullstack:<password>@cluster0.mfj3m.azure.mongodb.net/<dbname>?retryWrites=true&w=majority

const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('Please provide the password as an argument to list entries: \
        node mongo.js <password> or node mongo.js <password> <name> <phone> to add new entry')
	process.exit(1)
} else {
	const password = process.argv[2]
	const mongoUrl = `mongodb+srv://fullstack:${password}@cluster0.mfj3m.azure.mongodb.net/phonebook?retryWrites=true&w=majority`
	mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

	const schema = new mongoose.Schema({
		name: String,
		phone: String
	})

	const Person = mongoose.model('persons', schema)

	if (process.argv.length == 5) {

		const person = new Person({
			name: process.argv[3],
			phone: process.argv[4]
		})

		// eslint-disable-next-line no-unused-vars
		person.save().then(_result => {
			console.log('person saved!')
			mongoose.connection.close()
		})
	} else {
		Person.find({}).then(result => {
			result.forEach(p => {
				console.log(p)
			})
			mongoose.connection.close()
		})
	}

}





