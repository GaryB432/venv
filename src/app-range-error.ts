export class AppRangeError extends Error {
  constructor(appIndex: number) {
    super();
    this.message = `App '${appIndex}' is out of range`;
  }
}
