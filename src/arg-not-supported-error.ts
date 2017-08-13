export class ArgumentNotSupportedError extends Error {
  constructor(name: string) {
    super();
    this.message = `Argument '${name}' not supported`;
  }
}
