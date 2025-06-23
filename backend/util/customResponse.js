class CustomResponse {
    constructor(status, message, data, error) {
        this.status = status
        this.message = message
        this.data = data
        this.error = error
        
    }
}

export  { CustomResponse }