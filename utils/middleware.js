const logger = require('./logger')


const requestLogger = (request, response) => {
	logger.info('Method:', request.method)
	logger.info('Path:  ', request.path)
	logger.info('Body:  ', request.body)
	logger.info('---')
}
  

module.exports = {
	requestLogger
}