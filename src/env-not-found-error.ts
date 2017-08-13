export class EnvNotFoundError extends Error {
  constructor(envName: string) {
    super();
    this.message = `Environment '${envName}' not found`;
  }
}
