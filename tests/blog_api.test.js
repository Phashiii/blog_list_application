const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog') 

mongoose.set('bufferTimeoutMS', 100000)
const api = supertest(app)
const initialBlogs =[
	{
		title: 'Death',
		author: 'we',
		url: '#',
		likes: 122
	},
	{
		title: 'Q',
		author: 'werde',
		url: '#',
		likes: 2
	}
]

beforeEach(async () => {
	await Blog.deleteMany({})

	for(let blog of initialBlogs){
		let blogObject = new Blog(blog) 
		await blogObject.save()
	}
}, 100000)
test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
}, 100000)


test('blog id is defined', async () => {
	const blogs = await Blog.find({})
	const blogOne = blogs[0]
	expect(blogOne.id).toBeDefined()
},100000)

test('post a blog', async () => {
	const newBlog = {
		title:'wowow',
		author:'wqppp',
		url:'ew',
		likes:22222
	}
	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)
    
	const blogsAtTheEnd = await Blog.find({})
	expect(blogsAtTheEnd).toHaveLength(initialBlogs.length + 1)

	const content = blogsAtTheEnd.map(b => b.title)
	expect (content).toContain('wowow')
}, 100000)

test('likes default to 0 if null', async () => {
	const newBlog = {
		title:'wowow',
		author:'wqppp',
		url:'ew',
	}
	await api
		.post('/api/blogs')
		.send(newBlog)

	const blogsAtTheEnd = await Blog.find({})
	const likes = blogsAtTheEnd[blogsAtTheEnd.length-1].likes
	expect(likes).toBe(0)
}, 10000)

test('blog post missing url recives 400 response', async () => {
	const newBlog = {
		title:'wowow',
		author:'wqppp',
		likes: 100
	}
	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)
		.expect('Bad Request')

})

test('blog post missing title recives 400 response', async () => {
	const newBlog = {
		author:'wqppp',
		url:'#',
		likes: 100
	}
	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)
		.expect('Bad Request')

})

test('blog post missing url and title recives 400 response', async () => {
	const newBlog = {
		author:'wqppp',
		likes: 100
	}
	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)
		.expect('Bad Request')

})

test('delete an existing blog', async () => {
	const blogs = await Blog.find({})
	const blogId = blogs[0].id

	await api.delete(`/api/blogs/${blogId}`)
		.expect(204)
    
	const blogsAtTheEnd = await Blog.find({})
	expect(blogsAtTheEnd).toHaveLength(blogs.length - 1)
})

test('update an exsisting blogs likes', async () => {
	const blogs = await Blog.find({})
	const oldBlog = blogs[0]

	const newBlog = {
		title: oldBlog.title,
		author: oldBlog.author,
		url: oldBlog.url,
		likes:10000000
	}
	await api
		.put(`/api/blogs/${oldBlog.id}`)
		.send(newBlog)
	const blogAtTheEnd = await Blog.findById(oldBlog.id)
	
	expect(blogAtTheEnd.likes).toBe(10000000)
}, 100000)

afterAll(async () => {
	await mongoose.connection.close()
})