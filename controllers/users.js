const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})
  
usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (!username || !password) {
        response.status(400).json({error: "username and password are required"})
    }

    if (username.length < 3 || password.length < 3) {
        response.status(400).json({error: "username and password must be 3 characters or longer"})
    }

    const usedUsername = await User.find({ username: username})
    if (usedUsername.length > 0) {
        response.status(400).json({error: "expected `username` to be unique"})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter