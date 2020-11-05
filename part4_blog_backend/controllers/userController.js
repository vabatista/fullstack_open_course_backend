const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user_entry')

usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs', { title: 1, likes: 1 })
	response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
	try {
		const body = request.body

		const saltRounds = 10
		const passwordHash = await bcryptjs.hash(body.password, saltRounds)

		const user = new User({
			username: body.username,
			name: body.name,
			passwordHash,
		})

		const savedUser = await user.save()

		response.json(savedUser)
	} catch (exception) {
		next(exception)
	}
})

module.exports = usersRouter