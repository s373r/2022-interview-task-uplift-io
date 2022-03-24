export default class Web3ErrorHelper {
  private static isError(e: unknown): e is Error {
    return e instanceof Error;
  }

  static isInvalidGroupIdError(e: unknown): boolean {
    if (!this.isError(e)) {
      return false;
    }

    return e.message === 'Returned error: execution reverted: Invalid group id';
  }
}
