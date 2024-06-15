const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const initialBlogs = require('./test_helper')
const Blog = require('../models/blog')


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

describe('getting blogs', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('correct amount of blogs is returned', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length,initialBlogs.length)
    })

    test('returned blogs have parameter "id"', async () => {
        const response = await api.get('/api/blogs')
        assert.notStrictEqual(response.body[0].id,undefined)
    })
})

describe('posting blogs', () => {

    test('posting a blog increases blog count by 1', async () => {
        const newBlog = {
            title: 'Curiousity',
            author: 'Aron Asnan',
            url: 'wikipedia.org',
            likes: 6
          }
        await api.post('/api/blogs').send(newBlog)
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length,initialBlogs.length+1)
    })

    test('posted blog with no likes given defaults to 0', async () => {
        const newBlog = {
            title: 'Voracity',
            author: 'Kim Johnson',
            url: 'twitter.com'
          }
        await api.post('/api/blogs').send(newBlog)
        const response = await Blog.find({title: 'Voracity'})
        assert.strictEqual(response[0].likes,0)
    })
    
    test('posting blog with no title results in status code 400', async () => {
        const newBlog = {
            author: 'Jimmy',
            url: 'reddit.com',
            likes: 2
          }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('posting blog with no url results in status code 400', async () => {
        const newBlog = {
            title: 'My adventures',
            author: 'Jimmy',
            likes: 2
          }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

after(async () => {
  await mongoose.connection.close()
})