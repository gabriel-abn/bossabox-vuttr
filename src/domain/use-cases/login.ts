import { UseCase } from "@domain/common";

export namespace Login {
  export type Params = {
    email: string;
    password: string;
  };

  export type Result = {
    accessToken: string;
  };
}

export interface Login extends UseCase<Login.Params, Login.Result> {
  execute: (params: Login.Params) => Promise<Login.Result>;
}
