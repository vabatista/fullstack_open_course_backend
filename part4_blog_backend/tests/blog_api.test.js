const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog_entry')

const initialBlogs = [
	{
		title: 'HTML is easy',
		author: 'Vitor A. Batista',
		url: 'http://fullstack.com',
		likes: 99
	},
	{
		title: 'HTML is hard',
		author: 'Vitor A. Batista',
		url: 'http://fullstack.com/hard',
		likes: 5
	},
]

beforeEach(async () => {
	await Blog.deleteMany({})

	let blogObject = new Blog(initialBlogs[0])
	await blogObject.save()

	blogObject = new Blog(initialBlogs[1])
	await blogObject.save()
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})


test('test if name of identifier field is id', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body.map(r => r.id)).toBeDefined()
})
test('there are N blogs', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(initialBlogs.length)
})

test('the first blog is about html easy methods', async () => {
	const response = await api.get('/api/blogs')
	const contents = response.body.map(r => r.title)

	expect(contents).toContain('HTML is easy')
})

test('insert new blog and verify number of new entries', async () => {
	const newBlog = {
		title: 'async/await simplifies making async calls',
		author: 'Galo doido',
		likes: 55,
		url: 'http://async.com'
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const response = await api.get('/api/blogs')

	const contents = response.body.map(r => r.title)

	expect(response.body).toHaveLength(initialBlogs.length + 1)
	expect(contents).toContain('async/await simplifies making async calls')
})

test('insert new without likes and check if it stores 0 as default', async () => {
	const sTitle = '--post without likes--'
	const newBlog = {
		title: sTitle,
		url: 'http://dontcare.com'
	}

	await api
		.post('/api/blogs')
		.send(newBlog)

	const response = await api.get('/api/blogs')

	const blog = response.body.filter(r => r.title == sTitle)

	expect(blog[0].likes).toBeDefined()
	expect(blog[0].likes).toEqual(0)

})

test('insert new without title and check if yields to http 400', async () => {
	const newBlogWithoutTitle = {
		url: 'http://dontcare.com'
	}

	await api
		.post('/api/blogs')
		.send(newBlogWithoutTitle).expect(400)

})

test('insert new without url and check if yields to http 400', async () => {
	const newBlogWithoutURL = {
		title: 'no title at all'
	}

	await api
		.post('/api/blogs')
		.send(newBlogWithoutURL).expect(400)
})

describe('deletion of a blog', () => {
	test('succeeds with status code 204 if id is valid', async () => {
		
		const blogsStart = await api.get('/api/blogs')

		const blogToDelete = blogsStart.body[0]

		await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

		const blogsFinal = await api.get('/api/blogs')
		
		const contents = blogsFinal.body.map(r => r.title)

		expect(contents).not.toContain(blogToDelete.title)
	})
})

describe('updating of a blog', () => {
	test('succesful update the first blog Entry', async () => {
		const blogsStart = await api.get('/api/blogs')
		const sNewTitle = 'new updated title'

		const blogToUpdate = blogsStart.body[0]
		blogToUpdate.title = sNewTitle
		
		await api.put( `/api/blogs/${blogToUpdate.id}`).send(blogToUpdate)

		const blogsFinal = await api.get('/api/blogs')
		
		const contents = blogsFinal.body.map(r => r.title)

		expect(contents).toContain(sNewTitle)
	})
})

afterAll(() => {
	mongoose.connection.close()
})