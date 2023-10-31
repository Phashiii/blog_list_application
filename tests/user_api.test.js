const helper = require('./test_helper')
const supertest = require('supertest')
const  app = require('../app')
const api = supertest(app)

describe('new user creation', () => {
	beforeEach(async () => {
		await helper.deleteAllUsers()
		await helper.createNewUser('EsterNutz','Esther', '10002') 
	}, 10000) 

	test('create a new user', async () => {
		const usersAtStart = await helper.usersInDb()
		const newUser = {
			username: 'Thatpu',
			name: 'UNI-man',
			password: '19y2bk'
		}
		await api.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)
      
		const usersAtEnd = await helper.usersInDb()

		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
		const content = usersAtEnd.map(user => user.username) 
		expect(content).toContain(newUser.username)
	}, 10000)

	test('user creation fail becacause password short', async () => {
		const usersAtStart = await helper.usersInDb()
		const newUser = {
			username: 'Ellias',
			name: 'Elliot_the_KiD',
			password: '00'
		}
		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('password too short')
      
		const usersAtEnd = await helper.usersInDb()

		expect(usersAtEnd).toEqual(usersAtStart)
	}), 10000
	test('creation fails with proper statuscode and message if username already taken', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'EsterNutz',
			name: 'Superuser',
			password: 'salainen',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('expected `username` to be unique')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)
	}, 10000)
})