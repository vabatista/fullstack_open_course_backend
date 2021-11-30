const router = require('express').Router()
const Blog = require('../models/blog_entry')
const User = require('../models/user_entry')

router.post('/reset', async (request, response) => {
	console.debug('Reseting Test Database...')	
	await Blog.deleteMany({})
	await User.deleteMany({})

	response.status(204).end()  
})

router.get('/reset', async (request, response) => {
	console.debug('Reseting Test Database...')
	await Blog.deleteMany({})
	await User.deleteMany({})

	response.status(204).end()  
})

module.exports = router