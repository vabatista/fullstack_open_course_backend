const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogController = require('./controllers/blogController')
const userController = require('./controllers/userController')
const loginController = require('./controllers/loginController')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const mongoose = require('mongoose')
require('express-async-errors')


logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((error) => {
		logger.error('error connection to MongoDB:', error.message)
	})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/login', loginController)
app.use('/api/blogs', blogController)
app.use('/api/users', userController)

if (process.env.NODE_ENV === 'test') {
	const testingRouter = require('./controllers/testingController')
	app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app



