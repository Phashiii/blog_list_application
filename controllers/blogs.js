/* eslint-disable no-undef */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) =>{
	const blogs = await Blog.find({}).populate('userId', { username: 1, name: 1, id: 1 })
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	const body = request.body
	const user = request.user
	
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		userId: user._id
	})
	if(blog.likes === undefined)
	{
		blog.likes = 0
	}
	if(blog.url === undefined || blog.title === undefined){
		response.status(400).send('Bad Request')
	}
	
	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	if(blog)
	{
		response.json(blog)
	}else{
		response.status(404).end()
	}
})
blogsRouter.delete('/:id', async (request, response) => {
	const user = request.user
	const blog = await Blog.findById(request.params.id)
	if(user.id.toString() === blog.userId.toString())
	{
		await Blog.findByIdAndRemove(request.params.id)
		response.status(204).end()
	}
})
blogsRouter.put('/:id', async (request, response) => {
	const body = request.body

	const blog = {
		title:body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		id:body.id,
		userId:body.userId
	}

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,blog, {new:true})
	response.json(updatedBlog)
})
module.exports = blogsRouter