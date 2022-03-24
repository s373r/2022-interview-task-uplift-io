export default class Web3ErrorHelper {
  private static isError(e: unknown): e is Error {
    return e instanceof Error;
  }

  static isInvalidGroupIdError(e: unknown): boolean {
    return this.isError(e) && e.message.includes('Invalid group id');
  }

  static isInvalidIndexIdError(e: unknown): boolean {
    return this.isError(e) && e.message.includes('Invalid index id');
  }
}
