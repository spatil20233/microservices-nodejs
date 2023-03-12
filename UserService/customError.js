export class ValidationError extends Error {
  constructor(message) {
    super(message);
    console.log(message)
    this.name = "Unauthorized";
    this.message = message;
  }
}