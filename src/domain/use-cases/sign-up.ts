import { UseCase } from "@domain/common";

export namespace SignUp {
  export type Params = {
    email: string;
    password: string;
  };

  export type Result = {
    accessToken: string;
  };
}

export interface SignUp extends UseCase<SignUp.Params, SignUp.Result> {
  execute: (params: SignUp.Params) => Promise<SignUp.Result>;
}
