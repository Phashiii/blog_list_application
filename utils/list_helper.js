const _ = require('lodash')
const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const likes = blogs.map(blog => blog.likes)

	const reducer = (sum, item) => {
		return sum + item
	}

	return blogs.length === 0? 0: likes.reduce(reducer,0)
}
const favouriteBlog = (blogs) => {
	const mostLiked = (blogs) => {
		let maxlikes = 0
		let most = []
		for(let item of blogs)
		{
			if(item.likes > maxlikes){
				maxlikes = item.likes
				most = item
			}
		}
		return most
	}
	return {
		title:mostLiked(blogs).title,
		author:mostLiked(blogs).author,
		likes:mostLiked(blogs).likes
	}
}

const mostBlogs = (blogs) => {
	const author = (blogs) => {
		const count = _.countBy(blogs, 'author')
		const top = _.maxBy(_.keys(count), (item) => count[item])

		return {
			author: top,
			blogs: count[top]
		}
	}
	return author(blogs)
}
const mostLikes = (blogs) => {
	let grouped = _.groupBy(blogs, 'author')

	let likeTotals = _.map(grouped, (authorObjects, key) => ({
		'author': key,
		'totalLikes': _.reduce(authorObjects, (sum, authorObject) => 
			sum + authorObject.likes, 0)
	}))

	const mostLikes = _.maxBy(likeTotals, 'totalLikes')

	return {
		author: mostLikes.author,
		likes: mostLikes.totalLikes
	}
}
module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
	mostBlogs,
	mostLikes
}