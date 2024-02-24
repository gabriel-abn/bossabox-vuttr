import { UseCase } from "@domain/common";

export namespace SignUp {
  export type Params = {
    email: string;
    password: string;
  };
}

export interface SignUp extends UseCase<SignUp.Params, boolean> {
  execute: (params: SignUp.Params) => Promise<boolean>;
}
