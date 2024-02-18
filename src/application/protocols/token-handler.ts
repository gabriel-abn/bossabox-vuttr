export interface ITokenHandler {
  tokenize: (payload: any) => Promise<string>;
  verify: (token: string) => Promise<any>;
}
