import { IEncrypter, ITokenHandler } from "@application/protocols";
import { IUserRepository } from "@application/repositories";
import { SignUp } from "@domain/use-cases";

export class SignUpUseCase implements SignUp {
  constructor(
    private readonly tokenHandler: ITokenHandler,
    private readonly userRepo: IUserRepository,
    private readonly encrypter: IEncrypter,
  ) {}

  async execute(params: SignUp.Params): Promise<SignUp.Result> {
    const { email, password } = params;

    const { id } = await this.userRepo.save({
      email,
      password: await this.encrypter.encrypt(password),
    });

    const accessToken = await this.tokenHandler.tokenize({ id, email });

    return { accessToken };
  }
}
