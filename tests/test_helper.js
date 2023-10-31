const User = require('../models/user')
const bcrypt = require('bcrypt')

const usersInDb = async( ) => {
	const users = await User.find({})

	return users.map(user => user.toJSON())
}
const createNewUser = async (username, name, password ) => {
	const passwordHash = await bcrypt.hash(password, 10)
    
	const newUser = new User({
		username,
		name,
		passwordHash
	})

	await newUser.save()
}

const deleteAllUsers = async () => {
	await User.deleteMany({})
}
module.exports = {
	usersInDb,
	deleteAllUsers,
	createNewUser
}