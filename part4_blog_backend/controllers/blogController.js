var mongoose = require('mongoose')
var ValidationError = mongoose.Error.ValidationError
const jwt = require('jsonwebtoken')

const blogRouter = require('express').Router()
const BlogEntry = require('../models/blog_entry')
const User = require('../models/user_entry')

blogRouter.get('/', async (request, response) => {
	const blogs = await BlogEntry.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs)
})

blogRouter.post('/', async (request, response) => {


	const token = getTokenFrom(request)

	const decodedToken = jwt.verify(token, process.env.SECRET)
	if (!token || !decodedToken.id) {
	  return response.status(401).json({ error: 'token missing or invalid' })
	}

	const user = await User.findById(request.body.userId)
	const blog = new BlogEntry({title: request.body.title,
		url: request.body.url,
		likes: request.body.likes,
		author: request.body.author,
		user: user._id
	})		
	try {

		const savedEntry = await blog.save()
		user.blogs = user.blogs.concat(savedEntry._id)
		await user.save()
		response.status(201).json(savedEntry)
	} catch (exception) {
		if (exception instanceof ValidationError) {
			response.status(400).json({
				_status: 400,
				_content: {
					message: exception.toString()
				}
			})
		} else {
			response.status(500).json({
				_status: 500,
				_content: {
					message: exception.toString()
				}
			})
		}

	}
})

blogRouter.get('/:id', async (request, response) => {
	const note = await BlogEntry.findById(request.params.id)
	if (note) {
		response.json(note)
	} else {
		response.status(404).end()
	}
})

blogRouter.delete('/:id', async (request, response) => {
	await BlogEntry.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

blogRouter.put('/:id', (request, response, next) => {
	const body = request.body

	const blog = {
		title: body.title,
		url: body.url,
		author: body.author,
		likes: body.likes
	}

	BlogEntry.findByIdAndUpdate(request.params.id, blog, { new: true })
		.then(updatedNote => {
			response.json(updatedNote.toJSON())
		})
		.catch(error => next(error))
})

const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
	  return authorization.substring(7)
	}
	return null
  }

module.exports = blogRouter