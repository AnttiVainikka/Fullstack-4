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

describe('deleting blogs', () => {

    test('deleting a blog with its id works', async () => {
        const newBlog = {
            title: 'Delete',
            author: 'Poista',
            url: 'Remove',
            likes: 0
          }
        await api.post('/api/blogs').send(newBlog)
        const toDelete = await Blog.find({title: 'Delete'})
        const oneFound = toDelete.length
        await api.delete(`/api/blogs/${toDelete[0].id}`).expect(204)
        const noMore = await Blog.find({title: 'Delete'})
        assert.strictEqual(noMore.length,oneFound-1)
    })

    test('deleting with nonexistant id returns 400', async () => {
        await api.delete(`/api/blogs/12345`).expect(400)
    })
})

describe('editing blogs', () => {

    test('updating the likes of a blog with its id works', async () => {
        const newBlog = {
            title: 'Conniving',
            author: 'Lendra Pendra',
            url: 'google.com',
            likes: 9
          }
        const newLikes = {
            title: 'Conniving',
            author: 'Lendra Pendra',
            url: 'google.com',
            likes: 10
          }
        await api.post('/api/blogs').send(newBlog)
        const toUpdate = await Blog.find({title: 'Conniving'})
        await api.put(`/api/blogs/${toUpdate[0].id}`)
            .send(newLikes)
            .expect('Content-Type', /application\/json/)
        const updated = await Blog.find({title: 'Conniving'})
        assert.strictEqual(updated[0].likes,10)
    })

    test('updating with nonexistant id returns 400', async () => {
        await api.put(`/api/blogs/12345`).expect(400)
    })
})

after(async () => {
  await mongoose.connection.close()
})