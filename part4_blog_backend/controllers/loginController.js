const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const loginController = require('express').Router()
const User = require('../models/user_entry')

loginController.post('/', async (request, response) => {
	console.log('entered login controller')
	const body = request.body

	const user = await User.findOne({ username: body.username })
	console.log(user, await bcryptjs.compare(body.password, user.passwordHash))
	const passwordCorrect = user === null
		? false
		: await bcryptjs.compare(body.password, user.passwordHash)

	if (!(user && passwordCorrect)) {
		return response.status(401).json({
			error: 'wrong username or password'
		})
	}

	const userForToken = {
		username: user.username,
		id: user._id,
	}

	const token = jwt.sign(userForToken, process.env.SECRET)

	response
		.status(200)
		.send({ token, username: user.username, name: user.name })
})

module.exports = loginController