class AppException extends Error {
	statusCode: number
	errorMessage: string
	constructor(message: string, statusCode: number) {
		super(message)
		this.statusCode = statusCode
		this.errorMessage = message
	}
}

export default AppException
