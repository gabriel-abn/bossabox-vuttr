export interface IEncrypter {
  encrypt(value: string): Promise<string>;
}

export interface IHasherComparer {
  compare(value: string, hash: string): Promise<boolean>;
}

export interface IDecrypter {
  decrypt(value: string): Promise<string>;
}
