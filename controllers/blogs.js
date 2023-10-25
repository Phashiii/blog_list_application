const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', (request, response) =>{
    Blog.find({})
    .then(blogs => {
        response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog.save()
    .then((savedBlog) => {
        response.json(savedBlog)
    })
    .catch(error => {
        logger.info(error)
    })
})


module.exports = blogsRouter