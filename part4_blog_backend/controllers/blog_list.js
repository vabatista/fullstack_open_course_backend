var mongoose = require('mongoose')
var ValidationError = mongoose.Error.ValidationError

const blogRouter = require('express').Router()
const BlogEntry = require('../models/blog_entry')

blogRouter.get('/', async (request, response) => {
	const blogs = await BlogEntry.find({})
	response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
	const blog = new BlogEntry(request.body)
	try {
		const result = await blog.save()
		response.status(201).json(result)
	} catch(exception) {
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

module.exports = blogRouter