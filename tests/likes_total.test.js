const totalLikes = require('../utils/list_helper').totalLikes
const favouriteBlog= require('../utils/list_helper').favouriteBlog
const mostBlogs= require('../utils/list_helper').mostBlogs
const mostLikes= require('../utils/list_helper').mostLikes


const listWithOneBlog = [
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0
	}
]
const listWithFiveBlogs = [
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Dan Eager',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 1,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 4,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Eager Allen',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 0.5,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Eager Allen',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 0.5,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Eager Allen',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 10,
		__v: 0
	}
]
describe('total likes', () => {
    
	test('when list has only one blog, equals the likes of that', () => {
		const result = totalLikes(listWithOneBlog)
		expect(result).toBe(5)
	})
    
	test('when list has five blogs, equals the likes of all of them', () => {
		const result = totalLikes(listWithFiveBlogs)
		expect(result).toBe(16)
	})
})


describe('most likes', () => {
	test('Most likes', () => {
		const result = favouriteBlog(listWithFiveBlogs)
		expect(result).toEqual({
			title: 'Go To Statement Considered Harmful',
			author: 'Eager Allen',
			likes: 10,
		})
	})
})

describe('author with most blogs', () => {
	test('most blogs', () => {
		const result = mostBlogs(listWithFiveBlogs)

		expect(result).toEqual({
			author: 'Eager Allen',
			blogs: 3})
	})
})

describe('author with most likes', () => {
	test('most likes', () => {
		const result = mostLikes(listWithFiveBlogs)

		expect(result).toEqual({
			author: 'Eager Allen',
			likes: 11
		})
	})
})