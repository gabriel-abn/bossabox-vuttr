import { IEncrypter, IHasherComparer } from "@application/protocols";
import * as bcrypt from "bcrypt";

class Crypter implements IEncrypter, IHasherComparer {
  private salt: number;

  constructor() {
    this.salt = 10;
  }

  async encrypt(value: string): Promise<string> {
    const encrypted = await bcrypt.hash(value, this.salt);

    return encrypted;
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const compared = await bcrypt.compare(value, hash);

    return compared;
  }
}

export default new Crypter();
