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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
