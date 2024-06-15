const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const listWithSeveralBlogs = require('./test_helper')

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

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  
    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      assert.strictEqual(result, 5)
    })
    test('when list has many blogs counts the sum correctly', () => {
        const result2 = listHelper.totalLikes(listWithSeveralBlogs)
        assert.strictEqual(result2, 36)
    })
    test("when there are no blogs returns 0", () => {
        const result3 = listHelper.totalLikes([])
        assert.strictEqual(result3, 0)
    })
})

describe('favorite blog', () => {

    test('when list has only one blog returns that blog', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        const answer = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        }
        assert.strictEqual(JSON.stringify(result), JSON.stringify(answer))
      })
    test('when list has many blogs returns the one with most likes', () => {
        const result2 = listHelper.favoriteBlog(listWithSeveralBlogs)
        const answer2 = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        }
        assert.strictEqual(JSON.stringify(result2), JSON.stringify(answer2))
      })
    test("when there are no blogs returns 'no blogs'", () => {
        const result3 = listHelper.favoriteBlog([])
        assert.strictEqual(result3, 'no blogs')
      })
})

describe('most prolific author', () => {

  test('when list has only one blog returns that author with correct amount of blogs', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    const answer = {
        author: 'Edsger W. Dijkstra',
        blogs: 1
    }
    assert.strictEqual(JSON.stringify(result), JSON.stringify(answer))
  })
  test('when list has many blogs returns the most prolific author with correct amount of blogs', () => {
    const result2 = listHelper.mostBlogs(listWithSeveralBlogs)
    const answer2 = {
        author: "Robert C. Martin",
        blogs: 3
    }
    assert.strictEqual(JSON.stringify(result2), JSON.stringify(answer2))
  })
  test("when there are no blogs returns 'no blogs'", () => {
    const result3 = listHelper.mostBlogs([])
    assert.strictEqual(result3, 'no blogs')
  })
})

describe('most liked author', () => {

  test('when list has only one blog returns that author with correct amount of likes', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    const answer = {
        author: 'Edsger W. Dijkstra',
        likes: 5
    }
    assert.strictEqual(JSON.stringify(result), JSON.stringify(answer))
  })
  test('when list has many blogs returns the most liked author with correct amount of likes', () => {
    const result2 = listHelper.mostLikes(listWithSeveralBlogs)
    const answer2 = {
        author: "Edsger W. Dijkstra",
        likes: 17
    }
    assert.strictEqual(JSON.stringify(result2), JSON.stringify(answer2))
  })
  test("when there are no blogs returns 'no blogs'", () => {
    const result3 = listHelper.mostLikes([])
    assert.strictEqual(result3, 'no blogs')
  })
})
