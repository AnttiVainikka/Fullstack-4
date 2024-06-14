const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.map(blog => blog.likes).reduce((accumalator, currentValue) => {
        return accumalator + currentValue
    }, 0)
}

const favoriteBlog = (blogs) => {
    let favorite = 'no blogs'
    let mostLikes = -1
    blogs.map(blog => [blog.title,blog.author,blog.likes]).forEach(blog => {
        if (blog[2]>mostLikes) {
            favorite = {
                title: blog[0],
                author: blog[1],
                likes: blog[2]
            }
            mostLikes = blog[2]
        }
    })
    return favorite
}

const mostBlogs = (blogs) => {
    let currentLeader = "no blogs"
    let mostBlogs = -1
    const authors = blogs.map(blog => blog.author)
    authors.forEach(author => {
        let blogAmount = authors.filter(x => x === author).length
        if ( blogAmount > mostBlogs) {
            currentLeader = {
                author: author,
                blogs: blogAmount
            }
            mostBlogs = blogAmount
        }
    })
    return currentLeader
}

const mostLikes = (blogs) => {
    let currentLeader = "no blogs"
    let mostliked = -1
    const authors = blogs.map(blog => [blog.author,blog.likes])
    authors.forEach(author => {
        let authorsBlogs = authors.filter((x) => x[0] === author[0])
        let authorsLikes = authorsBlogs.map(x => x[1]).reduce((accumalator, currentValue) => {
            return accumalator + currentValue
        },0)
        if ( authorsLikes > mostliked) {
            currentLeader = {
                author: author[0],
                likes: authorsLikes
            }
            mostliked = authorsLikes
        }
    })
    return currentLeader
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}