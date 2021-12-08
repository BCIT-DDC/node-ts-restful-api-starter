import HttpException from '@errors/http.exception';

export default class ApplicationException extends HttpException {
    constructor(message: string) {
        super(500, `Internal Server Error: ${message}`);
    }
}
