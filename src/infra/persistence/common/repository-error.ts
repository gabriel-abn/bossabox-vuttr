export class RepositoryError extends Error {
  constructor(
    repository: string,
    public readonly originalError?: Error | string,
  ) {
    super(
      `Error on ${repository}: ${
        typeof originalError == "string" ? originalError : originalError.message
      }`,
    );
  }
}
