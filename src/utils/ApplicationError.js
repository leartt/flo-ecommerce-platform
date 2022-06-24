class ApplicationError extends Error {
  constructor(status, message) {
    super();
    this.name = this.constructor.name;
    this.message = message;
    this.statusCode = status || 500;
  }
}

module.exports = ApplicationError;
