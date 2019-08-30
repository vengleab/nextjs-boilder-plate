export default class Response {
  constructor({ statusCode, message, response }) {
    this.statusCode = statusCode;
    this.message = message;
    this.response = response;
  }

  send(data) {
    this.response.status(this.statusCode).send({
      data,
      statusCode: this.statusCode,
      message: this.message
    });
  }
}
