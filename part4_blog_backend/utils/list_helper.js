var _ = require('lodash')


/* eslint-disable no-unused-vars */
const dummy = (blogs) => {
	return (1)
}

const totalLikes = (blogs) => {
	if (blogs.constructor === Array & blogs.length > 0) {
		const sum = blogs.map(entry => entry.likes)
			.reduce((prev, curr) => prev + curr, 0)
		return(sum)
	} else {
		return(0)
	}
}

const favoriteBlog = (blogs) => {
	if (blogs.constructor === Array & blogs.length > 0) {
		const favorite =  blogs.reduce(function(prev, current) {
			return (prev.likes > current.likes) ? prev : current
		}) 
		return(favorite)
	} else {
		return(null)
	}

}

const mostBlogs = (blogs) => {
	//https://stackoverflow.com/questions/47415199/grouping-by-using-lodash
	if (blogs.constructor === Array & blogs.length > 0) {
		const _mostBlogs = _(blogs).groupBy('author').map(function(g, key) { return {
			author: key,
			blogs: g.length }}).values().orderBy('blogs', 'desc').value()[0]
		return _mostBlogs
	} else {
		return (null)
	}

}

const mostLikes = (blogs) => {
	//https://stackoverflow.com/questions/47415199/grouping-by-using-lodash
	if (blogs.constructor === Array & blogs.length > 0) {
		const _mostLikes = _(blogs).groupBy('author').map(function(g, key) { return {
			author: key,
			likes: _(g).sumBy('likes') }}).values().orderBy('likes', 'desc').value()[0]
		return _mostLikes
	} else {
		return (null)
	}

}


module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}