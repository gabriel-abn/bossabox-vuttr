import { ITokenHandler } from "@application/protocols";
import env from "@main/env";
import * as jwt from "jsonwebtoken";

export class JWTHandler implements ITokenHandler {
  private secret: string;

  constructor() {
    this.secret = env.JWT_SECRET;
  }

  async tokenize(payload: any): Promise<string> {
    const token = jwt.sign(payload, this.secret);

    return token;
  }

  async verify(token: string): Promise<any> {
    const decoded = jwt.verify(token, this.secret);

    return decoded;
  }
}

export default new JWTHandler();
